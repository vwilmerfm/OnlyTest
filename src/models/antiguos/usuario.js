// import { DataTypes } from 'sequelize';

// const UsuarioModel = (sequelize) => {
//   const Usuario = sequelize.define('Usuario', {
//     idUsuario: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       field: 'usu_id'
//     },
//     usuario: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       field: 'usu_nombre_usuario'
//     },
//     nombres: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'usu_nombres'
//     },
//     // usu_nombre2: {
//     //   type: DataTypes.STRING,
//     //   allowNull: true
//     // },
//     apellidoPaterno: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'usu_paterno'
//     },
//     apellidoMaterno: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       field: 'usu_materno'
//     },
//     correo: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//       validate: {
//         isEmail: true
//       },
//       field: 'usu_correo_electronico'
//     },
//     contrasenia: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       field: 'usu_contrasenia'
//     },
//     idEstado: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//       field: 'usu_estado'
//     },
//     eliminado: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: false,
//       field: 'usu_eliminado'
//     },
//     idAlcanceUsuario: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       references: {
//         model: 'par_codificadores',
//         key: 'cod_id'
//       },
//       field: 'alcance_id'
//     },
//     idCargo: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       references: {
//         model: 'par_codificadores',
//         key: 'cod_id'
//       },
//       field: 'cargo_id'
//     }
//   }, {
//     tableName: 'aut_usuarios',
//     schema: 'autenticacion',
//     timestamps: false,
//   });

//   // Este método oculta la contraseña al convertir el modelo a JSON
//   Usuario.prototype.toJSON = function () {
//     const values = Object.assign({}, this.get());
//     delete values.usu_contrasenia;
//     return values;
//   };

//   return Usuario;
// };

// export default UsuarioModel;
