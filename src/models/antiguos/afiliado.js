import { DataTypes } from 'sequelize';

const AfiliadoModel = (sequelize) => {
  return sequelize.define('Afiliado', {
    idAfiliado: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'af_id',

    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'af_estado'
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'af_eliminado'
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'af_fecha_modificacion'
    },
    idCreacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'af_id_creacion'
    },
    idModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'af_id_modificacion'
    },
    idEntidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Entidad', // Modelo al que hace referencia la clave foránea
        key: 'ent_id'
      },
      field: 'ent_id'
    },
    idEntidadAfiliado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Entidad', // Modelo al que hace referencia la clave foránea
        key: 'ent_id'
      },
      field: 'ent_id_afiliado'
    }
  }, {
    sequelize,
    modelName: 'AfiliadoModel',
    tableName: 'act_afiliados',
    schema: 'savia',
    timestamps: false
  });
};

export default AfiliadoModel;



// import { DataTypes } from 'sequelize';

// const AfiliadoModel = (sequelize) => {
//   return sequelize.define('Afiliado', {
//     afi_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true
//     },
//     ent_codigo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true
//     },
//     afi_estado: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     afi_eliminado: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false
//     },
//     ent_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       references: {
//         model: 'Entidad',
//         key: 'ent_id'
//       }
//     }
//   }, {
//     tableName: 'act_afiliados',
//     schema: 'actores',
//     timestamps: false,
//   });

// };

// export default AfiliadoModel;
