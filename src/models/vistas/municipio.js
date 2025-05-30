import { DataTypes } from 'sequelize';

const MunicipioModel = (sequelize) => {
  return sequelize.define('Municipio', {
    codigo: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: 'codigo'
    },
    codigoDepartamento: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: 'codigo_departamento'
    },
    codigoProvincia: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'codigo_provincia'
    },
    codigoMunicipio: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'codigo_municipio'
    },
    codigoCanton: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'codigo_canton'
    },
    codigoComunidad: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'codigo_comunidad'
    },
    codigoCiudadComunidad: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'cciucom'
    },
    nombreCiudadComunidad: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'ciudad_comunidad'
    },
    nombreDepartamento: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'nombre_departamento'
    },
  }, {
    tableName: 'v_ciucom_departamento',
    schema: 'catalogo',
    timestamps: false // Asumimos que no hay columnas createdAt/updatedAt
  });
};

export default MunicipioModel;
