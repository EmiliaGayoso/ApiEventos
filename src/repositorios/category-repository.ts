import pg from "pg";
import { config } from "../repositorios/bd";

const client = new pg.Client(config);
console.log('config', config);
client.connect();

export class CategoryRepository{
    async getAll(limit, offset){
        console.log("llego a getAll cat");
        const query1 = 'SELECT * FROM event_categories';

        const queryCount = 'SELECT COUNT(*) FROM event_categories';
        try {
            const { rows: resp } = await client.query(query1);
            const { rows: resp2 } = await client.query(queryCount);
            return [resp, resp2];
        } catch (error) {
            return ("Query error");
        }
    }
}