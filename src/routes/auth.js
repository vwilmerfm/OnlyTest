import { Router } from 'express';
import { check } from 'express-validator';
import { crearUsuario, login, renewToken } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';
// import { validarJWT } from '../middlewares/validar-jwt.js';
import { verifyToken } from "../middlewares/authJwt.js"

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    validarCampos
], crearUsuario);

// router.post('/',
//     [
//         check('usu_nombre_usuario', 'La contraseña es obligatoria').not().isEmpty(),
//         check('usu_contrasenia', 'El correo es obligatorio').isEmail(),
//     ],
//     login);

router.post('/', login);


router.get('/renew', verifyToken, renewToken);

export default router;


// // /*
// //     path: api/login

// // */
// // const { Router } = require('express');
// // const { check } = require('express-validator');

// // const { crearUsuario, login, renewToken } = require('../controllers/auth');
// // const { validarCampos } = require('../middlewares/validar-campos');
// // const { validarJWT } = require('../middlewares/validar-jwt');

// // const router = Router();



// // router.post('/new', [
// //     check('nombre', 'El nombre es obligatorio').not().isEmpty(),
// //     check('password', 'La contraseña es obligatoria').not().isEmpty(),
// //     check('email', 'El correo es obligatorio').isEmail(),
// //     validarCampos
// // ], crearUsuario);

// // router.post('/', [
// //     check('password', 'La contraseña es obligatoria').not().isEmpty(),
// //     check('email', 'El correo es obligatorio').isEmail(),
// // ], login);


// // router.get('/renew', validarJWT, renewToken);

// // module.exports = router;
