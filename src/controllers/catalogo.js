// import { Op } from 'sequelize';
import { sequelize } from '../database.js';
import { Op } from 'sequelize';

import DepartamentoModel from '../models/catalogo/departamento.js';
import ProvinciaModel from '../models/catalogo/provincia.js';
import MunicipioModel from '../models/catalogo/municipio.js';

const Departamento = DepartamentoModel(sequelize);
const Provincia = ProvinciaModel(sequelize);
const Municipio = MunicipioModel(sequelize);

export const obtenerTodosLosDepartamentos = async (req, res) => {
  try {
    // Consulta para obtener todos los departamentos con las columnas especificadas
    const departamentos = await Departamento.findAll({
      attributes: ['codigoDepartamento', 'nombreDepartamento'],  // Solo obtener las columnas requeridas
      order: [['nombreDepartamento', 'ASC']],  // Ordenar por nombre de forma ascendente
    });

    // Enviar respuesta con los datos obtenidos
    res.status(200).json({
      success: true,
      data: departamentos,
      message: 'Departamentos obtenidos exitosamente'
    });
  } catch (error) {
    console.error('Error al obtener departamentos:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener departamentos',
      error: error.message
    });
  }
};

export const obtenerProvinciasPorDepartamento = async (req, res) => {
  const { codigoDepartamento } = req.params;  // Capturar el código del departamento desde los parámetros de la URL

  try {
    // Consulta para obtener todas las provincias de un departamento específico
    const provincias = await Provincia.findAll({
      where: {
        codigoDepartamento: codigoDepartamento  // Filtrar por codigo_departamento
      },
      attributes: ['codigoProvincia', 'provincia', 'latitud', 'longitud', 'codigoDepartamento'],  // Seleccionar solo las columnas requeridas
      order: [['provincia', 'ASC']]
    });

    // Verificar si se encontraron provincias
    if (provincias.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron provincias para el departamento dado'
      });
    }

    // Enviar respuesta con las provincias encontradas
    res.status(200).json({
      success: true,
      data: provincias,
      message: 'Provincias obtenidas exitosamente'
    });
  } catch (error) {
    console.error('Error al obtener provincias:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener provincias',
      error: error.message
    });
  }
};


export const obtenerMunicipiosPorProvincia = async (req, res) => {
  const { codigoProvincia, codigoDepartamento } = req.params;  // Capturar el código de la provincia desde los parámetros de la URL
  console.log('🚀🚀🚀 : codigoProvincia', codigoProvincia)
  console.log('🚀🚀🚀 : codigoDepartamento', codigoDepartamento)

  try {
    // Consulta para obtener todos los municipios de una provincia específica
    const municipios = await Municipio.findAll({
      where: {
        // codigoProvincia: codigoProvincia,  // Filtrar por codigo_provincia
        // codigoDepartamento: codigoDepartamento  // Filtrar por codigo_departamento
        [Op.and]: [
          sequelize.where(
            sequelize.fn('SUBSTRING', sequelize.col('c_ut'), 3, 2),
            codigoProvincia
          )
        ],
        [Op.and]: [
          sequelize.where(
            sequelize.fn('SUBSTRING', sequelize.col('c_ut'), 1, 2),
            codigoDepartamento
          )
        ]
      },
      // estadoId ==
      attributes: [
        'codigoMunicipio',
        'municipio',
        [
          sequelize.fn('SUBSTRING', sequelize.col('c_ut'), 3, 2),
          'codigoProvincia',
        ]
      ],  // Seleccionar solo las columnas requeridas
      order: [['municipio', 'ASC']]
    });

    // Verificar si se encontraron municipios
    if (municipios.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No se encontraron municipios para la provincia dada'
      });
    }

    // Enviar respuesta con los municipios encontrados
    res.status(200).json({
      success: true,
      data: municipios,
      message: 'Municipios obtenidos exitosamente'
    });
  } catch (error) {
    console.error('Error al obtener municipios:', error);
    res.status(500).json({
      success: false,
      message: 'Error al obtener municipios',
      error: error.message
    });
  }
};
