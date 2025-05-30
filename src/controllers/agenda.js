import { Op } from 'sequelize';
import { sequelize } from '../database.js';
import { estadosReunion } from '../env/env.js';

import RepresentanteModel from '../models/representante.js';
import ReunionModel from '../models/reunion.js';
import ArchivoModel from '../models/archivo.js';
// import CodificadoresModel from '../models/codificadores.js';
// import EntidadModel from '../models/entidad.js';

const Representante = RepresentanteModel(sequelize);
const Reunion = ReunionModel(sequelize);
const Archivo = ArchivoModel(sequelize);
// const Codificadores = CodificadoresModel(sequelize);
// const Entidad = EntidadModel(sequelize);



export const obtenerAgendas = async (req, res) => {
  const { actorId } = req.params;
  console.log("🚀🚀🚀 : actorId", actorId)
  try {
    const agendas = await Reunion.findAll({
      where: {
        eliminado: false,
        fechaHoraInicio: {
          [Op.gte]: new Date()  // Filtrar agendas con fecha igual o mayor a la actual
        },
        idEntidad: actorId,
        idEstado: estadosReunion.PENDIENTE
      },
      attributes: ['idReunion', 'fechaHoraInicio', 'asunto'],
    });


    res.status(200).json({
      success: true,
      data: agendas,
      message: 'Agendas obtenidas exitosamente'
    });
  } catch (error) {
    console.error('Error al obtener las agendas:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener las agendas',
      error: error.message
    });
  }
};

export const crearReunion = async (req, res) => {
  const { actorId } = req.params;
  const transaction = await sequelize.transaction();
  try {
    const { fechaHoraInicio, asunto } = req.body;

    // Crear nueva reunión
    const nuevaReunion = await Reunion.create({
      fechaHoraInicio,
      asunto,
      idEntidad: actorId,
      idEstado: estadosReunion.PENDIENTE,
      eliminado: false,
      fechaCreacion: new Date()
    }, { transaction, context: req });

    await transaction.commit();
    return res.status(201).json({
      success: true,
      data: nuevaReunion,
      message: "Reunión creada exitosamente",
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al crear la reunión:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al crear la reunión',
      error: error.message
    });
  }
};

// optener reunioesn pasadas
// Relaciones entre los modelos
Reunion.hasMany(Archivo, { foreignKey: 'idReunion' });
Archivo.belongsTo(Reunion, { foreignKey: 'idReunion' });

Reunion.belongsTo(Representante, { foreignKey: 'idLocutor', as: 'locutorPrincipal' });
export const obtenerReunionesDocumentos = async (req, res) => {
  try {
    const { actorId } = req.params;
    console.log("🚀🚀🚀 : actorIdr", actorId)

    const reuniones = await Reunion.findAll({
      where: {
        idEntidad: actorId,
        eliminado: false,
        // fechaHoraInicio: {
        //   [Op.lt]: new Date()
        // },
        idEstado: estadosReunion.FINALIZADA
      },
      attributes: ['idReunion', 'fechaHoraInicio', 'asunto', 'lugar', 'acuerdos', 'tipo'], // Campos específicos de la reunión
      include: [
        {
          model: Archivo,
          attributes: ['idArchivo', 'nombre', 'tamanio', 'enlace', 'tipo'], // Campos específicos del archivo
          required: false, // Incluir reuniones incluso si no tienen documentos
        },
        {
          model: Representante,
          as: 'locutorPrincipal', // Usa el alias definido en la asociación
          attributes: ['idRepresentante', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'celular', 'tieneWhatsApp'], // Campos del representante
        }
      ],
      order: [['fechaHoraInicio', 'DESC']]
    });

    if (reuniones.length === 0) {
      res.json({
        success: false,
        data: [],
        message: "No se encontraron reuniones para esta entidad."
      });
    } else {
      res.json({
        success: true,
        data: reuniones,
        message: "Reuniones y documentos listados exitosamente"
      });
    }
  } catch (error) {
    console.error('Error al obtener reuniones y documentos:', error);
    res.status(500).json({
      success: false,
      message: "Error al listar reuniones",
      error: error.message
    });
  }
};

export const obtenerReunionPorId = async (req, res) => {
  const { reunionId } = req.params;

  try {
    const reunion = await Reunion.findOne({
      where: {
        idReunion: reunionId,
        eliminado: false
      },
      attributes: [
        'idReunion',
        'fechaHoraInicio',
        'asunto',
        'lugar',
        'fechaHoraConvenio',
        'tipo',
        'acuerdos',
        'idEntidad',
        'idEstado',
        'fechaCreacion',
        'fechaModificacion',
        'idPadre',
        'motivo',
        'fechaSuspencion'
      ],
    });

    if (!reunion) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'No se encontró la reunión solicitada'
      });
    }

    res.json({
      success: true,
      data: reunion,
      message: 'Reunión obtenida exitosamente'
    });

  } catch (error) {
    console.error('Error al obtener la reunión:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la reunión',
      error: error.message
    });
  }
};

// traer a todos las representantes de esa entidad dada
export const obtenerRepresentantesDeUnaEntidad = async (req, res) => {
  const { actorId } = req.params;
  console.log('🚀🚀🚀 : actorId', actorId);

  try {
    const resultados = await Representante.findAll({
      where: {
        idEntidad: actorId
      },
      attributes: ['idRepresentante', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'idCargo', 'celular', 'tieneWhatsApp'],
      order: [['idRepresentante', 'ASC']]
    });
    // console.log('🚀🚀🚀 : resultados', resultados);
    res.json({
      success: true,
      data: resultados,
      message: "Representantes listados exitosamente"
    });
  } catch (error) {
    console.error('Error al obtener los representantes:', error);
    res.status(500).json({
      success: false,
      message: "Error al listar representantes",
      error: error.message
    });
  }
};

export const actualizarReunion = async (req, res) => {
  const { reunionId } = req.params;
  const datosActualizacion = req.body;
  console.log('🚀 Datos recibidos para actualización:', datosActualizacion);

  const transaction = await sequelize.transaction();

  try {
    // Verificar si la reunión existe
    const reunionExistente = await Reunion.findOne({
      where: {
        idReunion: reunionId,
        eliminado: false
      }
    });

    if (!reunionExistente) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'No se encontró la reunión a actualizar'
      });
    }

    // Mapear los datos recibidos a los campos de la base de datos
    const datosActualizar = {
      fechaHoraInicio: datosActualizacion.fechaHoraInicio,
      asunto: datosActualizacion.asunto,
      lugar: datosActualizacion.lugar,
      acuerdos: datosActualizacion.acuerdos,
      motivo: datosActualizacion.motivo || null,
      tipo: datosActualizacion.tipo,
      idLocutor: datosActualizacion.idLocutor,
      fechaModificacion: new Date(),
      // usuarioId: req.usuario?.id // Si tienes el ID del usuario en el request
    };

    // Actualizar la reunión
    await Reunion.update(datosActualizar, {
      where: {
        idReunion: reunionId,
        eliminado: false
      },
      transaction,
      context: req
    });

    // Obtener la reunión actualizada con todas sus relaciones
    const reunionActualizada = await Reunion.findOne({
      where: {
        idReunion: reunionId,
        eliminado: false
      },
      attributes: [
        'idReunion',
        'fechaHoraInicio',
        'asunto',
        'lugar',
        'fechaHoraConvenio',
        'tipo',
        'acuerdos',
        'idEntidad',
        // 'idEstado',
        'fechaCreacion',
        'fechaModificacion',
        // 'idPadre',
        // 'motivo',
        // 'fechaSuspencion'
        'idLocutor'
      ],
      include: [
        {
          model: Representante,
          as: 'locutorPrincipal',
          attributes: [
            'idRepresentante',
            'nombres',
            'apellidoPaterno',
            'apellidoMaterno',
            'idCargo',
            'celular',
            'tieneWhatsApp'
          ],
          // include: [{
          //   model: Codificadores,
          //   as: 'cargo',
          //   attributes: ['idCodificador', 'nombre']
          // }]
        },
        // {
        //   model: Entidad,
        //   attributes: ['idEntidad', 'nombreEntidad', 'codigoEntidad']
        // },
        // {
        //   model: Codificadores,
        //   as: 'estado',
        //   attributes: ['idCodificador', 'nombre']
        // },
        // {
        //   model: Archivo,
        //   attributes: [
        //     'idArchivo',
        //     'nombre',
        //     'enlace',
        //     'tipo',
        //     'tamanio',
        //     'fechaCreacion'
        //   ],
        //   where: {
        //     eliminado: false
        //   },
        //   required: false
        // }
      ],
      transaction
    });

    // Confirmar la transacción
    await transaction.commit();

    return res.json({
      success: true,
      data: reunionActualizada,
      message: 'Reunión actualizada exitosamente'
    });

  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    console.error('Error al actualizar la reunión:', error);

    return res.status(500).json({
      success: false,
      data: null,
      message: 'Error al actualizar la reunión',
      error: error.message
    });
  }
};


export const eliminarReunion = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { reunionId } = req.params;

    // Verificar si la reunión existe
    const reunion = await Reunion.findOne({
      where: { idReunion: reunionId, eliminado: false }
    });

    if (!reunion) {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Reunión no encontrada"
      });
    }

    // "Eliminar" la reunión (cambio de estado)
    await reunion.update({
      eliminado: true,
      fechaModificacion: new Date()
    }, { transaction, context: req });

    await transaction.commit();
    return res.status(200).json({
      success: true,
      data: reunion,
      message: "Reunión eliminada exitosamente"
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error al eliminar la reunión:', error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Error al eliminar la reunión',
      error: error.message
    });
  }
};