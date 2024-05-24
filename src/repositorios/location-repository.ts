import pg from "pg";
import { config } from "../repositorios/bd";

const client = new pg.Client(config);
console.log('config', config);
client.connect();

export class LocationRepository {
    async getAll(limit, offset){
        console.log("llego a getAll loc");
        const query1 = 'SELECT * FROM locations';

        const queryCount = 'SELECT COUNT(*) FROM locations';
        try {
            const { rows: resp } = await client.query(query1);
            const { rows: resp2 } = await client.query(queryCount);
            return [resp, resp2];
        } catch (error) {
            return ("Query error");
        }
    }

    async getById(id) {
        console.log("llego a getById");
        let devolver = null;
        try {
            const query = {
                text: 'SELECT * FROM locations WHERE id = $1',
                values: [id]
            }
            const result = await client.query(query);
            if(result.rows.length > 0){
                devolver = result.rows[0];
            }
            
        } catch (error) {
            console.log("error en loc getById");
        }
        return devolver;
    }
}