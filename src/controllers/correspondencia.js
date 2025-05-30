import { sequelize } from '../database.js';

import CorrespondenciaModel from '../models/correspondencia.js';
import ArchivoModel from '../models/archivo.js';

const Correspondencia = CorrespondenciaModel(sequelize);
const Archivo = ArchivoModel(sequelize);

export const listarCorrespondencias = async (req, res) => {
  const { actorId } = req.params;
  try {
    const correspondencias = await Correspondencia.findAll({
      where: {
        idEntidad: actorId,
        eliminado: false
      },
      include: [
        {
          model: Archivo,
          as: 'archivos',
          where: { eliminado: false },
          required: false,
          attributes: ['idArchivo', 'nombre', 'tamanio', 'enlace', 'tipo']
        }
      ]
    });

    res.status(200).json({
      success: true,
      data: correspondencias,
      message: 'Correspondencias listadas exitosamente'
    });
  } catch (error) {
    console.error('Error al listar correspondencias:', error);
    res.status(500).json({
      success: false,
      message: 'Error al listar correspondencias',
      error: error.message
    });
  }
};

// Definir asociaciones
Correspondencia.hasMany(Archivo, {
  foreignKey: 'idCorrespondencia',
  as: 'archivos'
});

Archivo.belongsTo(Correspondencia, {
  foreignKey: 'idCorrespondencia',
  as: 'correspondencia'
});

export const obtenerCorrespondenciaConArchivos = async (req, res) => {
  try {
    const { idCorrespondencia } = req.params;

    // Obtener la correspondencia con sus archivos
    const correspondencia = await Correspondencia.findOne({
      where: {
        idCorrespondencia,
        eliminado: false
      },
      attributes: ['idCorrespondencia', 'asunto', 'fechaHoraCorrespondencia', 'idTipoCorrespondencia', 'fechaCreacion'],
      include: [
        {
          model: Archivo,
          as: 'archivos',
          where: { eliminado: false },
          required: false,
          attributes: ['idArchivo', 'nombre', 'tamanio', 'enlace', 'tipo']
        }
      ]
    });

    if (!correspondencia) {
      return res.status(404).json({
        success: false,
        message: 'Correspondencia no encontrada.'
      });
    }

    res.status(200).json({
      success: true,
      data: correspondencia,
      message: 'Correspondencia obtenida exitosamente.'
    });
  } catch (error) {
    console.error('Error al obtener la correspondencia:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener la correspondencia.',
      error: error.message
    });
  }
};

// funcion para guardar la correspondencia.
export const actualizarCorrespondencia = async (req, res) => {
  console.log('🚀🚀🚀 : req', req.body);
  const { idCorrespondencia } = req.params;
  console.log('🚀🚀🚀 : idCorrespondencia', idCorrespondencia);

  const transaction = await Correspondencia.sequelize.transaction();

  try {
    const { asunto, fechaHoraCorrespondencia, idTipoCorrespondencia, idEntidad, fechaCreacion } = req.body;
    // const { idEstado, archivos, ...corresp } = req.body;

    const correspondencia = await Correspondencia.update({
      asunto: asunto,
      fechaHoraCorrespondencia: fechaHoraCorrespondencia || null,
      idTipoCorrespondencia: idTipoCorrespondencia,
      idEntidad: Number(idEntidad),
      fechaCreacion: fechaCreacion || new Date(),
    }, {
      where: { idCorrespondencia },
      transaction,
      context: req,
    });

    // Obtener la correspondencia 
    const correspondenciaActualizada = await Correspondencia.findOne({
      where: {
        idCorrespondencia,
        eliminado: false
      },
      transaction,
      context: req
    });

    console.log(`Correspondencia creada con ID: ${correspondencia.idCorrespondencia}`);

    await transaction.commit();
    console.log('Transacción completada exitosamente');

    res.status(200).json({
      success: true,
      data: correspondenciaActualizada,
      message: 'Correspondencia guardada exitosamente',
    });
  } catch (error) {
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error(`Error en la transacción: ${error.message}`);
    res.status(500).json({
      success: false,
      data: null,
      message: 'Error al procesar la transacción', error: error.message,
    });
  }
};

// funcion para eliminar una correspondencia de un id correspondencia dado.
// esta funcion actualizar la columna eliminado a true

export const eliminarCorrespondencia = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const { idCorrespondencia } = req.params;

    // Verificar si la reunión existe
    const reunion = await Correspondencia.findOne({
      where: { idCorrespondencia: idCorrespondencia, eliminado: false }
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