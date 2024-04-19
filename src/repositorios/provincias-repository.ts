import { query } from "express";
import pg from "pg";
import { config } from "../repositorios/bd";
const user = new pg.Client(config);


export class ProvinciaRepository {
    async buscarId(id){
        const query = {
            text: 'SELECT * FROM provinces WHERE id = $1',
            values: [id]
          };
          const result = await client.query(query);
          const returnEntity = result.rows[0]; //no hace falta el "[]"?
          console.log(result);
    }
}