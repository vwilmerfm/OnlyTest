import { DataTypes } from 'sequelize';

const ProvinciaModel = (sequelize) => {
  return sequelize.define('Provincia', {
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'codigo'
    },
    codigoDepartamento: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'codigo_departamento'
    },
    codigoProvincia: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'codigo_provincia'
    },
    provincia: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'provincia'
    },
    latitud: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'latitud'
    },
    longitud: {
      type: DataTypes.FLOAT,
      allowNull: true,
      field: 'longitud'
    }
  }, {
    tableName: 'cat_provincia',  // Nombre exacto de la tabla en la base de datos
    schema: 'catalogo',  // Cambia el esquema si es necesario
    timestamps: false  // Asumimos que no hay columnas createdAt/updatedAt
  });
};

export default ProvinciaModel;
