import { DataTypes } from 'sequelize';

const RepresentanteModel = (sequelize) => {
  return sequelize.define('Representante', {
    idRepresentante: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'rep_id'
    },
    nombreCompleto: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'rep_nombre_completo'
    },
    cargoNombre: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'rep_cargo'
    },
    celular: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'rep_numero'
    },
    tieneWhatsApp: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'rep_whatsapp'
    },
    idEntidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'EntidadModel',
        key: 'idEntidad'
      },
      field: 'ent_id'
    },
    estado: {
      type: DataTypes.STRING(20),
      field: 'rep_estado'
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      field: 'rep_eliminado'
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      field: 'rep_fecha_modificacion'
    },
    rep_id_creacion: {
      type: DataTypes.INTEGER,
      field: 'rep_id_creacion'
    },
    rep_id_modificacion: {
      type: DataTypes.DATE,
      field: 'rep_id_modificacion'
    }
  }, {
    tableName: 'act_representantes',
    schema: 'savia',
    timestamps: false
  });
};

export default RepresentanteModel;
