import { DataTypes } from 'sequelize';

const EntidadModel = (sequelize) => {
  return sequelize.define('Entidad', {
    idEntidad: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'ent_id'
    },
    codigoEntidad: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      field: 'ent_codigo'
    },
    nombreEntidad: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ent_nombre'
    },
    sigla: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ent_sigla'
    },
    idAlcance: {
      type: DataTypes.INTEGER,
      // type: DataTypes.STRING,
      allowNull: true,
      field: 'ent_alcance'
    },
    municipio: {
      type: DataTypes.STRING,
      // type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_municipio'
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ent_direccion'
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ent_telefono'
    },
    paginaWeb: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ent_pag_web'
    },
    redesSociales: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'ent_facebook'
    },
    // twitter: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   field: 'ent_twitter'
    // },
    idCaracteristicas: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_caracteristicas'
    },
    idTipoSistemaTrabajo: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_tipo_trabajo'
    },
    idNivelImportanciaEconomica: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_nivel_imp_eco'
    },
    idNivelImportanciaPolitica: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_nivel_imp_pol'
    },
    idCalificacionImportanciaEstrategica: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_calificacion'
    },
    expectativaOrganizacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_espectativa'
    },
    fuerzaOrganizacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_fuerza'
    },
    resultante: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_resultante'
    },
    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'ent_estado',
      defaultValue: true
    },
    eliminado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'ent_eliminado',
      defaultValue: false
    },
    poseeDirectorioProductores: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'ent_posee_directorio_productores',
      defaultValue: false
    },
    haceEntregaListadoProductores: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'ent_hace_entrega_productores',
      defaultValue: false
    },
    idDigitalFisico: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'ent_tipo_listado_id'
    },

  }, {
    tableName: 'act_entidades',
    schema: 'savia',
    timestamps: false,
  });

};

export default EntidadModel;