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
          const result = await user.query(query); //espera al resultado, sino te suele mandar vacio
          const devolver = result.rows[0]; //para que agarre el primero
          console.log(result);
          return devolver;
    }

    async traerTodas(limit, offset){
        const query = {
            text: 'SELECT * FROM provinces LIMIT $1 OFFSET $2',
            values: [limit, offset]
        };
        const result = await user.query(query);
        const devolver = result.rows[0];
        console.log(result);
        return devolver;
    }
}