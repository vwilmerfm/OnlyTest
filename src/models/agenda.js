import { DataTypes } from 'sequelize';

const AgendaModel = (sequelize) => {
  return sequelize.define('Agenda', {
    idAgenda: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'age_id'
    },
    fechaHora: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'age_fecha_hora'
    },
    asunto: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'age_asunto'
    },
    idRepresentante: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'act_representantes',  // Modelo de la tabla de representantes
        key: 'rep_id'
      },
      field: 'rep_id'
    },
    idReunion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'act_reuniones',  // Modelo de la tabla de reuniones
        key: 'reu_id'
      },
      field: 'reu_id'
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'par_codificadores',  // Modelo de la tabla de codificadores
        key: 'cod_id'
      },
      field: 'cod_estado_id'
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'age_eliminado'
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'age_fecha_creacion'
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'age_fecha_modificacion'
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'usu_id',
      references: {
        model: 'autenticacion.aut_usuarios',
        key: 'usu_id'
      }
    }
  }, {
    tableName: 'act_agendas',
    schema: 'savia',
    timestamps: false  // Desactivar timestamps automáticos
  });
};

export default AgendaModel;
