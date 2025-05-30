import { DataTypes } from 'sequelize';

const EntidadModel = (sequelize) => {
  const Entidad = sequelize.define('Entidad', {
    idEntidad: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'ent_id'
    },
    codigoEntidad: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ent_codigo'
    },
    nombreEntidad: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'ent_nombre'
    },
    sigla: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'ent_sigla'
    },
    idAlcance: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CodificadorModel',
        key: 'idCodificador'
      },
      field: 'ent_alcance_id'
    },
    datosAlcance: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ent_datos_alcance'
    },
    // municipio: {
    //   type: DataTypes.STRING(30),
    //   allowNull: true,
    //   field: 'ent_municipio'
    // },
    // provincia: {
    //   type: DataTypes.STRING(30),
    //   allowNull: true,
    //   field: 'ent_provincia'
    // },
    // departamento: {
    //   type: DataTypes.STRING(30),
    //   allowNull: true,
    //   field: 'ent_departamento'
    // },
    direccion: {
      type: DataTypes.STRING(60),
      allowNull: true,
      field: 'ent_direccion'
    },
    telefonos: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ent_telefonos'
    },
    redesSociales: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ent_redes_sociales'
    },
    idTipoOrganizacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CodificadorModel',
        key: 'idCodificador'
      },
      field: 'ent_tipo_organizacion_id'
    },
    idNacionalDepartamentalMunicipal: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CodificadorModel',
        key: 'idCodificador'
      },
      field: 'ent_nac_dep_mun_id'
    },
    idMinisterio: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CodificadorModel',
        key: 'idCodificador'
      },
      field: 'ent_ministerio_id'
    },
    idLegislativoEjecutivo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CodificadorModel',
        key: 'idCodificador'
      },
      field: 'ent_legis_ejecut_id'
    },
    idPrivados: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'CodificadorModel',
        key: 'idCodificador'
      },
      field: 'ent_privados_id'
    },
    idEstado: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'CodificadorModel',
        key: 'idCodificador'
      },
      field: 'cod_estado_id'
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
      field: 'ent_eliminado'
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'ent_fecha_creacion'
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'ent_fecha_modificacion'
    },
    idUsuario: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'usu_id',
      references: {
        model: 'autenticacion.aut_usuarios',
        key: 'usu_id'
      }
    },
    privadosId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_privados_id'
    }
  }, {
    tableName: 'act_entidades',
    schema: 'savia',
    timestamps: false,
  });
  return Entidad;
};

export default EntidadModel;
