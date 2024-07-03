import pg from "pg";
import { config } from "../repositorios/bd";

const client = new pg.Client(config);
console.log('config', config);
client.connect();

export class EventLocationRepository {
    async getAll(limit, offset){
        console.log('llegue a getAll de eventlocrepo');
        const query1 = `SELECT * FROM event_locations ORDER BY id LIMIT ${limit} OFFSET ${offset}`;
        const query2 = `SELECT COUNT(*) as total FROM event_locations`

        try {
            const { rows: resp } = await client.query(query1);
            const {rows: resp2} = await client.query(query2);
            console.log('Length de event_locations: ', resp2);
            return [resp, resp2[0].total];
        } catch (error) {
            return ("error en repo event loc getAll");
        }
    }

    async getById(id){
        let devolver = null;
        try {
            const query = {
                text: 'SELECT * FROM event_locations WHERE id = $1',
                values: [id]
            }
            const result = await client.query(query);
            if(result.rows.length > 0){
                devolver = result.rows[0];
            }
            
        } catch (error) {
            console.log("error en repo event loc getById");
        }
        return devolver;
    }

    async crearEventLoc(crear, user){
        let devolver = null;
        try {
            const query = {
                text: 'INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *',
                values: [crear.id_location, crear.name, crear.full_address, crear.max_capacity, crear.latitude, crear.longitude, user]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        } catch (error) {
            console.log("error en repo event loc crear");
        }
        return devolver;
    }

    async modificarEventLoc(modificar, user){
        let devolver = null;
        try {
            const query = {
                text: 'UPDATE event_locations SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6 WHERE id = $7 AND id_creator_user = $8 RETURNING *',
                values: [modificar.id_location, modificar.name, modificar.full_address, modificar.max_capacity, modificar.latitude, modificar.longitude, modificar.id, user]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        } catch (error) {
            console.log("error en repo event loc modificar");
        }
        return devolver;
    }

    async borrarEventLoc(id, user){
        let devolver = null;
        try {
            const query = {
                text: 'DELETE FROM event_locations WHERE id = $1 AND id_creator_user = $2',
                values: [id, user]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        } catch (error) {
            console.log("error en repo event loc eliminar");
        }
        return devolver;
    }
}