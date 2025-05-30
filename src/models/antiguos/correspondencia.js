import { DataTypes } from 'sequelize';

const CorrespondenciaModel = (sequelize) => {
  return sequelize.define('Correspondencia', {
    idCorrespondencia: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      field: 'asc_id'
    },
    tipo: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'asc_tipo'
    },
    asunto: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'asc_asunto'
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'asc_descripcion'
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'asc_estado'
    },
    idEntidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Entidad', // Nombre del modelo relacionado, asegúrate que este nombre es correcto
        key: 'ent_id'
      },
      field: 'ent_id'
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'asc_fecha_creacion'
    }
  }, {
    sequelize,
    modelName: 'CorrespondenciaModel',
    tableName: 'act_seg_correspondencia',
    schema: 'savia',
    timestamps: false
  });
};

export default CorrespondenciaModel;


// import { DataTypes } from 'sequelize';

// const CorrespondenciaModel = (sequelize) => {
//   const Correspondencia = sequelize.define('Correspondencia', {
//     idCorrespondencia: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//       field: 'asc_id'
//     },
//     nroCorrespondencia: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asc_nro_correspondencia'
//     },
//     fechaEnvio: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//       field: 'asc_fecha_envio'
//     },
//     fechaRecepcion: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//       field: 'asc_fecha_recepcion'
//     },
//     asunto: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asc_asunto'
//     },
//     remitente: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asc_remitente'
//     },
//     destinatario: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asc_destinatario'
//     },
//     estado: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asc_estado'
//     },
//     descripcion: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asc_decripcion'
//     },
//     eliminado: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//       field: 'asc_eliminado'
//     },
//     idEntidad: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       field: 'ent_id'
//     }
//   }, {
//     tableName: 'act_seg_correspondencia', // Asegúrate de que este sea el nombre correcto de tu tabla
//     esquema: 'actores',
//     timestamps: false // Asumiendo que no tienes campos createdAt y updatedAt
//   });

//   return Correspondencia;
// };

// export default CorrespondenciaModel;