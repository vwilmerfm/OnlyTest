import { DataTypes } from 'sequelize';

const CorrespondenciaModel = (sequelize) => {
  return sequelize.define('Correspondencia', {
    idCorrespondencia: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'cor_id'
    },
    asunto: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'cor_asunto'
    },
    fechaHoraCorrespondencia: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'cor_fecha_hora_correspondencia'
    },
    idTipoCorrespondencia: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'par_codificadores',  // Modelo de la tabla de codificadores
        key: 'cod_id'
      },
      field: 'cod_tipo_id'
    },
    idEntidad: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'act_entidades',  // Modelo de la tabla de entidades
        key: 'ent_id'
      },
      field: 'ent_id'
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'cor_fecha_creacion'
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'cor_fecha_modificacion'
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
      defaultValue: false,
      field: 'cor_eliminado'
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
    tableName: 'act_correspondencia',
    schema: 'savia',
    timestamps: false  // Desactivar timestamps automáticos
  });
};

export default CorrespondenciaModel;
