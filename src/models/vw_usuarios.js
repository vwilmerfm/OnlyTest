import { DataTypes } from 'sequelize';

const VwUsuariosModel = (sequelize) => {
  const VwUsuarios = sequelize.define('VwUsuarios', {
    aut_id_usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,  // Lo definimos como clave primaria
      allowNull: true
    },
    aut_id_area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    aut_cont_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    aut_us_usuario: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    aut_us_password: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    aut_us_nombres: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    aut_us_paterno: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    aut_us_materno: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    aut_us_ci: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    aut_us_ext: {
      type: DataTypes.STRING(2),
      allowNull: true
    },
    aut_us_profesion: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    aut_us_rol: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    rol: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    aut_us_estado: {
      type: DataTypes.SMALLINT,
      allowNull: true
    },
    descripcion: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    area: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    cargo: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    ingreso: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    aut_us_ultimo_ingreso: {
      type: DataTypes.DATE,
      allowNull: true
    },
    aut_cont_fin_contrato: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    aut_id_usuario_post: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    per_correo_electronico: {
      type: DataTypes.STRING,
      allowNull: true
    },
    par_codigo: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sede: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'vw_usuarios',
    schema: 'monitoreo', // Ajusta esto según tu esquema
    timestamps: false,
    freezeTableName: true
  });

  return VwUsuarios;
};

export default VwUsuariosModel;