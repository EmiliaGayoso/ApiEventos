import pg from "pg";
import { config } from "../repositorios/bd";

const client = new pg.Client(config);
console.log('config', config);
client.connect();

export class CategoryRepository{
    async getAll(limit, offset){
        console.log("llego a repo getAll cat");
        const query1 = `SELECT * FROM event_categories ORDER BY id LIMIT ${limit} OFFSET ${offset}`;

        const queryCount = 'SELECT COUNT(*) as total FROM event_categories';
        try {
            const { rows: resp } = await client.query(query1);
            console.log("llega a query 2");
            const {rows: resp2} = await client.query(queryCount);
            console.log(resp + ',' + resp2 );
            return [resp, resp2[0].total];
        } catch (error) {
            return ("Query error");
        }
    }

    async getById(id) {
        console.log("llego a getById");
        let devolver = null;
        try {
            const query = {
                text: 'SELECT * FROM event_categories WHERE id = $1',
                values: [id]
            }
            const result = await client.query(query);
            if(result.rows.length > 0){
                devolver = result.rows[0];
            }
            
        } catch (error) {
            console.log("error en cat getById");
        }
        return devolver;
    }

    async crearCat(catCrear){
        let devolver = null;
        try {
            const query = {
                text: 'INSERT INTO event_categories (name, display_order) VALUES ($1,$2)',
                values: [catCrear.name,catCrear.display_order]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        } catch (error) {
            console.log("error en cat crear");
        }
        return devolver;
    }

    async modificarCat(catModificar){
        let devolver = null;
        try {
            const query = {
                text: 'UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3',
                values: [catModificar.name, catModificar.display_order, catModificar.id]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        } catch (error) {
            console.log("error en cat modificar");
        }
        return devolver;
    }

    async eliminarCat(id){
        let devolver = null;
        try {
            const query = {
                text: 'DELETE FROM event_categories WHERE id = $1',
                values: [id]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        } catch (error) {
            console.log("error en cat eliminar");
        }
        return devolver;
    }
}