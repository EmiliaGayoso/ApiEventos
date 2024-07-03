import pg from "pg";
import { config } from "../repositorios/bd";

const client = new pg.Client(config);
console.log('config', config);
client.connect();

export class LocationRepository {
    async getAll(limit, offset){
        console.log("llego a getAll loc");
        const query1 = `SELECT * FROM locations ORDER BY id LIMIT ${limit} OFFSET ${offset}`;
        try {
            const { rows: resp } = await client.query(query1);
            const resp2 = resp.length;
            return [resp, resp2];
        } catch (error) {
            return ("Query error");
        }
    }

    async getById(id) {
        console.log("llego a getById")
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

    async getAllEventsLocations(id,limit,offset){
        console.log(id)
        console.log(limit)
        console.log(offset)
        const query1 = `SELECT * FROM event_locations WHERE id_location = ${id} LIMIT ${limit} OFFSET ${offset}`;
        console.log("estoy en repo getalleventlocations");
        try {
            console.log("Entre al try")
            console.log(query1)
            const {rows: result1} = await client.query(query1);
            console.log('Result 1',result1);
            const result2 = result1.length;
            console.log(result2);

            return [result1, result2];
        } catch (error) {
            console.log('querry erros')
            return ("Query error");
        }
    }
}