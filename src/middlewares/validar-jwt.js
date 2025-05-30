// TODO: archivo fuera de uso
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    // Leer token
    const token = req.header('token');
    console.log("🚀🚀🚀 : tokens", token)

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();

        // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
}


module.exports = {
    validarJWT
}


