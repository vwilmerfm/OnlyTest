import { DataTypes } from 'sequelize';

const DepartamentoModel = (sequelize) => {
  return sequelize.define('Departamento', {
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
    objectId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'objectid'
    },
    codigoDepartamento: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'COD_DEP'
    },
    nombreDepartamento: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DEPARTAMEN'
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'DESCRIPCIO'
    },
    identificador: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'identificador'
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'NOMBRE'
    },
    idPolitico: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'id_politic'
    }
  }, {
    tableName: 'departamentos',
    schema: 'catalogo',
    timestamps: false
  });
};

export default DepartamentoModel;

// import { DataTypes } from 'sequelize';

// const DepartamentoModel = (sequelize) => {
//   return sequelize.define('Departamento', {
//     codigoDepartamento: {
//       type: DataTypes.STRING,
//       primaryKey: true,
//       field: 'codigo_departamento'
//     },
//     nombreDepartamento: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'nombre_departamento'
//     },
//     estaActivo: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       field: 'esta_activo',
//       defaultValue: true // Por defecto está activo
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
//     },
//     geom: {
//       type: DataTypes.GEOMETRY('POINT'), // Usamos el tipo GEOMETRY para almacenar datos geoespaciales
//       allowNull: true,
//       field: 'geom'
//     }
//   }, {
//     tableName: 'cat_departamento',  // Nombre exacto de la tabla en la base de datos
//     timestamps: false,  // Asumimos que no hay createdAt/updatedAt
//     schema: 'catalogo'  // Cambia el esquema si es necesario
//   });
// };

// export default DepartamentoModel;
