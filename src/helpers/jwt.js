import jwt from 'jsonwebtoken';

const generarJWT = (idUsuario) => {
  return new Promise((resolve, reject) => {
    const payload = { idUsuario };

    console.log("🚀🚀🚀 : payload", payload)
    jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: '24h'
    }, (err, token) => {
      if (err) {
        // no se pudo crear el token
        reject('No se pudo generar el JWT');
      } else {
        // TOKEN!
        resolve(token);
      }
    });
  });
};

const comprobarJWT = (token = '') => {
  try {
    const { idUsuario } = jwt.verify(token, process.env.JWT_KEY);
    return [true, idUsuario];
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return [false, null];
  }
};

export { generarJWT, comprobarJWT };