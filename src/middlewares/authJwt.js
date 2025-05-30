
// import config from "../config.js";
import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  // let token = req.headers["authorization"];
  let token = req.headers.token;
  console.log("🚀🚀🚀 : tokenve", req.headers.token)

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
    console.log("🚀🚀🚀 : decod ed", decoded)

    // Extraer el idUsuario del token decodificado
    const { idUsuario } = decoded;
    console.log("🚀🚀🚀 : idUsuarioddd", idUsuario)

    // Almacenar el idUsuario en req.user y req.sequelizeUser
    req.user = { idUsuario };
    req.sequelizeUser = req.user;  // Asegura que req.user esté disponible globalmente

    // Verificar si el idUsuario está presente
    console.log("ID Usuario en el middleware:", req.sequelizeUser.idUsuario);

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const checkExistingRole = async (req, res, next) => {
  const token = req.headers["token"];
  const decode = await jwt.verify(token, process.env.JWT_KEY);
  if (!decode.rol) return res.status(400).json({ message: "No roles" });

  next();
};