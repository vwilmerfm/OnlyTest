import { DataTypes } from 'sequelize';

const ArchivoModel = (sequelize) => {
  return sequelize.define('Archivo', {
    idArchivo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'arc_id'
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'arc_nombre'
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'arc_tipo'
    },
    tamanio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'arc_tamanio'
    },
    enlace: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '/uploads',
      field: 'arc_enlace'
    },
    idReunion: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Reunion',
        key: 'idReunion',
      },
      field: 'asr_id',
      allowNull: true,
    },
    idCorrespondencia: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Correspondencia',
        key: 'idCorrespondencia',
      },
      field: 'asc_id',
      allowNull: true,
    },
  }, {
    sequelize,
    modelName: 'ArchivoModel',
    tableName: 'act_archivos',
    schema: 'savia',
    timestamps: false
  });
};

export default ArchivoModel;




// import { DataTypes } from 'sequelize';

// const ArchivoModel = (sequelize) => {
//   return sequelize.define('Archivo', {
//     idArchivo: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//       field: 'arc_id'
//     },
//     nombre: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'arc_nombre'
//     },
//     tipo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'arc_tipo'
//     },
//     tamanio: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       field: 'arc_tamanio'
//     },
//     fecha: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: DataTypes.NOW,
//       field: 'arc_fecha'
//     },
//     estado: {
//       // type: DataTypes.ENUM('activo', 'inactivo', 'pendiente'),
//       type: DataTypes.STRING,
//       allowNull: true,
//       defaultValue: 'activo',
//       field: 'arc_estado'
//     },
//     eliminado: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//       field: 'arc_eliminado'
//     },
//     fechaModificacion: {
//       type: DataTypes.DATE,
//       allowNull: true,
//       defaultValue: DataTypes.NOW,
//       field: 'arc_fecha_modificacion'
//     },
//     usuarioCreacion: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       field: 'usu_id_creacion'
//     },
//     usuarioModificacion: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       field: 'usu_id_modificacion'
//     },
//     idReunion: {
//       type: DataTypes.INTEGER,
//       references: {
//         model: 'Reunion',
//         key: 'idReunion',
//       },
//       field: 'seg_id'
//     },
//     // idSeguimiento: {
//     //   type: DataTypes.INTEGER,
//     //   allowNull: true,
//     //   field: 'seg_id'
//     // },
//     enlace: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//       field: 'arc_enlace'
//     }
//   }, {
//     tableName: 'act_archivos',
//     schema: 'actores',
//     timestamps: false,
//     hooks: {
//       beforeUpdate: (documento) => {
//         documento.fecha_modificacion = new Date();
//       },
//     },
//   });

// };
// export default ArchivoModel;