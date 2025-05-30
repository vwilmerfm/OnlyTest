// añadiendo comentario
import { Op, QueryTypes } from 'sequelize';
import { sequelize } from '../database.js';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid';

import { obtenerUsuario } from '../controllers/auth.js';

import { alcanceActor, alcanceUsuario, tipoRelacion, estadosReunion, varios } from '../env/env.js';

import EntidadModel from '../models/entidad.js';
import AfiliadoModel from '../models/afiliado.js';
import ParametricosModel from '../models/parametricos.js';
import CodificadoresModel from '../models/codificadores.js';
import RepresentanteModel from '../models/representante.js';
import ReunionModel from '../models/reunion.js';
import ArchivoModel from '../models/archivo.js';
// import MunicipioModel from '../models/vistas/municipio.js';
// @ts-ignore
import DepartamentoModel from '../models/catalogo/departamento.js';
// @ts-ignore
// import ProvinciaModel from '../models/catalogo/provincia.js';
import MunicipioModel from '../models/catalogo/municipio.js';


// Instanciar los modelos
const Entidad = EntidadModel(sequelize);
const Afiliado = AfiliadoModel(sequelize);
const Parametricos = ParametricosModel(sequelize);
const Codificadores = CodificadoresModel(sequelize);
const Representante = RepresentanteModel(sequelize);
const Reunion = ReunionModel(sequelize);
const Archivo = ArchivoModel(sequelize);
// const Municipio = MunicipioModel(sequelize);
const Departamento = DepartamentoModel(sequelize);
// const Provincia = ProvinciaModel(sequelize);
const Municipio = MunicipioModel(sequelize);


Parametricos.hasMany(Codificadores, { foreignKey: 'par_id' });
Codificadores.belongsTo(Parametricos, { foreignKey: 'par_id' });


// Crear una nueva entidad
// @ts-ignore
export const createActor = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      nombreEntidad,
      sigla,
      idAlcance,
      direccion,
      telefonos,
      redesSociales,
      idTipoOrganizacion,
      idNacionalDepartamentalMunicipal,
      idMinisterio,
      idLegislativoEjecutivo,
      Representantes,
      entidadesSuperioresAfiliadas,
      codigoEntidadesAfiliados,
      datosAlcance,
      idPrivados,
    } = req.body;

    console.log("Datos recibidos:", JSON.stringify(req.body, null, 2));

    const codigoEntidadUuid = uuidv4();

    // Crear la nueva entidad
    const nuevaEntidad = await Entidad.create({
      codigoEntidad: codigoEntidadUuid,
      nombreEntidad,
      sigla,
      idAlcance,
      direccion,
      telefonos: JSON.stringify(telefonos),
      redesSociales: JSON.stringify(redesSociales),
      idTipoOrganizacion: Number(idTipoOrganizacion),
      idNacionalDepartamentalMunicipal: idNacionalDepartamentalMunicipal,
      idMinisterio: idMinisterio,
      idLegislativoEjecutivo: idLegislativoEjecutivo,
      idPrivados: idPrivados,
      datosAlcance,
      idEstado: 65, // Asumiendo que 65 es el estado 'activo'
      eliminado: false,
      fechaCreacion: new Date(),
    }, { transaction, context: req });

    console.log("Nueva entidad creada:", nuevaEntidad.toJSON());

    // Manejar entidades superiores afiliadas
    if (entidadesSuperioresAfiliadas && entidadesSuperioresAfiliadas.length > 0) {
      await Promise.all(entidadesSuperioresAfiliadas.map(idEntidadSuperior =>
        Afiliado.create({
          idEntidad: idEntidadSuperior,
          idEntidadAfiliado: nuevaEntidad.idEntidad,
          idEstado: 65,
          eliminado: false,
          fechaModificacion: new Date(),
        }, { transaction, context: req })
      ));
    }

    // Manejar entidades afiliadas
    if (codigoEntidadesAfiliados && codigoEntidadesAfiliados.length > 0) {
      await Promise.all(codigoEntidadesAfiliados.map(idEntidadSuperior =>
        Afiliado.create({
          idEntidad: nuevaEntidad.idEntidad,
          idEntidadAfiliado: idEntidadSuperior,
          eliminado: false,
          fechaModificacion: new Date(),
          idEstado: 65,
        }, { transaction, context: req })
      ));
    }

    // Manejar representantes
    if (Representantes && Representantes.length > 0) {
      for (const representante of Representantes) {
        let idCargoFinal;

        // Si el idCargo es -1, crear un nuevo cargo
        if (representante.idCargo === -1) {
          const nuevoCargo = await Codificadores.create({
            idParametrica: varios.ID_PARAMETRO_CARGO,
            nombre: representante.cargo.nombre.toUpperCase().trim(),
            codigo: representante.cargo.nombre.toUpperCase().trim().replace(/ /g, ''),
            estado: 'activo',
            eliminado: false,
          }, { transaction, context: req });

          idCargoFinal = nuevoCargo.idCodificador;
          console.log("Nuevo cargo creado:", nuevoCargo.toJSON());
        } else {
          idCargoFinal = representante.idCargo;
        }

        // Verificar que idCargoFinal tenga un valor válido
        if (idCargoFinal == null) {
          throw new Error(`No se pudo determinar un idCargo válido para el representante: ${JSON.stringify(representante)}`);
        }

        // Crear el representante
        const nuevoRepresentante = await Representante.create({
          nombres: representante.nombres,
          apellidoPaterno: representante.apellidoPaterno,
          apellidoMaterno: representante.apellidoMaterno,
          idCargo: idCargoFinal,
          celular: representante.celular,
          tieneWhatsApp: representante.tieneWhatsApp,
          idEntidad: nuevaEntidad.idEntidad,
          idEstado: varios.ACTIVO,
          fechaCreacion: new Date(),
          eliminado: false,
        }, { transaction, context: req });

        console.log("Nuevo representante creado:", nuevoRepresentante.toJSON());
      }
    }

    // Confirmar la transacción
    await transaction.commit();

    return res.status(201).json({
      message: 'Datos guardados exitosamente.',
      entidad: nuevaEntidad.toJSON()
    });

  } catch (error) {
    // Revertir la transacción en caso de error
    if (!transaction.finished) {
      await transaction.rollback();
    }
    console.error('Error al guardar la entidad y afiliaciones:', error);
    return res.status(500).json({
      message: 'Ocurrió un error al guardar los datos.',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// @ts-ignore
export const listaActores = async (req, res) => {
  const usuario = await obtenerUsuario(req.headers["token"]);
  const alcanceUsuarioId = usuario.aut_us_rol;
  console.log('🚀🚀🚀 : alcanceUsuarioId', alcanceUsuarioId)

  // Mapeo de alcances según el usuario
  const alcanceMap = {
    [alcanceUsuario.NACIONAL]: [
      alcanceActor.NACIONAL,
      alcanceActor.DEPARTAMENTAL,
      alcanceActor.PROVINCIAL,
      alcanceActor.MUNICIPAL
    ],
    [alcanceUsuario.DEPARTAMENTAL]: [
      alcanceActor.DEPARTAMENTAL,
      alcanceActor.PROVINCIAL,
      alcanceActor.MUNICIPAL
    ],
    [alcanceUsuario.PROVINCIAL]: [
      alcanceActor.PROVINCIAL,
      alcanceActor.MUNICIPAL
    ],
    [alcanceUsuario.MUNICIPAL]: [
      alcanceActor.MUNICIPAL
    ]
  };

  // Obtener el array de filtros basado en el alcance del usuario
  const alcanceFiltro = alcanceMap[alcanceUsuarioId] || [];

  console.log("🚀🚀🚀 : alcanceFiltro", alcanceFiltro);

  try {
    const resultado = await Entidad.findAll({
      where: {
        ent_eliminado: false,
        // Aplicar el filtro de alcances
        ent_alcance_id: {
          [Op.in]: alcanceFiltro
        }
      },
      order: [['ent_nombre', 'ASC']]
    });

    // Convertimos el campo redesSociales de string JSON a objeto
    const entidadesConvertidas = resultado.map(entidad => {
      return {
        ...entidad.get(), // Convierte el resultado a un objeto plano
        redesSociales: entidad.redesSociales ? JSON.parse(entidad.redesSociales) : null, // Convierte redesSociales a objeto
        telefonos: entidad.telefonos ? JSON.parse(entidad.telefonos) : null
      };
    });

    res.json({
      success: true,
      data: entidadesConvertidas,
      message: "Parametros listados exitosamente"
    });
  } catch (error) {
    console.error('Error al listar entidades:', error);
    res.status(500).json({
      success: false,
      message: "Error al listar entidades",
      error: error.message
    });
  }
};


export const obtenerParametricosActores = async (req, res) => {
  const usuario = await obtenerUsuario(req.headers["token"]);
  const alcanceUsuarioId = usuario.aut_us_rol;
  console.log('🚀🚀🚀 : alcanceUsuarioId', alcanceUsuarioId)
  // const alcanceUsuarioId = 78;

  // Mapping of alcanceUsuarioId to idCodificador values
  const alcanceIdCodificadorMap = {
    [alcanceUsuario.NACIONAL]: [13, 14, 15, 16],
    [alcanceUsuario.DEPARTAMENTAL]: [14, 15, 16],
    [alcanceUsuario.PROVINCIAL]: [15, 16],
    [alcanceUsuario.MUNICIPAL]: [16],
  };

  // Get the list of idCodificador to include based on the user's alcance
  const idCodificadoresIncluidos = alcanceIdCodificadorMap[alcanceUsuarioId] || [];

  try {
    // Fetch Parametricas with their Codificadores
    const resultados = await Parametricos.findAll({
      where: {
        [Op.or]: [
          { par_id: { [Op.between]: [3, 14] } },
          { par_id: 15 },
          { par_id: 16 },
          { par_id: 17 },
        ],
      },
      include: [
        {
          model: Codificadores,
          as: 'Codificadores',
          required: false,
        },
      ],
      order: [
        ['idParametricas', 'ASC'],
        [{ model: Codificadores, as: 'Codificadores' }, 'idCodificador', 'ASC'],
      ],
    });
    // console.log('🚀🚀🚀 : resultados', resultados)

    // Adjust Codificadores for Parametrica with idParametricas === 3
    const resultadosFiltrados = resultados.map((parametrica) => {
      if (parametrica.idParametricas === 3) {
        // Filter Codificadores based on idCodificadoresIncluidos
        const codificadoresFiltrados = parametrica.Codificadores.filter((codificador) =>
          idCodificadoresIncluidos.includes(codificador.idCodificador)
        );
        return {
          ...parametrica.toJSON(),
          Codificadores: codificadoresFiltrados,
        };
      } else {
        // Return other Parametricas without modification
        return parametrica.toJSON();
      }
    });

    res.json({
      success: true,
      data: resultadosFiltrados,
      message: "Parametros listados exitosamente",
    });
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({
      success: false,
      message: "Error al listar",
      error: error.message,
    });
  }
};


// @ts-ignore
export const buscarActoresPorCodigo = async (req, res) => {
  const { codigo } = req.body;
  console.log("🚀🚀🚀 : codigo", codigo)
  // console.log("🚀🚀🚀 : codigo", req.body)

  // Verifica que el código tenga al menos 2 caracteres
  if (!codigo || codigo.length < 2) {
    return res.status(400).json({ message: 'El código debe tener al menos 2 caracteres.' });
  }

  try {
    // Buscar actores (entidades) donde el código coincida parcialmente
    const actores = await Entidad.findAll({
      attributes: ['idEntidad', 'codigoEntidad', 'nombreEntidad'],
      where: {
        [Op.or]: [
          {
            codigoEntidad: {
              [Op.like]: `%${codigo}%` // Coincidencia parcial por código
            }
          },
          {
            nombreEntidad: {
              [Op.like]: `%${codigo}%` // Coincidencia parcial por nombre
            }
          }
        ]
      }
    });

    // Verifica si se encontraron actores
    if (actores.length === 0) {
      return res.status(404).json({ message: 'No se encontraron actores con ese código.' });
    }

    // Responde con la lista de actores
    // return res.status(200).json(actores);
    res.json({
      success: true,
      data: actores,
      message: "Parametros listados exitosamente"
    });
  } catch (error) {
    console.error('Error en buscarActoresPorCodigo:', error);
    return res.status(500).json({ message: 'Error al buscar actores.' });
  }
};

///// ACTOR /////



// Definir la relación si no está definida
Entidad.hasMany(Representante, { foreignKey: 'idEntidad' });
Representante.belongsTo(Entidad, { foreignKey: 'idEntidad' });

Representante.belongsTo(Codificadores, { foreignKey: 'idCargo', as: 'cargo' });

// @ts-ignore
export const obtenerRepresentantesConEntidad = async (req, res) => {
  console.log("🚀🚀🚀 : req", req.body)
  try {
    const resultados = await Entidad.findAll({
      attributes: ['idEntidad', 'codigoEntidad', 'nombreEntidad', 'ent_datos_alcance'],
      include: [{
        attributes: ['idRepresentante', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'idCargo', 'celular', 'tieneWhatsApp'],
        model: Representante,

        include: [{
          model: Codificadores,  // Relación con la tabla de codificadores para obtener el cargo
          as: 'cargo',         // Usa el alias definido en la asociación
          attributes: ['nombre', 'idCodificador'] // Atributos que quieres obtener del codificador (el nombre del cargo)
        }]
        // required: true // Esto asegura que solo se devuelvan representantes con entidades asociadas
      }]
    });
    // console.log("🚀🚀🚀 : resultados", resultados)

    // const entidadesConRepresentantes = resultados.map(entidad => ({
    //   ...entidad.dataValues,
    //   representantes: entidad.Representantes // Renombra Representantes a representantes
    // }));

    res.json({
      success: true,
      data: resultados,
      message: "Parametros listados exitosamente"
    });
  } catch (error) {
    console.error('Error al obtener los representantes con entidad:', error);
    res.status(500).json({
      success: false,
      message: "Error al listar entidades",
      // @ts-ignore
      error: error.message
    });
  }
};


// Relaciones entre los modelos
Reunion.hasMany(Archivo, { foreignKey: 'idReunion' });
Archivo.belongsTo(Reunion, { foreignKey: 'idReunion' });

Reunion.belongsTo(Representante, { foreignKey: 'idLocutor', as: 'locutorPrincipal' });


// @ts-ignore
export const obtenerReunionesDocumentos = async (req, res) => {
  var estados
  try {
    const { actorId } = req.params;
    console.log("🚀🚀🚀 : actorId", actorId);
    if (req.body.todos) {
      estados = [estadosReunion.PENDIENTE, estadosReunion.FINALIZADA, estadosReunion.SUSPENDIDA, estadosReunion.CANCELADA]
    } else {
      estados = [estadosReunion.PENDIENTE, estadosReunion.FINALIZADA]
    }
    // Obtener reuniones con estado 89 o 75, ordenadas por fecha
    const reuniones = await Reunion.findAll({
      where: {
        idEntidad: actorId,
        idEstado: {
          [Op.in]: estados,
          // [Op.in]: [estadosReunion.PENDIENTE, estadosReunion.FINALIZADA] // Filtrar solo los estados 79 y 67
        },
        eliminado: false
      },
      attributes: ['idReunion', 'fechaHoraInicio', 'asunto', 'lugar', 'acuerdos', 'tipo', 'idEstado', 'idLocutor'], // Campos específicos de la reunión
      include: [
        {
          model: Archivo,
          attributes: ['idArchivo', 'nombre', 'tamanio', 'enlace', 'tipo'], // Campos específicos del archivo
          where: {
            eliminado: false
          },
          required: false, // Incluir reuniones incluso si no tienen documentos
        },
        {
          model: Representante,
          as: 'locutorPrincipal', // Usa el alias definido en la asociación
          attributes: ['idRepresentante', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'celular', 'tieneWhatsApp'], // Campos del representante
        }
      ],
      order: [['fechaHoraInicio', 'ASC']] // Ordenar por fecha de inicio de la reunión
    });

    if (reuniones.length === 0) {
      return res.json({
        success: true,
        data: [],
        message: "No se encontraron reuniones para esta entidad."
      });
    }

    // Agrupar reuniones por estado
    // @ts-ignore
    const reunionesAgrupadasPorEstado = reuniones.reduce((result, reunion) => {
      const estado = reunion.idEstado;
      if (!result[estado]) {
        result[estado] = [];
      }
      result[estado].push(reunion);
      return result;
    }, {});

    // Ordenar las reuniones dentro de cada grupo
    if (reunionesAgrupadasPorEstado[estadosReunion.PENDIENTE]) {
      // Ordenar ascendente por fechaHoraInicio para estado 67 pendiente
      reunionesAgrupadasPorEstado[estadosReunion.PENDIENTE].sort((a, b) => new Date(a.fechaHoraInicio) - new Date(b.fechaHoraInicio));
    }

    if (reunionesAgrupadasPorEstado[estadosReunion.FINALIZADA]) {
      // Ordenar descendente por fechaHoraInicio para estado 79
      reunionesAgrupadasPorEstado[estadosReunion.FINALIZADA].sort((a, b) => new Date(b.fechaHoraInicio) - new Date(a.fechaHoraInicio));
    }

    // Responder con las reuniones agrupadas
    return res.json({
      success: true,
      data: reunionesAgrupadasPorEstado,
      message: "Reuniones y documentos listados exitosamente"
    });

  } catch (error) {
    console.error('Error al obtener reuniones y documentos:', error);
    return res.status(500).json({
      success: false,
      message: "Error al listar reuniones",
      // @ts-ignore
      error: error.message
    });
  }
};


// optener ciudad comunidad
// @ts-ignore
export const buscarPorCiudadComunidad = async (req, res) => {
  const { termino } = req.params;  // Capturamos el término de búsqueda desde la URL
  console.log("🚀🚀🚀 : termino", termino.toUpperCase())
  // toUpper

  try {
    // Realizamos la consulta a la base de datos usando LIKE
    const resultados = await Municipio.findAll({
      where: {
        nombreCiudadComunidad: {
          [Op.like]: `%${termino.toUpperCase()}%`  // Coincidencia parcial con el término ingresado
        }
      },
      attributes: ['codigo', 'nombreCiudadComunidad', 'nombreDepartamento']
    });

    // Devolvemos los resultados encontrados
    res.status(200).json({
      success: true,
      data: resultados,
      message: 'Búsqueda realizada con éxito'
    });
  } catch (error) {
    console.error('Error al realizar la búsqueda:', error);
    res.status(500).json({
      success: false,
      message: 'Error al realizar la búsqueda',
      // @ts-ignore
      error: error.message
    });
  }
};

export const actualizaraEntidad = async (req, res) => {
  const { actorId } = req.params;
  const transaction = await sequelize.transaction();

  try {
    const entidad = await Entidad.findByPk(actorId);

    if (!entidad) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Entidad no encontrada.'
      });
    }

    // Extraemos los campos que no queremos actualizar
    const {

      // eslint-disable-next-line no-unused-vars
      Representantes,
      // eslint-disable-next-line no-unused-vars
      entidadesSuperioresAfiliadas,
      // eslint-disable-next-line no-unused-vars
      poseeAfiliados,
      // eslint-disable-next-line no-unused-vars
      codigoEntidadesAfiliados,
      // eslint-disable-next-line no-unused-vars
      afiliacionEntidadSuperior,
      telefonos,
      redesSociales,
      ...datosActualizar
    } = req.body;

    // Convertimos los arrays a string JSON
    if (telefonos) {
      datosActualizar.telefonos = JSON.stringify(telefonos);
    }

    if (redesSociales) {
      datosActualizar.redesSociales = JSON.stringify(redesSociales);
    }

    // TODO: Cambiar los valores de idEstado a números
    // datosActualizar.idEstado = Number(65);
    // datosActualizar.eliminado = false;

    // Actualizamos la entidad
    await Entidad.update(datosActualizar, {
      where: {
        idEntidad: entidad.idEntidad
      },
      transaction
    });

    // Obtenemos la entidad actualizada
    const entidadActualizada = await Entidad.findByPk(actorId, {
      transaction
    });

    // Convertimos los campos string JSON de vuelta a objetos para la respuesta
    const entidadFormateada = entidadActualizada.toJSON();
    if (entidadFormateada.telefonos) {
      entidadFormateada.telefonos = JSON.parse(entidadFormateada.telefonos);
    }
    if (entidadFormateada.redesSociales) {
      entidadFormateada.redesSociales = JSON.parse(entidadFormateada.redesSociales);
    }

    console.log('🚀🚀🚀 : entidadFormateada', entidadFormateada)

    await transaction.commit();

    return res.status(200).json({
      success: true,
      data: entidadFormateada,
      message: 'Entidad actualizada exitosamente'
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error al actualizar la entidad:', error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Error al actualizar la entidad: ' + error.message
    });
  }
};
//----------------------------------------------------------
// DASHBOARD
//----------------------------------------------------------
export const reporteAparicionesxDepto = async (req, res) => {

  try {
    const resultado = await sequelize.query(
      `
      WITH departamentos_presentes AS (
	        SELECT 
	          jsonb_array_elements_text((ent_datos_alcance)::jsonb->'departamentos') AS id_departamento
	        FROM 
	          savia.act_entidades
      ),
      totales_depto as (      
		    SELECT 
		        dp.id_departamento,
		        COUNT(*) AS numero_de_apariciones
		    FROM 
		        departamentos_presentes dp
		    GROUP BY 
		        dp.id_departamento
  		)
 select cd."COD_DEP" as codigo_departamento, 
 		cd."NOMBRE" as nombre_departamento,
 		coalesce (td. numero_de_apariciones,0) as total 
 from catalogo.departamentos cd left join totales_depto td on  td.id_departamento=cd."COD_DEP"
      `,
      {
        type: QueryTypes.SELECT,
        model: Departamento, // Opcional: mapea los resultados al modelo
        mapToModel: true, // Convierte los resultados a instancias del modelo
        raw: false
      }
    );

    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener los departamentos',
      error: error.message
    });
  }
};

// obtener todos los representantes de una entida
export const obtenerRepresentantesDeUnaEntidad = async (req, res) => {
  const { actorId } = req.params;
  console.log("🚀🚀🚀 : actorId", actorId);

  try {
    const resultados = await Representante.findAll({
      where: {
        idEntidad: actorId
      },
      attributes: ['idRepresentante', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'idCargo', 'celular', 'tieneWhatsApp'],
      order: [['idRepresentante', 'ASC']]
    });

    // // Convertimos el campo redesSociales de string JSON a objeto
    // const representantesConvertidas = resultados.map(representante => {
    //   return {
    //     ...representante.get(), // Convierte el resultado a un objeto plano
    //     redesSociales: representante.redesSociales ? JSON.parse(representante.redesSociales) : null, // Convierte redesSociales a objeto
    //     telefonos: representante.telefonos ? JSON.parse(representante.telefonos) : null
    //   };
    // });

    res.json({
      success: true,
      data: resultados,
      message: "Representantes listados exitosamente"
    });
  } catch (error) {
    console.error('Error al listar representantes:', error);
    res.status(500).json({
      success: false,
      message: "Error al listar representantes",
      // @ts-ignore
      error: error.message
    });
  }
};

export const totalOrganizaciones = async (req, res) => {

  try {
    const resultado = await sequelize.query(
      ` select ae.ent_nombre, ae.ent_sigla, count(aa.ent_id) as total 
        from savia.act_entidades ae 
          left join  savia.act_afiliados aa on aa.ent_id =ae.ent_id 
          and aa.afi_eliminado = false 
          and ae.ent_eliminado=false
        group by ae.ent_nombre, ae.ent_sigla `,
      {
        type: QueryTypes.SELECT,
        model: Departamento, // Opcional: mapea los resultados al modelo
        mapToModel: true, // Convierte los resultados a instancias del modelo
        raw: false
      }
    );

    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error totalOrganizaciones',
      error: error.message
    });
  }
};

export const actualizarRepresentante = async (req, res) => {
  const { idRepresentante } = req.params;
  console.log('🚀🚀🚀 : idRepresentante', idRepresentante)
  const transaction = await sequelize.transaction();

  try {
    const representante = await Representante.findByPk(idRepresentante);

    if (!representante) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Representante no encontrado.'
      });
    }

    // Extraemos los campos que no queremos actualizar
    const {
      // idCargo,
      // nombres,
      // apellidoPaterno,
      // apellidoMaterno,
      // celular,
      // tieneWhatsApp,
      // idEntidad,
      // idEstado,
      // fechaCreacion,
      // eliminado,
      ...datosActualizar
    } = req.body.representante;
    console.log('🚀🚀🚀 : req.body', req.body.representante)
    console.log('🚀🚀🚀 : idRepresentante', idRepresentante)

    // Actualizamos la entidad
    await Representante.update(
      datosActualizar, {
      where: {
        idRepresentante: (idRepresentante)
      },
      transaction
    });

    // Obtenemos la entidad actualizada
    const representanteActualizada = await Representante.findByPk(idRepresentante, {
      transaction
    });

    // // Convertimos los campos string JSON de vuelta a objetos para la respuesta
    // const representanteFormateada = representanteActualizada.toJSON();
    // if (representanteFormateada.telefonos) {
    //   representanteFormateada.telefonos = JSON.parse(representanteFormateada.telefonos);
    // }
    // if (representanteFormateada.redesSociales) {
    //   representanteFormateada.redesSociales = JSON.parse(representanteFormateada.redesSociales);
    // }

    console.log('Request Body:', req.body);
    // console.log('Datos a actualizar:', datosActualizar);
    console.log('Resultado de la actualización:', representanteActualizada);

    await transaction.commit();

    return res.status(200).json({
      success: true,
      data: representanteActualizada,
      message: 'Representante actualizado exitosamente'
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Error al actualizar la representante:', error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Error al actualizar la representante: ' + error.message
    });
  }
};

export const totalAlcancextipoOrg = async (req, res) => {
  const { idTipo, par_id } = req.params;

  console.log(idTipo, par_id);

  try {

    const resultado = await sequelize.query(
      ` select pc.cod_id,pc.cod_nombre, count(ae.ent_alcance_id) as total
        from parametricos_codificadores.par_codificadores pc 
          left join  savia.act_entidades ae 
            on ae.ent_alcance_id = pc.cod_id 
              and ae.ent_eliminado = false 
              and ae.ent_tipo_organizacion_id = :idTipo
        where pc.par_id = :par_id
        group by  pc.cod_id,pc.cod_nombre
        `,
      {
        replacements: { idTipo: parseInt(idTipo) || null, par_id: parseInt(par_id) || 3 },
        type: QueryTypes.SELECT,
        raw: false
      }
    );

    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error totalAlcancextipoOrg',
      error: error.message
    });
  }
};



Entidad.hasMany(Afiliado, {
  foreignKey: 'idEntidad',
  as: 'Afiliaciones'
});

Entidad.hasMany(Afiliado, {
  foreignKey: 'idEntidadAfiliado',
  as: 'EntidadesAfiliadas'
});

Afiliado.belongsTo(Entidad, {
  foreignKey: 'idEntidad'
});

Afiliado.belongsTo(Entidad, {
  foreignKey: 'idEntidadAfiliado'
});

export const obtenerEntidadesRelacionadas = async (req, res) => {
  const entidadId = req.params.actorId;
  console.log('🚀🚀🚀 : entidadId', entidadId);
  console.log('🚀🚀🚀 : req.params', req.params.actorId);

  try {
    // Obtener entidades superiores (donde la entidad actual es afiliada)
    const entidadesSuperiores = await Entidad.findAll({
      attributes: ['idEntidad', 'codigoEntidad', 'nombreEntidad'],
      include: [
        {
          model: Afiliado,
          as: 'Afiliaciones', // Asegúrate de que este alias coincida con tu definición de asociación
          attributes: [],
          where: {
            idEntidadAfiliado: entidadId, // La entidad actual es la afiliada
            eliminado: false
          },
          required: true
        }
      ],
      where: {
        eliminado: false
      }
    });

    console.log('🚀🚀🚀 : entidadesSuperiores', entidadesSuperiores)
    // Obtener entidades afiliadas (donde la entidad actual es superior)
    // Obtener entidades afiliadas (hijas)
    const entidadesAfiliadas = await Entidad.findAll({
      attributes: ['idEntidad', 'codigoEntidad', 'nombreEntidad'],
      include: [
        {
          model: Afiliado,
          as: 'Afiliaciones',
          attributes: [],
          where: {
            idEntidad: entidadId, // La entidad actual es la superior
            eliminado: false
          },
          required: true
        }
      ],
      where: {
        eliminado: false
      }
    });
    console.log('🚀🚀🚀 : entidadesAfiliadas', entidadesAfiliadas)

    // Formatear y unir los resultados
    const entidadesRelacionadas = [
      ...entidadesSuperiores.map(entidad => ({
        ...entidad.toJSON(),
        tipo: tipoRelacion.SUPERIOR
      })),
      ...entidadesAfiliadas.map(entidad => ({
        ...entidad.toJSON(),
        tipo: tipoRelacion.AFILIADO
      }))
    ];

    console.log('🚀🚀🚀 : entidadesRelacionadas', entidadesRelacionadas);

    res.json({
      success: true,
      data: entidadesRelacionadas,
      message: "Afiliaciones listadas exitosamente"
    });

  } catch (error) {
    console.error('Error al obtener afiliaciones:', error);
    res.status(500).json({
      success: false,
      message: "Error al obtener afiliaciones",
      error: error.message
    });
  }
};

export const totalAlcancextipoOrgPriv = async (req, res) => {
  const { idTipo, par_id } = req.params;
  console.log(idTipo, par_id);
  try {

    const resultado = await sequelize.query(
      ` 
        select pc.cod_id,pc.cod_nombre, count(ae.ent_alcance_id) as total
 		from parametricos_codificadores.par_codificadores pc  
 		left join  savia.act_entidades ae 
 			on ae.ent_privados_id = pc.cod_id 
 			and ae.ent_eliminado = false 
 			and ae.ent_tipo_organizacion_id = :idTipo
 where pc.par_id = :par_id 
 group by  pc.cod_id,pc.cod_nombre
      `,
      {
        replacements: { idTipo: parseInt(idTipo) || 18, par_id: parseInt(par_id) || 5 },
        type: QueryTypes.SELECT,
        raw: false
      }
    );

    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error totalAlcancextipoOrg',
      error: error.message
    });
  }
};
//---------------------------------------
export const totalReuniones = async (req, res) => {
  const { reu_tipo } = req.params;
  //console.log(reu_tipo); // reunion, convenio
  try {
    const resultado = await sequelize.query(
      ` 
 with reuniones as (
  SELECT 
    jsonb_array_elements_text((ent_datos_alcance::jsonb)->'departamentos') AS id_departamento, 
    ar.reu_tipo, count(*) as total
  FROM 
    savia.act_entidades ae join savia.act_reuniones ar 
    on ar.ent_id= ae.ent_id 
    	and ar.cod_estado_id=79
    	and ar.reu_tipo= :reu_tipo 	
    group by 1,2
    order by 1
    )
 select cd."COD_DEP" , cd."NOMBRE", COALESCE (r.total,0) as total
 from catalogo.departamentos cd left join reuniones r on r.id_departamento=cd."COD_DEP"
      `,
      {
        replacements: { reu_tipo: reu_tipo || 'convenio' },
        type: QueryTypes.SELECT,
        raw: false
      }
    );
    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error totalAlcancextipoOrg',
      error: error.message
    });
  }
};

export const coberturaUTCA = async (req, res) => {

  try {
    const resultado = await sequelize.query(
      ` 
  WITH alcance_municipios AS (
    SELECT
        jsonb_array_elements_text((ent_datos_alcance)::jsonb->'municipios') AS id_municipio,
        substring(jsonb_array_elements_text((ent_datos_alcance)::jsonb->'municipios'),1,2) as cod_dep
    FROM
        savia.act_entidades se JOIN savia.act_reuniones ar ON se.ent_id = ar.ent_id
    WHERE se.ent_alcance_id = 16 -- alcance municipal
) , grupo_depto AS (
    SELECT am.cod_dep, COUNT(*) AS total
    FROM alcance_municipios AS am
    GROUP BY am.cod_dep
),
ultima_fecha_reunion AS (
    SELECT 
        substring(jsonb_array_elements_text((ent_datos_alcance)::jsonb->'municipios'),1,2) AS cod_dep,
        MAX(ar.reu_fecha_modificacion) AS max_fecha_reunion
    FROM 
        savia.act_entidades se 
        LEFT JOIN savia.act_reuniones ar ON se.ent_id = ar.ent_id
    WHERE 
        se.ent_alcance_id = 16
    GROUP BY 
        substring(jsonb_array_elements_text((ent_datos_alcance)::jsonb->'municipios'),1,2)
)
SELECT 
    substring(m.c_ut,1,2) AS id_departamento,
    m.departamen, 
    COUNT(*) AS nunicipios,
    COALESCE(gd.total, 0) AS total_reuniones,
    COALESCE(ufr.max_fecha_reunion, NULL) AS ultima_fecha_reunion,
    ROUND(
        COALESCE(gd.total, 0) * 100.0 / NULLIF(COUNT(*), 0), 
        2
    ) AS porcentaje_reuniones
FROM 
    catalogo.municipios_ds5050 m
    LEFT JOIN grupo_depto gd ON substring(m.c_ut,1,2) = gd.cod_dep
    LEFT JOIN ultima_fecha_reunion ufr ON substring(m.c_ut,1,2) = ufr.cod_dep
WHERE 
    m.departamen IS NOT NULL
GROUP BY 
    1, 2, total_reuniones, ultima_fecha_reunion
ORDER BY 
    1;
 
      `,
      {
        type: QueryTypes.SELECT,
        raw: false
      }
    );
    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error coberturaUTCA',
      error: error.message
    });
  }
};

export const relacionarEntidad = async (req, res) => {
  const { actorId } = req.params;
  const { idEntidadSeleccionada, tipoRelacion } = req.body;
  console.log('🚀🚀🚀 : actorId', actorId);
  console.log('🚀🚀🚀 : req.body', req.body);

  const transaction = await sequelize.transaction();

  try {
    let afiliado;

    // 1. Corregir la comparación del tipoRelacion
    if (tipoRelacion === 'AFILIADO') { // O el valor específico que estés usando
      afiliado = await Afiliado.create({
        idEntidad: actorId,
        idEntidadAfiliado: idEntidadSeleccionada,
        idEstado: 65,
        eliminado: false,
        // fechaCreacion: new Date(), // Añadir fecha de creación
        // idUsuario: req.usuario?.id // Si tienes el ID del usuario en el request
      }, {
        transaction,
        context: req
      });
      console.log('🚀🚀🚀 : afiliadoSuperior', afiliado);
    } else {
      afiliado = await Afiliado.create({
        idEntidad: idEntidadSeleccionada,
        idEntidadAfiliado: actorId,
        idEstado: 65,
        eliminado: false,
        // fechaCreacion: new Date(), // Añadir fecha de creación
        // idUsuario: req.usuario?.id // Si tienes el ID del usuario en el request
      }, {
        transaction,
        context: req
      });
      console.log('🚀🚀🚀 : afiliadoInferior', afiliado);
    }

    const entidad = await Entidad.findOne({
      attributes: ['idEntidad', 'codigoEntidad', 'nombreEntidad'],
      where: {
        idEntidad: idEntidadSeleccionada,
        eliminado: false
      },
      transaction,
      context: req
    });

    // Confirmar la transacción
    await transaction.commit();

    console.log('🚀🚀🚀 : entidad relacionada', entidad);
    return res.json({
      success: true,
      data: entidad,
      message: 'Entidad relacionada exitosamente'
    });

  } catch (error) {
    // Revertir la transacción en caso de error
    await transaction.rollback();

    console.error('Error al relacionar entidad:', error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Error al relacionar entidad: ' + error.message
    });
  }
};


export const desvincularEntidad = async (req, res) => {
  const { actorId } = req.params;
  const { idEntidadSeleccionada, tipoRelacion } = req.body;
  console.log('🚀🚀🚀 : tipoRelacion', tipoRelacion)
  console.log('🚀🚀🚀 : idEntidadSeleccionada', idEntidadSeleccionada)
  console.log('🚀🚀🚀 : req.body', req.body)
  console.log('🚀🚀🚀 : actorId', actorId);


  const transaction = await sequelize.transaction();

  try {
    let whereCondition;

    // 1. Corregir la comparación del tipoRelacion y definir la condición WHERE
    if (tipoRelacion === 'AFILIADO') {
      whereCondition = {
        idEntidad: actorId,
        idEntidadAfiliado: idEntidadSeleccionada,
        eliminado: false // Solo actualizar si no está eliminado
      };
    } else {
      whereCondition = {
        idEntidad: idEntidadSeleccionada,
        idEntidadAfiliado: actorId,
        eliminado: false // Solo actualizar si no está eliminado
      };
    }

    // 2. Actualizar el registro de afiliación
    const resultado = await Afiliado.update(
      {
        eliminado: true,
        // fechaModificacion: new Date(),
        // usuarioId: req.usuario?.id  // Si tienes el ID del usuario en el request
      },
      {
        where: whereCondition,
        transaction,
        context: req
      }
    );

    // 3. Verificar si se actualizó algún registro
    if (resultado[0] === 0) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'No se encontró la relación entre las entidades'
      });
    }

    // 4. Obtener la entidad desvinculada
    const entidad = await Entidad.findOne({
      attributes: ['idEntidad', 'codigoEntidad', 'nombreEntidad'],
      where: {
        idEntidad: idEntidadSeleccionada,
        eliminado: false
      },
      transaction,
      context: req
    });

    if (!entidad) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        message: 'No se encontró la entidad seleccionada'
      });
    }

    // 6. Confirmar la transacción
    await transaction.commit();

    return res.json({
      success: true,
      data: entidad,
      message: 'Entidad desvinculada exitosamente'
    });

  } catch (error) {
    // 7. Manejar errores y hacer rollback
    await transaction.rollback();
    console.error('Error al desvincular entidad:', error);

    return res.status(500).json({
      success: false,
      data: null,
      message: 'Error al desvincular entidad: ' + error.message
    });
  }
};


export const listaInstituciones = async (req, res) => {
  const usuario = await obtenerUsuario(req.headers["token"]);

  try {
    const resultado = await sequelize.query(
      ` SELECT ae.ent_id, ae.ent_nombre, ae.ent_sigla,
            STRING_AGG ((select a.ent_sigla from savia.act_entidades a where a.ent_id=aa.ent_id_afiliado),',') as siglas_Afiliados
        FROM savia.act_entidades ae 
                  left join  savia.act_afiliados aa on aa.ent_id =ae.ent_id 
                  and aa.afi_eliminado = false 
                  and ae.ent_eliminado=false
        GROUP BY ae.ent_id, ae.ent_nombre, ae.ent_sigla  
      `,
      {
        type: QueryTypes.SELECT,
        raw: false
      }
    );
    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error coberturaUTCA',
      error: error.message
    });
  }


};

export const listaInstitucionesId = async (req, res) => {
  const { id_institucion } = req.params;
  console.log(id_institucion); // reunion, convenio
  try {
    const resultado = await sequelize.query(
      ` 
        select ae.ent_id, ae.ent_nombre, ae.ent_sigla,--aa.ent_id_afiliado,
            (select a.ent_nombre from savia.act_entidades a where a.ent_id=aa.ent_id_afiliado) as afiliado,
            (select a.ent_sigla from savia.act_entidades a where a.ent_id=aa.ent_id_afiliado) as sigla_afiliado
                from savia.act_entidades ae 
                  left join  savia.act_afiliados aa on aa.ent_id =ae.ent_id 
                  and aa.afi_eliminado = false 
                  and ae.ent_eliminado=false
        where ae.ent_id= :id_institucion
      `,
      {
        replacements: { id_institucion: id_institucion || '' },
        type: QueryTypes.SELECT,
        raw: false
      }
    );
    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error listaInsitucionesId',
      error: error.message
    });
  }
};

export const listaReunionesAgenda = async (req, res) => {
  try {
    const resultado = await sequelize.query(
      ` 
      select 	
          ar.reu_id,
          ae.ent_id,
          ae.ent_nombre, 
          ar.reu_fecha_hora_inicio,
          ar.reu_ubicacion, 
          (select (rep_nombre||' '||rep_apellido_paterno||' '||rep_apellido_materno) 
            from savia.act_representantes r where r.rep_id=ar.reu_locutor_id and r.rep_eliminado=false) as nombre,
          ar.reu_fecha_suspencion fecha_siguiente_reunion,
          (select (ar2.reu_asunto||' - '||date(reu_fecha_hora_inicio) )
            from savia.act_reuniones ar2  where ar2.reu_id = ar.reu_padre_id and  ar2.reu_eliminado = false) as asunto_fecha_pasada,
          (select pc.cod_nombre from parametricos_codificadores.par_codificadores as pc where pc.cod_id= ar.cod_estado_id ) as estado,
            ar.cod_estado_id
      from savia.act_reuniones ar 
        join savia.act_entidades ae on ar.ent_id = ae.ent_id 
      where ar.reu_eliminado = false    
      `,
      {
        type: QueryTypes.SELECT,
        raw: false
      }
    );
    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error listaInsitucionesId',
      error: error.message
    });
  }
};

export const listaReunionesAgendaId = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await sequelize.query(
      ` 
      select 	
          ar.reu_id,
          ae.ent_id,
          ae.ent_nombre, 
          ar.reu_fecha_hora_inicio,
          ar.reu_ubicacion, 
          (select (rep_nombre||' '||rep_apellido_paterno||' '||rep_apellido_materno) 
            from savia.act_representantes r where r.rep_id=ar.reu_locutor_id and r.rep_eliminado=false) as nombre,
          ar.reu_fecha_suspencion fecha_siguiente_reunion,
          (select (ar2.reu_asunto||' - '||date(reu_fecha_hora_inicio) )
            from savia.act_reuniones ar2  where ar2.reu_id = ar.reu_padre_id and  ar2.reu_eliminado = false) as asunto_fecha_pasada,
          (select pc.cod_nombre from parametricos_codificadores.par_codificadores as pc where pc.cod_id= ar.cod_estado_id ) as estado,
            ar.cod_estado_id,
            aa.arc_id 
      from savia.act_reuniones ar 
        join savia.act_entidades ae on ar.ent_id = ae.ent_id 
        left join savia.act_archivos aa on aa.reu_id = ar.reu_id 
      where ar.reu_eliminado = false and ar.reu_id=:id   
      `,
      {
        replacements: { id: id || 0 },
        type: QueryTypes.SELECT,
        raw: false
      }
    );
    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error listaInsitucionesId',
      error: error.message
    });
  }
};
//-----------------------------------
export const listaCorrespondenciaIdTipo = async (req, res) => {
  const { idTipo } = req.params;
  try {
    const resultado = await sequelize.query(
      ` 
      select ac.cor_id,
      		 ac.cor_asunto, 
      		 ac.cor_fecha_hora_correspondencia,
      		 ae.ent_nombre,
      		 ae.ent_sigla,
      		 ac.cod_tipo_id,
      		 (select ar.arc_id from savia.act_archivos as ar where ar.cor_id = ac.cor_id and ar.arc_eliminado=false ) as arc_id
      from savia.act_correspondencia ac
      		join savia.act_entidades ae on ac.ent_id=ae.ent_id  and ac.cor_eliminado =false and ae.ent_eliminado =false
      where ac.cod_tipo_id=:idTipo   
      `,
      {
        replacements: { idTipo: idTipo || 72 },
        type: QueryTypes.SELECT,
        raw: false
      }
    );
    res.json(resultado);
  } catch (error) {
    res.status(500).json({
      message: 'Error listaCorrespondenciaIdTipo',
      error: error.message
    });
  }
};


