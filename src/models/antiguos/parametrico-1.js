import { DataTypes } from 'sequelize';

const ParametricoModel = (sequelize) => {
  return sequelize.define('Parametrico', {
    idParametrico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'par_id'
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'par_nombre'
    },
    estado: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'par_estado'
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'par_eliminado'
    }
  }, {
    tableName: 'par_parametricos',
    timestamps: false,
    schema: 'parametricos_codificadores'
  });
};

// // Asociaciones en el modelo Parametrico
// ParametricoModel.associate = (models) => {
//   ParametricoModel.hasMany(models.Codificador, {
//     foreignKey: 'par_id',  // Clave foránea en Codificador
//     as: 'codificadores'    // Alias correcto para la asociación
//   });
// };

export default ParametricoModel;
