import { DataTypes } from 'sequelize';

const ArchivoModel = (sequelize) => {
  return sequelize.define('Archivo', {
    idArchivo: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'arc_id'
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'arc_nombre'
    },
    tipo: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'arc_tipo'
    },
    tamanio: {
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'arc_tamanio'
    },
    enlace: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'arc_enlace'
    },
    idReunion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'act_reuniones',  // Modelo de la tabla de reuniones
        key: 'reu_id'
      },
      field: 'reu_id'
    },
    idCorrespondencia: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'act_correspondencia',  // Modelo de la tabla de correspondencia
        key: 'cor_id'
      },
      field: 'cor_id'
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
      field: 'arc_eliminado'
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'arc_fecha_creacion'
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'arc_fecha_modificacion'
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
    tableName: 'act_archivos',
    schema: 'savia',
    timestamps: false  // Desactivar timestamps automáticos
  });
};

export default ArchivoModel;
