import { DataTypes } from 'sequelize';

const ReunionModel = (sequelize) => {
  return sequelize.define('Reunion', {
    idReunion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'asr_id'
    },
    asunto: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'asr_asunto'
    },
    fechaInicio: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'asr_fecha_hora_inicio'
    },
    fechaFin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'asr_fecha_hora_fin'
    },
    ubicacion: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'asr_ubicacion'
    },
    descripcion: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'asr_descripcion'
    },
    organizador: {
      type: DataTypes.STRING(30),
      allowNull: true,
      field: 'asr_organizador'
    },
    participantes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'asr_participantes'
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'asr_estado'
    },
    documentos: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'asr_documentos'
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'asr_tipo',
      defaultValue: 'reunion'
    },
    fechaFirma: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'asr_fecha_firma'
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'asr_eliminado'
    },
    idEntidad: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Entidad',
        key: 'idEntidad',
      },
      field: 'ent_id'
    },
    // idEntidad: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true,
    //   field: 'ent_id'
    // },
    locutor: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'asr_locutor'
    },
    resumen: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'asr_resumen'
    },
    doc_id: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'doc_id'
    },
    acuerdos: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'asr_acuerdos'
    },
    resultado: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'asr_resultado_id'
    },
    fechaHoraProximoEvento: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'asr_fecha_hora_proximo_evento'
    }
  }, {
    sequelize,
    modelName: 'ReunionesModel',
    tableName: 'act_seg_reuniones',
    schema: 'savia',
    timestamps: false
  });
};

export default ReunionModel;