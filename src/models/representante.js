import { DataTypes } from 'sequelize';

const RepresentanteModel = (sequelize) => {
  return sequelize.define('Representante', {
    idRepresentante: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'rep_id'
    },
    nombres: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'rep_nombre'
    },
    apellidoPaterno: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'rep_apellido_paterno'
    },
    apellidoMaterno: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'rep_apellido_materno'
    },
    idCargo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'par_codificadores',  // Modelo de la tabla de codificadores
        key: 'cod_id'
      },
      field: 'rep_cargo_id'
    },
    celular: {
      type: DataTypes.STRING(12),
      allowNull: false,
      field: 'rep_celular'
    },
    tieneWhatsApp: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      field: 'rep_whatsapp'
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
      field: 'rep_eliminado'
    },
    idEntidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'act_entidades',  // Modelo de la tabla de entidades
        key: 'ent_id'
      },
      field: 'ent_id'
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'rep_fecha_creacion'
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'rep_fecha_modificacion'
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
    tableName: 'act_representantes',
    schema: 'savia',
    timestamps: false  // Desactivar timestamps automáticos
  });
};

export default RepresentanteModel;
