import { pool } from "../database.js";
export class administradorModel {
  static async crear({ datos }) {
    const { adm_login, adm_pass, rol_id } = datos;

    try {
      const text =
        "insert into administrador (adm_login,adm_pass,rol_id) values($1, $2,$3) RETURNING *";
      const values = [adm_login, adm_pass, rol_id];
      const res = await pool.query(text, values);
      const rows = res.rows[0];
      return rows;
    } catch (e) {
      //console.log("....", e.message);
      return null;
    }
  }

  static async getLista() {
    try {
      const text = "select * from administrador where adm_estado=1 order by adm_id asc";
      const res = await pool.query(text);
      return res.rows;
    } catch (e) {
      console.log(e.message);
      return null;
    }
  }
  static async getId({ id }) {
    const sql = "select * from administrador where adm_id=$1";
    const values = [id];
    const lista_dato = await pool.query(sql, values);
    try {
      return lista_dato.rows[0];
    } catch (e) {
      return null;
    }
  }
  static async eliminiar({ id }) {
    try {
      const sql_query =
        "update administrador set adm_estado=2 where adm_id=$1 RETURNING *";
      const value = [id];
      const eliminar = await pool.query(sql_query, value);
      console.log(eliminar.rows[0]);
      return eliminar.rows[0];
    } catch (e) {
      return null;
    }
  }
  static async modificar({ input, adm_id }) {
    const { adm_login, adm_pass } = input;
    try {
      const sql_update =
        "update administrador set adm_login=$1 , adm_pass=$2 where adm_id=$3 returning *";
      const values = [adm_login, adm_pass, adm_id];
      const result = await pool.query(sql_update, values);
      return result.rows[0];
    } catch (e) {
      console.log("error de bd", e);
      return null;
    }
  }
}
