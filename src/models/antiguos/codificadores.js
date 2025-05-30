import { DataTypes } from 'sequelize';

const CodificadoresModel = (sequelize) => {
  const Codificadores = sequelize.define('Codificadores', {
    idCodificador: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'cod_id'
    },
    idParametrica: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'par_id',
      references: {
        model: 'ParametricasModel',
        key: 'idParametricas'
      }
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'cod_nombre'
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'cod_valor'
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'cod_estado'
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'cod_eliminado'
    }
  }, {
    tableName: 'par_codificadores',
    timestamps: false,
    schema: 'parametricos_codificadores'
  });

  return Codificadores;
};

export default CodificadoresModel;