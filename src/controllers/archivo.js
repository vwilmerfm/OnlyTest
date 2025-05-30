import { sequelize } from '../database.js';

import ArchivoModel from '../models/archivo.js';

const Archivo = ArchivoModel(sequelize);

// funcion de eliminar archivos de un id archivo dado.
// esta funcion actualizar la columna eliminado a true

export const eliminarArchivo = async (req, res) => {
  const { idArchivo } = req.params;
  let transaction;

  try {
    // Verificar la conexión antes de iniciar la transacción
    await sequelize.authenticate();

    transaction = await sequelize.transaction();

    // Buscar el archivo
    const archivo = await Archivo.findOne({
      where: {
        idArchivo,
        eliminado: false
      },
      transaction,
      lock: true  // Bloquear el registro durante la transacción
    });

    if (!archivo) {
      if (transaction) await transaction.rollback();
      return res.status(404).json({
        success: false,
        data: null,
        message: 'No se encontró el archivo o ya está eliminado'
      });
    }

    // Actualizar el archivo
    const [updateCount] = await Archivo.update(
      {
        eliminado: true,
        fechaModificacion: new Date()
      },
      {
        where: {
          idArchivo,
          eliminado: false  // Doble verificación
        },
        transaction
      }
    );

    if (updateCount === 0) {
      if (transaction) await transaction.rollback();
      return res.status(409).json({
        success: false,
        data: null,
        message: 'El archivo ya ha sido eliminado por otro proceso'
      });
    }

    // Obtener el archivo actualizado
    const archivoActualizado = await Archivo.findByPk(idArchivo, {
      transaction,
      lock: true
    });

    await transaction.commit();

    return res.json({
      success: true,
      data: archivoActualizado,
      message: 'Archivo eliminado exitosamente'
    });

  } catch (error) {
    console.error('Error al eliminar el archivo:', error);

    try {
      if (transaction) await transaction.rollback();
    } catch (rollbackError) {
      console.error('Error adicional durante rollback:', rollbackError);
    }

    // Manejar específicamente errores de conexión
    if (error.name === 'SequelizeConnectionError' ||
      error.name === 'SequelizeConnectionRefusedError' ||
      error.code === 'ECONNRESET') {
      return res.status(503).json({
        success: false,
        data: null,
        message: 'Error de conexión con la base de datos. Por favor, intente nuevamente.'
      });
    }

    return res.status(500).json({
      success: false,
      data: null,
      message: 'Error al eliminar el archivo: ' + error.message
    });
  } finally {
    // Asegurarse de que la conexión se libere apropiadamente
    if (transaction && !transaction.finished) {
      try {
        await transaction.rollback();
      } catch (finallyError) {
        console.error('Error en finally durante rollback:', finallyError);
      }
    }
  }
};