import { DataTypes } from 'sequelize';

const ParametricosModel = (sequelize) => {
  return sequelize.define('Parametricos', {
    idParametricas: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'par_id'
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'par_nombre'
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'activo',
      field: 'par_estado'
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'par_eliminado'
    }
  }, {
    tableName: 'par_parametricos',
    timestamps: false,
    schema: 'parametricos_codificadores'
  });

};

export default ParametricosModel;