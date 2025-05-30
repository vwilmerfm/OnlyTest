import { pool } from '../database.js'
import crypto from 'crypto'

export class loginModel {
    static async verificar({ datos }) {
        const { usuario, contrasenia } = datos;
        console.log("🚀🚀🚀 : datos", datos)
        try {
            // const hashpassword = bycrypt.hashSync(Clave, 10);

            const hash = crypto.createHash('sha1').update(contrasenia).digest('base64');
            console.log("......>>>", hash);
            // const sql_verifica = "select * from aut_usuarios a where usuario =$1 and contrasenia =$2";
            const sql_verifica = "select * from autenticacion.aut_usuarios where usuario = $1 and contrasenia = $2";
            const values = [usuario, hash];
            const listado = await pool.query(sql_verifica, values);
            console.log("___________________", listado.rows[0]);
            if (listado.rows[0]) {
                return listado.rows[0];
            } else {
                console.log("sin usuario");
                return null;
            }

        } catch (e) {
            console.log(".......//:::.", e.message);
            return null;
        }

    }
}
