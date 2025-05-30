// import { DataTypes } from 'sequelize';

// const SeguimientoReunionModel = (sequelize) => {
//   return sequelize.define('SeguimientoReunion', {
//     idSeguimientoReunion: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//       field: 'asr_id'
//     },
//     asunto: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asr_asunto'
//     },
//     fechaHoraInicio: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       field: 'asr_fecha_hora_inicio'
//     },
//     fechaHoraFin: {
//       type: DataTypes.DATE,
//       allowNull: true,
//       field: 'asr_fecha_hora_fin'
//     },
//     ubicacion: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asr_ubicacion'
//     },
//     descripcion: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//       field: 'asr_descripcion'
//     },
//     organizador: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asr_organizador'
//     },
//     // participantes: {
//     //   type: DataTypes.TEXT,
//     //   allowNull: true,
//     //   get() {
//     //     const rawValue = this.getDataValue('asr_participantes');
//     //     return rawValue ? JSON.parse(rawValue) : [];
//     //   },
//     //   set(value) {
//     //     this.setDataValue('asr_participantes', JSON.stringify(value));
//     //   },
//     //   field: 'asr_participantes'
//     // },
//     estado: {
//       // type: DataTypes.ENUM('programada', 'en_curso', 'finalizada', 'cancelada'),
//       // allowNull: false,
//       // defaultValue: 'programada',

//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asr_estado'
//     },
//     // asr_documentos: {
//     //   type: DataTypes.TEXT,
//     //   allowNull: true,
//     //   get() {
//     //     const rawValue = this.getDataValue('asr_documentos');
//     //     return rawValue ? JSON.parse(rawValue) : [];
//     //   },
//     //   set(value) {
//     //     this.setDataValue('asr_documentos', JSON.stringify(value));
//     //   },
//     //   field: 'asr_documentos'
//     // },
//     // asr_tipo: {
//     //   type: DataTypes.STRING,
//     //   allowNull: false,
//     //   field: 'asr_tipo'
//     // },
//     fechaFirma: {
//       type: DataTypes.DATE,
//       allowNull: true,
//       field: 'asr_fecha_firma'
//     },
//     eliminado: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//       field: 'asr_eliminado'
//     },
//     idEntidad: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       field: 'ent_id'
//     },
//     locutor: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'asr_locutor'
//     },
//     resumen: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//       field: 'asr_resumen'
//     },
//     // eliminar
//     doc_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       field: 'doc_id'
//     },
//     acuerdos: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//       field: 'asr_acuerdos'
//     },
//     // fechaCreacion: {
//     //   type: DataTypes.DATE,
//     //   allowNull: true,
//     //   field: 'asr_fecha_creacion'
//     // },
//     // fechaModificacion: {
//     //   type: DataTypes.DATE,
//     //   allowNull: true,
//     //   field: 'asr_fecha_modificacion'
//     // },
//   }, {
//     tableName: 'act_seg_reuniones',
//     schema: 'actores',
//     timestamps: false,
//     // createdAt: 'asr_fecha_creacion',
//     // updatedAt: 'asr_fecha_modificacion',
//   });

// };
// export default SeguimientoReunionModel;