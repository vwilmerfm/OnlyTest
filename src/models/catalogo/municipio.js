import { DataTypes } from 'sequelize';

const MunicipioModel = (sequelize) => {
  return sequelize.define('MunicipioDs5050', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      field: 'id'
    },
    geom: {
      type: DataTypes.GEOMETRY,
      allowNull: true,
      field: 'geom'
    },
    codigoMunicipio: {
      type: DataTypes.STRING(16),
      allowNull: true,
      field: 'c_ut'
    },
    departamento: {
      type: DataTypes.STRING(16),
      allowNull: true,
      field: 'departamen'
    },
    provincia: {
      type: DataTypes.STRING(25),
      allowNull: true,
      field: 'provincia'
    },
    municipio: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'municipio'
    },
    numeroLey: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'n°_ley'
    },
    fechaLey: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'fecha_ley'
    },
    zona: {
      type: DataTypes.STRING(7),
      allowNull: true,
      field: 'zona'
    },
    idUt: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'id_ut'
    },
    blComliM: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'bl_comli_m'
    },
    capital: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'capital'
    },
    codigoSiot: {
      type: DataTypes.STRING(2),
      allowNull: true,
      field: 'c_siot'
    },
    tiocAioc: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'tioc_aioc'
    }
  }, {
    tableName: 'municipios_ds5050',
    schema: 'catalogo', // Ajusta según tu esquema
    timestamps: false
  });
};

export default MunicipioModel;

// import { DataTypes } from 'sequelize';

// const MunicipioModel = (sequelize) => {
//   return sequelize.define('Municipio', {
//     codigo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       primaryKey: true,
//       field: 'codigo'
//     },
//     codigoDepartamento: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'codigo_departamento'
//     },
//     codigoProvincia: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'codigo_provincia'
//     },
//     codigoMunicipio: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'codigo_municipio'
//     },
//     codigoMunicipal: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       field: 'codigo_municipal'
//     },
//     municipio: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'municipio'
//     },
//     latitud: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//       field: 'latitud'
//     },
//     longitud: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//       field: 'longitud'
//     }
//   }, {
//     tableName: 'cat_municipio',  // Nombre exacto de la tabla en la base de datos
//     schema: 'catalogo',  // Cambia el esquema si es necesario
//     timestamps: false  // Asumimos que no hay columnas createdAt/updatedAt
//   });
// };

// export default MunicipioModel;
