import { DataTypes } from 'sequelize';

const ReunionModel = (sequelize) => {
  const Reunion = sequelize.define('Reunion', {
    idReunion: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: 'reu_id'
    },
    fechaHoraInicio: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'reu_fecha_hora_inicio'
    },
    idLocutor: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'act_representantes',  // Modelo de la tabla de representantes
        key: 'rep_id'
      },
      field: 'reu_locutor_id'
    },
    lugar: {
      type: DataTypes.STRING(50),
      allowNull: true,
      field: 'reu_ubicacion'
    },
    fechaHoraConvenio: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reu_fecha_firma_convenio'
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'reu_tipo'
    },
    acuerdos: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'reu_acuerdos'
    },
    motivo: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'reu_motivo'
    },
    fechaSuspencion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reu_fecha_suspencion'
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
      field: 'reu_eliminado'
    },
    fechaCreacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reu_fecha_creacion'
    },
    fechaModificacion: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'reu_fecha_modificacion'
    },
    asunto: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'reu_asunto'
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
    idReunionPadre: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'act_reuniones',
        key: 'reu_id'
      },
      field: 'reu_padre_id'
    }
  }, {
    tableName: 'act_reuniones',
    schema: 'savia',
    timestamps: false  // Desactivar timestamps automáticos
  });

  // Reunion.beforeCreate((instance, options) => {
  //   console.log("🚀🚀🚀 : optionssss", options)
  //   console.log("🚀🚀🚀 : instancesss", instance)
  //   console.log("Dentro del hook aaaaaaaaaaaaaaaaaaaaaabeforeCreate");  // Asegúrate de que se ejecuta el hook
  //   // const req = options.context;

  //   // // Verificar si el idUsuario llega al modelo
  //   // if (req && req.sequelizeUser && req.sequelizeUser.idUsuario) {
  //   //   console.log("ID Usuario en el hook:", req.sequelizeUser.idUsuario);
  //   //   instance.idUsuario = req.sequelizeUser.idUsuario;
  //   // } else {
  //   //   console.log("ID Usuario no encontrado en el hook");
  //   // }
  // });

  return Reunion;
};

export default ReunionModel;
