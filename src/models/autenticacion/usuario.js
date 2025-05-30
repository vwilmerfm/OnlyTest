// import { DataTypes } from 'sequelize';

// const UsuarioModel = (sequelize) => {
//   return sequelize.define('Usuario', {
//     idUsuario: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       allowNull: false,
//       primaryKey: true,
//       field: 'usu_id'
//     },
//     nombreUsuario: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//       field: 'usu_nombre_usuario'
//     },
//     nombres: {
//       type: DataTypes.STRING(40),
//       allowNull: false,
//       field: 'usu_nombres'
//     },
//     apellidoPaterno: {
//       type: DataTypes.STRING(20),
//       allowNull: false,
//       field: 'usu_paterno'
//     },
//     apellidoMaterno: {
//       type: DataTypes.STRING(20),
//       allowNull: true,
//       field: 'usu_materno'
//     },
//     correoElectronico: {
//       type: DataTypes.STRING(50),
//       allowNull: true,
//       field: 'usu_correo_electronico'
//     },
//     contrasenia: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//       field: 'usu_contrasenia'
//     },
//     fechaCreacion: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//       field: 'usu_fecha_creacion'
//     },
//     idCreacion: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       field: 'usu_id_creacion'
//     },
//     fechaModificacion: {
//       type: DataTypes.DATEONLY,
//       allowNull: true,
//       field: 'usu_fecha_modificacion'
//     },
//     idUsuarioModificacion: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       field: 'usu_id_modificacion'
//     },
//     estado: {
//       type: DataTypes.STRING(20),
//       allowNull: true,
//       field: 'usu_estado'
//     },
//     eliminado: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//       defaultValue: false,
//       field: 'usu_eliminado'
//     },
//     idAlcance: {
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
//     timestamps: false  // Desactivamos los timestamps automáticos
//   });
// };

// export default UsuarioModel;
