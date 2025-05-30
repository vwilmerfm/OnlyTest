import { DataTypes } from 'sequelize';

const AfiliadoModel = (sequelize) => {
  return sequelize.define('Afiliado', {
    idAfiliado: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'afi_id'
    },
    estado: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'afi_estado'
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      field: 'afi_eliminado'
    },
    idEntidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'act_entidades',  // Modelo de la tabla entidades
        key: 'ent_id'
      },
      field: 'ent_id'
    },
    idEntidadAfiliado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'act_entidades',  // Modelo de la tabla entidades
        key: 'ent_id'
      },
      field: 'ent_id_afiliado'
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'par_codificadores',  // Modelo de la tabla codificadores
        key: 'cod_id'
      },
      field: 'cod_estado_id'
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'afi_fecha_creacion'
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'afi_fecha_modificacion'
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
    tableName: 'act_afiliados',
    schema: 'savia',
    timestamps: false,  // Desactivar timestamps automáticos
  });
};

export default AfiliadoModel;
