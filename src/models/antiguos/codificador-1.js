import { DataTypes } from 'sequelize';

const CodificadorModel = (sequelize) => {
  return sequelize.define('Codificador', {

    idCodificador: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'cod_id'
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'cod_nombre'
    },
    valor: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'cod_valor'
    },
    // idParametrico: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   field: 'par_id',
    //   references: {
    //     model: 'Parametricos', // El modelo referenciado
    //     key: 'par_id',         // La clave de la tabla referenciada
    //   }
    // },
    idParametrico: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'par_id',
      references: {
        model: 'ParametricoModel',
        key: 'idParametrico'
      }
    },
    // estado: {
    //   type: DataTypes.STRING(20),
    //   allowNull: true,
    //   field: 'cod_estado'
    // },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'cod_eliminado'
    }
  }, {
    tableName: 'par_codificadores',
    timestamps: false,
    schema: 'parametricos_codificadores'
  });
};

// // Asociaciones en el modelo Codificador
// CodificadorModel.associate = (models) => {
//   CodificadorModel.belongsTo(models.Parametrico, {
//     foreignKey: 'par_id',  // Clave foránea en Codificador
//     as: 'parametrico'      // Alias correcto para la asociación
//   });
// };

export default CodificadorModel;
