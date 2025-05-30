import { response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import { generarJWT } from '../helpers/jwt.js';
import { sequelize } from '../database.js';

import VwUsuariosModel from '../models/vw_usuarios.js';
// import MonAsignacionPersonalModel from "../models/asignacion_personal_model.js";
// import RolesAsignacionModel from "../models/mon_roles_asignacion_model.js";

const Usuario = VwUsuariosModel(sequelize);
// const MonAsignacionPersonal = MonAsignacionPersonalModel(sequelize);
// const RolesAsignacion = RolesAsignacionModel(sequelize);

// // // Establecer las asociaciones
// // MonAsignacionPersonal.belongsTo(RolesAsignacion, {
// //   foreignKey: 'ras_id',
// //   as: 'rol'
// // });

// // RolesAsignacion.hasMany(MonAsignacionPersonal, {
// //   foreignKey: 'ras_id',
// //   as: 'asignacionesPersonal'
// // });

const crearUsuario = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    console.log("🚀🚀🚀 : Usuario1", Usuario);

    const existeEmail = await Usuario.findOne({ where: { email } });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya está registrado'
      });
    }

    const usuario = new Usuario(req.body);
    console.log("🚀🚀🚀 : usuario2", usuario)

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar mi JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
};

const login = async (req, res = response) => {
  console.log("🚀🚀🚀 : req", req.body);
  const { usuario, contrasenia } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({
      where: { aut_us_usuario: usuario },
    });

    // Verificar si el usuario existe
    if (!usuarioDB) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Revise el usuario y la contraseña'
      });
    }
    console.log('🚀🚀🚀 : usuarioDB', usuarioDB.aut_id_usuario);

    // Validar la contraseña
    const contraseniaValida = await bcrypt.compare(contrasenia, usuarioDB.aut_us_password);

    if (!contraseniaValida) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Contraseña incorrecta'
      });
    }

    // Generar el JWT
    const token = await generarJWT(usuarioDB.aut_id_usuario);

    const data = {
      ...usuarioDB.dataValues,
      // cargo: usuarioCargo
    };

    res.json({
      success: true,
      data: {
        usuario: data,
        token,
      },
      message: 'Inicio de sesión exitoso'
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Ocurrió un error inesperado. Por favor, póngase en contacto con el administrador del sistema.'
    });
  }
};

const renewToken = async (req, res = response) => {

  // let token = req.headers["authorization"];
  let token = req.headers.token;
  console.log("🚀🚀🚀 : tokenre", token)

  // Verificar si la cabecera Authorization está presente
  if (!token) {
    return res.status(403).json({ message: "No se tiene el token. renewToken" });
  }

  // Eliminar el prefijo 'Bearer ' del token
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }


  // Verificar el token usando la clave secreta
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  console.log('🚀🚀🚀 : decoded', decoded)


  // Extraer el idUsuario del token decodificado
  const { idUsuario } = decoded;
  console.log("🚀🚀🚀 : idUsuariodecoded", decoded)


  //const uid = req.uid;

  // generar un nuevo JWT, generarJWT... uid...
  const newToken = await generarJWT(idUsuario);

  // Obtener el usuario por el UID, Usuario.findById... 
  const usuario = await Usuario.findOne({ where: { aut_id_usuario: idUsuario } });



  const data = {
    ...usuario.dataValues,
    // cargo: usuarioCargo
  };

  res.json({
    success: true,
    data: {
      usuario: data,
      token: newToken,
    },
    message: 'Token renovado correctamente'
  });
};

// // // Un usuario pertenece a un solo alcance
// // Usuario.belongsTo(Codificadores, { foreignKey: 'alcance_id', as: 'alcance' });
// // Codificadores.hasMany(Usuario, { foreignKey: 'alcance_id' });

// // // Un usuario pertenece a un solo cargo
// // Usuario.belongsTo(Codificadores, { foreignKey: 'cargo_id', as: 'cargoRelacion' });
// // Codificadores.hasMany(Usuario, { foreignKey: 'cargo_id' });

const obtenerUsuario = async (token, res) => {
  // Verificar si la cabecera Authorization está presente
  if (!token) {
    return res.status(403).json({ message: "No se tiene el token. verid" });
  }

  // Eliminar el prefijo 'Bearer ' del token
  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  try {
    // Verificar el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    // Extraer el idUsuario del token decodificado
    const { idUsuario } = decoded;
    // console.log("🚀🚀🚀 : idUsuario", idUsuario);

    // Consulta de usuario con su cargo y alcance
    const usuario = await Usuario.findOne({
      where: { aut_id_usuario: idUsuario },
      // include: [
      //   {
      //     model: Codificadores,
      //     as: 'alcance',
      //     attributes: ['idCodificador', 'nombre'],
      //   },
      //   {
      //     model: Codificadores,
      //     as: 'cargoRelacion',
      //     attributes: ['idCodificador', 'nombre'],  // Solo traer el campo 'nombre'
      //   },
      // ],
      // attributes: ['idUsuario', 'usuario', 'nombres', 'apellidoPaterno', 'apellidoMaterno', 'correo', 'contrasenia', 'idEstado', 'eliminado', 'idAlcanceUsuario', 'idCargo'],
    });

    if (!usuario) {
      return { message: 'Usuario no encontrado.' };
    }

    return usuario;  // Retornar el usuario encontrado con alcance y cargo
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    return { message: "Error" };
  }
};

export { crearUsuario, login, renewToken, obtenerUsuario };
