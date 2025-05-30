import multer from 'multer';
import fs from 'fs';
import { fileTypeFromFile } from 'file-type';
import path from 'path';

import { sequelize } from '../database.js';

import ArchivoModel from '../models/archivo.js';
import ReunionModel from '../models/reunion.js';
import CorrespondenciaModel from '../models/correspondencia.js';
// import ParametricosModel from '../models/parametricos.js';
import CodificadoresModel from '../models/codificadores.js';
// import AgendaModel from '../models/agenda.js';
import RepresentanteModel from '../models/representante.js';
import { estadosReunion, varios } from '../env/env.js';

const Archivo = ArchivoModel(sequelize);
const Reunion = ReunionModel(sequelize);
const Correspondencia = CorrespondenciaModel(sequelize);
// const Parametricos = ParametricosModel(sequelize);
const Codificadores = CodificadoresModel(sequelize);
// const Agenda = AgendaModel(sequelize);
const Representante = RepresentanteModel(sequelize);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: (req, file, cb) => {
    const originalName = path.parse(file.originalname).name; // Nombre sin extensión
    const extension = path.extname(file.originalname);       // Extensión del archivo

    const processedName = originalName
      .toLowerCase()
      .replace(/\s+/g, '-')         // Reemplaza espacios por guiones
      .replace(/[^a-z0-9\-]/g, '')  // Elimina caracteres especiales
      .replace(/^-+|-+$/g, '');     // Elimina guiones al inicio y al final

    const finalFileName = `${processedName}${extension}`;    // Nombre final del archivo

    cb(null, finalFileName); // Callback con el nuevo nombre
  }
});

const upload = multer({ storage: storage });

const logToFile = (message) => {
  const timestamp = new Date().toISOString();
  fs.appendFileSync('interaction_log.txt', `${timestamp}: ${message}\n`);
  console.log(message);
};

export const createMeeting = async (req, res) => {
  const { actorId } = req.params;
  console.log("🚀🚀🚀 : actorId", actorId);
  logToFile('Iniciando proceso de creación de interacción');

  const transaction = await Reunion.sequelize.transaction();

  try {
    // Manejar la carga de archivos
    await new Promise((resolve, reject) => {
      upload.array('attachments')(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Verificar si req.files está poblado
    if (!req.files || req.files.length === 0) {
      console.log('No se encontraron archivos en la solicitud.');
    } else {
      console.log(`Archivos recibidos: ${req.files.length}`);
      req.files.forEach(file => console.log(`Archivo: ${file.filename}, Tamaño: ${file.size} bytes`));
    }

    logToFile('Archivos cargados exitosamente');
    logToFile(`Datos del formulario recibidos: ${JSON.stringify(req.body)}`);

    const formData = req.body;
    console.log("🚀🚀🚀 : formData", formData);

    let idLocutor;
    let representanteCreado;

    // Verificar si formData.representantes existe y no está vacío
    if (formData.representantes && formData.representantes !== '[]') {
      const representantes = JSON.parse(formData.representantes);
      console.log('🚀🚀🚀 : represen', representantes);

      if (representantes.length > 0) {
        let cargoNuevo = {};

        if (representantes[0].idCargo === -1) {
          cargoNuevo = await Codificadores.create({
            idParametrica: varios.ID_PARAMETRO_CARGO,
            nombre: representantes[0].cargo.nombre.toUpperCase().trim().replace(/ /g, ''),
            codigo: representantes[0].cargo.nombre.toUpperCase().trim().replace(/ /g, ''),
            estado: 'activo',
            eliminado: false,
          }, { transaction, context: req });
        }

        const representantesParaCrear = representantes.map(representante => ({
          nombres: representante.nombres,
          apellidoPaterno: representante.apellidoPaterno,
          apellidoMaterno: representante.apellidoMaterno,
          idCargo: (representante.idCargo === -1) ? cargoNuevo.idCodificador : representante.idCargo,
          celular: representante.celular,
          tieneWhatsApp: representante.tieneWhatsApp,
          idEntidad: actorId,
          idEstado: varios.ACTIVO, // Estado activo
          fechaCreacion: new Date(),
          eliminado: false,
        }));

        try {
          representanteCreado = await Promise.all(
            representantesParaCrear.map(representante =>
              Representante.create(representante, { transaction, context: req })
            )
          );
          idLocutor = representanteCreado[0].idRepresentante;
        } catch (error) {
          console.error('Error al crear representantes:', error);
          throw error;
        }
      }
    }

    // Si no se creó un nuevo representante, usar el locutor existente
    if (!idLocutor) {
      idLocutor = formData.locutor !== 'null' ? formData.locutor : null;
    }

    console.log("🚀🚀🚀 : representanteCreado", representanteCreado);
    console.log("🚀🚀🚀 : idLocutor", idLocutor);

    const reunion = await Reunion.create({
      tip_id: formData.interactionType,
      fechaHoraInicio: formData.fechaHoraInicio || new Date(),
      idLocutor: idLocutor,
      lugar: formData.lugar,
      asunto: formData.asunto,
      fechaHoraConvenio: formData.fechaHoraConvenio || null,
      tipo: formData.interactionType,
      acuerdos: formData.acuerdos,
      idEntidad: Number(actorId),
      idEstado: estadosReunion.FINALIZADA, // Estado activo
      fechaCreacion: new Date(),
      eliminado: false,
    }, { transaction, context: req });

    logToFile(`reunion creada con ID: ${reunion.idReunion}`);

    const agenda = JSON.parse(formData.agenda);
    console.log("🚀🚀🚀 : agenda ", agenda);

    // Guardar la(s) reunión(es) en lugar de la agenda
    if (agenda && agenda.length > 0) {
      const reunionesPromises = agenda.map(async (item) => {
        return await Reunion.create({
          fechaHoraInicio: item.fechaHoraInicio,
          asunto: item.asunto,
          idEntidad: Number(actorId),
          idReunionPadre: reunion.idReunion,
          idEstado: estadosReunion.PENDIENTE,  // Estado activo
          fechaCreacion: new Date(),
          eliminado: false,
        }, { transaction, context: req });
      });

      await Promise.all(reunionesPromises);
      logToFile('Reuniones creadas exitosamente');
    }

    // Procesar archivos adjuntos si existen
    if (req.files && req.files.length > 0) {
      logToFile(`Procesando ${req.files.length} archivos adjuntos`);

      const archivosPromises = req.files.map(async (file) => {
        const fileTypeResult = await fileTypeFromFile(file.path);
        return await Archivo.create({
          nombre: file.filename,
          ruta: file.path,
          tipo: fileTypeResult ? fileTypeResult.mime : file.mimetype,
          tamanio: file.size,
          fecha: new Date(),
          enlace: file.path,
          idReunion: reunion.idReunion,
          eliminado: false,
          fechaCreacion: new Date(),
          idEstado: varios.ACTIVO,
        }, { transaction, context: req });
      });

      await Promise.all(archivosPromises);
      logToFile('Todos los archivos adjuntos procesados y guardados');
    }

    // Hacer commit de la transacción
    await transaction.commit();
    logToFile('Transacción completada exitosamente');

    res.status(200).json({
      success: true,
      message: 'Datos enviados exitosamente',
      data: reunion
    });
  } catch (error) {
    // Hacer rollback si ocurre un error
    await transaction.rollback();
    logToFile(`Error en la transacción: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al enviar los datos',
      error: error.message
    });
  }
};

export const createCorrespondencia = async (req, res) => {
  const { actorId } = req.params;
  logToFile('Iniciando proceso de creación de interacción');

  const transaction = await Correspondencia.sequelize.transaction();

  try {
    upload.array('attachments')(req, res, async (err) => {
      if (err) {
        logToFile(`Error en la carga de archivos: ${err.message}`);
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'Error al cargar archivos' });
      }

      logToFile('Archivos cargados exitosamente');
      logToFile(`Datos del formulario recibidos: ${JSON.stringify(req.body)}`);

      const formData = req.body;

      try {
        const correspondencia = await Correspondencia.create({
          asunto: formData.asunto,
          fechaHoraCorrespondencia: formData.fechaHoraCorrespondencia || null,
          idTipoCorrespondencia: formData.idTipoCorrespondencia,
          idEntidad: Number(actorId),
          idEstado: varios.ACTIVO, // Estado activo
          fechaCreacion: formData.fechaHoraRecepcion || new Date(),
        }, { transaction, context: req });

        logToFile(`Correspondencia creada con ID: ${correspondencia.idCorrespondencia}`);

        if (req.files && req.files.length > 0) {
          logToFile(`Procesando ${req.files.length} archivos adjuntos`);

          const archivosPromises = req.files.map(async (file) => {
            if (!file.path) {
              logToFile(`El archivo ${file.filename} no tiene un path definido.`);
              throw new Error(`El archivo ${file.filename} no tiene un path definido.`);
            }

            try {
              // Usar fileTypeFromFile para determinar el MIME type del archivo
              const fileTypeResult = await fileTypeFromFile(file.path);

              return await Archivo.create({
                nombre: file.filename,
                ruta: file.path,
                tipo: fileTypeResult ? fileTypeResult.mime : file.mimetype,
                tamanio: file.size,
                fecha: new Date(),
                enlace: file.path,
                idCorrespondencia: correspondencia.idCorrespondencia,
                eliminado: false,
                fechaCreacion: new Date(),
                idEstado: varios.ACTIVO, // Estado activo
              }, { transaction, context: req });
            } catch (error) {
              logToFile(`Error al procesar el archivo ${file.filename}: ${error}`);
              throw error;
            }
          });

          await Promise.all(archivosPromises);
          logToFile('Todos los archivos adjuntos procesados y guardados');
        }

        await transaction.commit();
        logToFile('Transacción completada exitosamente');

        res.status(200).json({
          success: true,
          message: 'Datos enviados exitosamente',
          data: correspondencia
        });
      } catch (error) {
        if (!transaction.finished) {
          await transaction.rollback();
        }
        logToFile(`Error en la transacción: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error al procesar la transacción', error: error.message });
      }
    });
  } catch (error) {
    logToFile(`Error general: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al enviar los datos',
      error: error.message
    });
  }
};


export const obtenerImagen = async (req, res) => {
  const { idArchivo } = req.params;
  console.log("🚀 Solicitando archivo con ID:", idArchivo);

  try {
    // Validar que el ID sea válido
    if (!idArchivo || isNaN(idArchivo)) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'ID de archivo inválido'
      });
    }

    // Obtener el registro de la imagen desde la base de datos
    const imagen = await Archivo.findOne({
      where: {
        idArchivo,
        eliminado: false
      }
    });

    console.log("🚀 Registro de imagen encontrado:", imagen ? "Sí" : "No");

    if (!imagen) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Imagen no encontrada en la base de datos'
      });
    }

    // Construir la ruta completa al archivo de imagen
    const imagePath = path.resolve('uploads', imagen.nombre);
    console.log("🚀 Ruta de la imagen:", imagePath);

    // Verificar que el archivo existe físicamente
    if (!fs.existsSync(imagePath)) {
      console.log("❌ Archivo físico no encontrado en:", imagePath);
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Archivo físico no encontrado'
      });
    }

    // Obtener información del archivo
    const fileStats = fs.statSync(imagePath);

    // Configurar headers apropiados
    res.writeHead(200, {
      'Content-Type': imagen.tipo || 'application/octet-stream',
      'Content-Length': fileStats.size,
      'Content-Disposition': `inline; filename="${imagen.nombre}"`,
      'Cache-Control': 'public, max-age=31536000' // Cache por 1 año
    });

    // Crear un stream de lectura
    const fileStream = fs.createReadStream(imagePath);

    // Manejar errores del stream
    fileStream.on('error', (error) => {
      console.error('Error en el stream de lectura:', error);
      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          data: null,
          message: 'Error al leer el archivo'
        });
      }
      // Cerrar el stream en caso de error
      fileStream.destroy();
    });

    // Manejar cierre de conexión por parte del cliente
    res.on('close', () => {
      fileStream.destroy();
    });

    // Manejar finalización exitosa
    fileStream.on('end', () => {
      console.log("✅ Archivo enviado exitosamente");
    });

    // Enviar el archivo usando streaming
    fileStream.pipe(res);

  } catch (error) {
    console.error('Error al procesar la solicitud de imagen:', error);

    // Solo enviar respuesta si no se han enviado headers
    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        data: null,
        message: 'Error al procesar la solicitud de imagen'
      });
    }

    // Si ya se enviaron headers, intentar cerrar la conexión limpiamente
    try {
      res.end();
    } catch (endError) {
      console.error('Error al cerrar la respuesta:', endError);
    }
  }
};

// Middleware de recuperación para la ruta
export const errorHandlerMiddleware = (err, req, res, next) => {
  console.error('Error en el middleware:', err);

  if (!res.headersSent) {
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Error interno del servidor'
    });
  }

  next(err);
};

export const updateMeeting = async (req, res) => {
  const { actorId, reunionId } = req.params;
  console.log("🚀🚀🚀 : actorId", actorId);
  console.log("🚀🚀🚀 : reunionId", reunionId);
  logToFile('Iniciando proceso de actualización de interacción');

  const transaction = await Reunion.sequelize.transaction();

  try {
    // Manejar la carga de archivos usando Promesas
    await new Promise((resolve, reject) => {
      upload.array('attachments')(req, res, (err) => {
        if (err) return reject(err);
        resolve();
      });
    });

    // Verificar si se recibieron archivos
    if (!req.files || req.files.length === 0) {
      console.log('No se encontraron archivos en la solicitud.');
    } else {
      console.log(`Archivos recibidos: ${req.files.length}`);
      req.files.forEach(file => console.log(`Archivo: ${file.originalname}, Tamaño: ${file.size} bytes`));
    }

    logToFile('Archivos cargados exitosamente');
    logToFile(`Datos del formulario recibidos: ${JSON.stringify(req.body)}`);

    const formData = req.body;
    console.log("🚀🚀🚀 : formData", formData);

    // Procesar representantes
    const representantes = JSON.parse(formData.representantes || '[]');
    console.log("🚀🚀🚀 : representantes ", representantes);

    let representantesParaCrear = [];
    let representantesParaActualizar = [];
    let representanteCreado = [];

    if (representantes && representantes.length > 0) {
      representantes.forEach(representante => {
        if (representante.idRepresentante) {
          // Agregar a la lista de actualización
          representantesParaActualizar.push(representante);
        } else {
          // Agregar a la lista de creación
          representantesParaCrear.push(representante);
        }
      });

      // Actualizar representantes existentes
      if (representantesParaActualizar.length > 0) {
        for (const representante of representantesParaActualizar) {
          await Representante.update(
            {
              nombres: representante.nombres,
              apellidoPaterno: representante.apellidoPaterno,
              apellidoMaterno: representante.apellidoMaterno,
              idCargo: representante.idCargo,
              celular: representante.celular,
              tieneWhatsApp: representante.tieneWhatsApp,
              fechaModificacion: new Date(),
              eliminado: false,
            },
            {
              where: { idRepresentante: representante.idRepresentante },
              transaction,
              context: req,
            }
          );
        }
      }

      // Crear nuevos representantes
      if (representantesParaCrear.length > 0) {
        const representantesToCreate = representantesParaCrear.map(representante => ({
          nombres: representante.nombres,
          apellidoPaterno: representante.apellidoPaterno,
          apellidoMaterno: representante.apellidoMaterno,
          idCargo: representante.idCargo,
          celular: representante.celular,
          tieneWhatsApp: representante.tieneWhatsApp,
          idEntidad: actorId,
          idEstado: varios.ACTIVO, // Estado activo
          fechaCreacion: new Date(),
          eliminado: false,
        }));

        try {
          representanteCreado = await Promise.all(
            representantesToCreate.map(representante =>
              Representante.create(representante, { transaction, context: req })
            )
          );
        } catch (error) {
          console.error('Error al crear representantes:', error);
          throw error; // Propagar el error para ser capturado en el catch
        }
      }
    }

    // Determinar el id del locutor
    let idLocutor;
    if (representanteCreado && representanteCreado.length > 0) {
      idLocutor = representanteCreado[0].idRepresentante;
    } else {
      idLocutor = formData.locutor;
    }

    console.log("🚀🚀🚀 : representanteCreado", representanteCreado);
    console.log("🚀🚀🚀 : idLocutor", idLocutor);

    // Obtener la reunión existente
    const reunion = await Reunion.findOne({
      where: {
        idReunion: reunionId,
        idEntidad: actorId,
        eliminado: false,
      },
      transaction,
    });

    if (!reunion) {
      throw new Error('Reunión no encontrada');
    }

    // Actualizar la reunión
    await reunion.update(
      {
        tip_id: formData.interactionType,
        // fechaHoraInicio: formData.fechaHoraInicio || new Date(),
        idLocutor: idLocutor,
        lugar: formData.lugar,
        asunto: formData.asunto,
        fechaHoraConvenio: formData.fechaHoraConvenio || new Date(),
        tipo: formData.interactionType,
        acuerdos: formData.acuerdos,
        idEstado: estadosReunion.FINALIZADA, // Estado activo
        fechaModificacion: new Date(),
        eliminado: false,
      },
      { transaction, context: req }
    );

    logToFile(`Reunión actualizada con ID: ${reunion.idReunion}`);

    const agenda = JSON.parse(formData.agenda);
    console.log("🚀🚀🚀 : agenda ", agenda);

    // agendar reunion
    // Guardar la(s) reunión(es) en lugar de la agenda
    if (agenda && agenda.length > 0) {
      // Convertimos la agenda en reuniones
      const reunionesPromises = agenda.map(async (item) => {
        return await Reunion.create({
          // idReunion: item.idAgenda,  // Usamos idAgenda como idReunion si existe, o puedes generar un nuevo ID
          fechaHoraInicio: item.fechaHoraInicio,  // Usamos la fecha de la agenda como fecha de inicio de la reunión
          asunto: item.asunto,  // Asunto de la agenda ahora es el asunto de la reunión
          idEntidad: Number(actorId),  // Asociamos la reunión a la entidad correspondiente (si aplica)
          idReunionPadre: reunion.idReunion,  // Asociamos la reunión a la reunión padre (si aplica)
          idEstado: estadosReunion.PENDIENTE,  // Estado pendiente
          fechaCreacion: new Date(),
          eliminado: false,
        }, { transaction, context: req });
      });

      // Guardamos todas las reuniones en paralelo
      await Promise.all(reunionesPromises);
      logToFile('Reuniones creadas exitosamente');
    }

    // Procesar archivos adjuntos
    if (req.files && req.files.length > 0) {
      logToFile(`Procesando ${req.files.length} archivos adjuntos`);

      const archivosPromises = req.files.map(async (file) => {
        const fileTypeResult = await fileTypeFromFile(file.path);
        return await Archivo.create(
          {
            nombre: file.filename, // Usamos file.filename que contiene el nombre final
            ruta: file.path,
            tipo: fileTypeResult ? fileTypeResult.mime : file.mimetype,
            tamanio: file.size,
            fecha: new Date(),
            enlace: file.path,
            idReunion: reunion.idReunion,
            eliminado: false,
            fechaCreacion: new Date(),
            idEstado: varios.ACTIVO, // Estado activo
          },
          { transaction, context: req }
        );
      });

      await Promise.all(archivosPromises);
      logToFile('Todos los archivos adjuntos procesados y guardados');
    }

    // Confirmar la transacción
    await transaction.commit();
    logToFile('Transacción completada exitosamente');

    res.status(200).json({
      success: true,
      message: 'Datos actualizados exitosamente',
      data: reunion,
    });
  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();
    logToFile(`Error en la transacción: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al actualizar los datos',
      error: error.message,
    });
  }
};

export const actualizarReunionEstado = async (req, res) => {
  const { reunionId } = req.params;
  console.log("🚀🚀🚀 : idReunion", reunionId);
  const { idEstado, motivo, fechaHoraInicio, asunto } = req.body;
  console.log("🚀🚀🚀 : req.body", req.body);

  const transaction = await Reunion.sequelize.transaction(); // Iniciar transacción

  try {
    // Encontrar la reunión por id
    const reunion = await Reunion.findByPk(reunionId, { transaction });
    let newReunion;

    if (!reunion) {
      await transaction.rollback(); // Revertir la transacción si no se encuentra la reunión
      return res.status(404).json({
        success: false,
        message: 'Reunión no encontrada.'
      });
    }

    // Actualizar los campos de la reunión
    newReunion = await reunion.update({
      idEstado: idEstado, // Actualizar el estado
      motivo: motivo,
      fechaSuspencion: new Date(),
    }, { transaction, context: req });

    // Si el estado es 81, crear una nueva reunión relacionada
    if (idEstado == estadosReunion.SUSPENDIDA) {
      newReunion = await Reunion.create({
        asunto: reunion.asunto || asunto, // Reutilizar asunto o asignar uno nuevo si se proporciona
        fechaHoraInicio: fechaHoraInicio || new Date(), // Fecha proporcionada o actual
        idReunionPadre: reunion.idReunion, // Relacionar con la reunión padre
        idEntidad: reunion.idEntidad, // Mantener la entidad original
        idLocutor: reunion.idLocutor, // Mantener el locutor original
        idEstado: estadosReunion.PENDIENTE, // Estado pendiente
        fechaCreacion: new Date(),
        eliminado: false
      }, { transaction, context: req });
    }

    // Hacer commit de la transacción
    await transaction.commit();

    return res.status(200).json({
      success: true,
      message: 'Reunión actualizada correctamente.',
      data: newReunion
    });

  } catch (error) {
    // Hacer rollback de la transacción si ocurre un error
    await transaction.rollback();
    console.error('Error al actualizar la reunión:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al actualizar la reunión.',
      error: error.message
    });
  }
};

// funcion de guardar la imagen
export const guardarArchivo = async (req, res) => {
  // const { idArchivo } = req.params;
  logToFile('Iniciando proceso de guardado de archivo');

  const transaction = await Archivo.sequelize.transaction();

  try {
    upload.single('archivo')(req, res, async (err) => {
      if (err) {
        logToFile(`Error en la carga del archivo: ${err.message}`);
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'Error al cargar el archivo' });
      }

      logToFile('Archivo cargado exitosamente');

      const file = req.file;
      if (!file) {
        logToFile('No se ha proporcionado ningún archivo');
        await transaction.rollback();
        return res.status(400).json({ success: false, message: 'No se ha proporcionado ningún archivo' });
      }

      const { idReunion, idCorrespondencia } = req.body;
      console.log('🚀🚀🚀 : idCorrespondencia', idCorrespondencia)
      console.log('🚀🚀🚀 : idReunion', idReunion)

      try {
        const fileTypeResult = await fileTypeFromFile(file.path);

        const archivo = await Archivo.create({
          nombre: file.filename,
          ruta: file.path,
          tipo: fileTypeResult ? fileTypeResult.mime : file.mimetype,
          tamanio: file.size,
          fecha: new Date(),
          enlace: file.path,
          idReunion: idReunion !== undefined ? idReunion : null,
          idCorrespondencia: idCorrespondencia !== undefined ? idCorrespondencia : null,
          eliminado: false,
          fechaCreacion: new Date(),
          idEstado: varios.ACTIVO,
        }, { transaction, context: req });

        logToFile(`Archivo guardado con ID: ${archivo.idArchivo}`);

        await transaction.commit();
        logToFile('Transacción completada exitosamente');

        res.status(200).json({
          success: true,
          message: 'Archivo guardado exitosamente',
          data: archivo
        });
      } catch (error) {
        if (!transaction.finished) {
          await transaction.rollback();
        }
        logToFile(`Error en la transacción: ${error.message}`);
        res.status(500).json({ success: false, message: 'Error al procesar la transacción', error: error.message });
      }
    });
  } catch (error) {
    logToFile(`Error general: ${error.message}`);
    res.status(500).json({
      success: false,
      message: 'Error al guardar el archivo',
      error: error.message
    });
  }
};