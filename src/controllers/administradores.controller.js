// import { pool } from "../database.js";
import config from "../config.js";
import jwt from 'jsonwebtoken';
import { administradorModel } from "../models/administrador.model.js";
import { loginModel } from "../models/login.model.js";

import { validatePartial, validateUser } from "../shema/login.shema.js";
import {
  validacionAdmin,
  validacionParcial,
} from "../shema/administrador.shema.js";


//app.use(cookieParser())
export const loginAdministrador = async (req, res) => {
  const result = validateUser(req.body);
  // const unsername = result.data.Usuario1;

  if (result.error) {
    console.log("error...");
    console.log(result.error.message);
    return res.status(400).json({ error: JSON.parse(result.error.message) });
  } else {

    const verifica_login = await loginModel.verificar({ datos: result.data });
    if (verifica_login) {
      const token = jwt.sign(
        {
          id: verifica_login.adm_id,
          username: verifica_login.adm_login,
          rol: verifica_login.adm_rol
        },
        config.SECRET,
        {
          expiresIn: '24h'
        });

      res.cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      })
      res.send({ usuario: verifica_login, token });
    } else {
      res.status(400).json({ error: "no existe el usuario" });
    }
  }

};
export const postRegistroAdministrador = async (req, res) => {
  const result = validacionAdmin(req.body);
  console.log(result);
  if (!result.success) {
    console.log(result.error);
    return res.status(400).json({ error: JSON.parse(result.error) });
  } else {
    const nuevoReg = await administradorModel.crear({ datos: result.data });
    if (nuevoReg) {
      res.status(200).json(nuevoReg);
    } else {
      res.status(400).json(nuevoReg);
    }
  }
};
export const getAdministrador = async (req, res) => {
  console.log("getlista");
  const lista = await administradorModel.getLista();

  if (lista) {
    console.log("hola grover");
    res.status(200).json(lista);
  } else {
    res.status(400).json(lista);
  }
};
export const getAdministradorById = async (req, res) => {
  const { id } = req.body;
  const datos = await administradorModel.getId({ id });
  if (datos) {
    res.status(200).json(datos);
  } else {
    res.status(400).json(datos);
  }
};
export const deleteAdminitrador = async (req, res) => {
  console.log(":::::::::::::::");
  console.log(req.body);
  const { id } = req.body;
  if ({ id }) {
    const dato_eliminado = await administradorModel.eliminiar({ id });
    res.status(200).json(dato_eliminado);
  } else {
    res.status(400).json(dato_eliminado);
  }
};
export const updateAdministradorById = async (req, res) => {
  console.log(req.body);
  const adm_id = req.body["adm_id"]
  console.log("......update......", adm_id);
  const result = validacionParcial(req.body);
  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error) });
  } else {
    const update = await administradorModel.modificar({ input: result.data, adm_id });
    if (update) {
      res.status(200).json(update);
    } else {
      res.status(400).json(update);
    }
  }
};
