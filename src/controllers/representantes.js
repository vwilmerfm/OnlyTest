import { sequelize } from '../database.js';

import RepresentanteModel from '../models/representante.js';
import CodificadoresModel from '../models/codificadores.js';
import { varios } from '../env/env.js';

const Representante = RepresentanteModel(sequelize);
const Codificadores = CodificadoresModel(sequelize);

Representante.belongsTo(Codificadores, { foreignKey: 'idCargo', as: 'cargo' });

export const listarRepresentantes = async (req, res) => {
  const { actorId } = req.params;
  console.log("🚀🚀🚀 : req.params", req.params)
  try {
    // Obtener todos los representantes
    const representantes = await Representante.findAll({
      where: { idEntidad: actorId },
      attributes: ['idRepresentante', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'idCargo', 'celular', 'tieneWhatsApp'], // Especificar los campos que deseas obtener
      include: [{
        model: Codificadores,  // Relación con la tabla de codificadores (cargos)
        as: 'cargo',         // Usa el alias definido en la asociación
        attributes: ['nombre', 'idCodificador'] // Campo del nombre del cargo en la tabla de codificadores
      }],
      order: [['nombres', 'ASC']] // Ordenar por nombre completo de forma ascendente
    });

    // Verificar si se encontraron representantes
    if (representantes.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No se encontraron representantes.'
      });
    }
    res.status(200).json({
      success: true,
      data: representantes,
      message: 'Datos enviados exitosamente',
    });

    // Devolver la lista de representantes
    // return res.status(200).json(representantes);
  } catch (error) {
    console.error('Error al listar representantes:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al enviar los datos',
      error: error.message
    });
  }
};

export const crearRepresentante = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const { representante, idEntidad } = req.body;
    console.log("🚀🚀🚀 : Datos recibidos", { representante, idEntidad });

    let idCargoFinal = representante.idCargo;

    // Si el idCargo es -1, crear un nuevo cargo
    if (representante.idCargo === -1) {
      const nuevoCargo = await Codificadores.create({
        idParametrica: varios.ID_PARAMETRO_CARGO,
        nombre: representante.cargo.nombre.toUpperCase().trim(),
        codigo: representante.cargo.nombre.toUpperCase().trim().replace(/ /g, ''),
        estado: 'activo',
        eliminado: false,
      }, { transaction, context: req });

      console.log("🚀🚀🚀 : Nuevo cargo creado", nuevoCargo.toJSON());
      idCargoFinal = nuevoCargo.idCodificador;
    }

    // Crear el representante
    const nuevoRepresentante = await Representante.create({
      nombres: representante.nombres,
      apellidoPaterno: representante.apellidoPaterno,
      apellidoMaterno: representante.apellidoMaterno,
      idCargo: idCargoFinal,
      celular: representante.celular,
      tieneWhatsApp: representante.tieneWhatsApp,
      idEntidad: idEntidad,
      idEstado: 65, // Estado activo
      fechaCreacion: new Date(),
      eliminado: false,
    }, { transaction, context: req });

    console.log("🚀🚀🚀 : Nuevo representante creado", nuevoRepresentante.toJSON());

    // Confirmar la transacción
    await transaction.commit();

    res.status(201).json({
      success: true,
      message: 'Representante creado exitosamente',
      data: true
    });

  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error('Error al crear el representante:', error);
    res.status(500).json({
      success: false,
      message: 'Error al crear el representante',
      data: false
    });
  }
};
