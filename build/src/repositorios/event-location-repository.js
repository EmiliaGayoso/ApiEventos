"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLocationRepository = void 0;
const pg_1 = __importDefault(require("pg"));
const bd_1 = require("../repositorios/bd");
const client = new pg_1.default.Client(bd_1.config);
console.log('config', bd_1.config);
client.connect();
class EventLocationRepository {
    async getAll() {
        const query1 = 'SELECT * FROM event_locations';
        const queryCount = 'SELECT COUNT(*) FROM event_locations';
        try {
            const { rows: resp } = await client.query(query1);
            const { rows: resp2 } = await client.query(queryCount);
            return [resp, resp2];
        }
        catch (error) {
            return ("error en repo event loc getAll");
        }
    }
    async getById(id) {
        let devolver = null;
        try {
            const query = {
                text: 'SELECT * FROM event_locations WHERE id = $1',
                values: [id]
            };
            const result = await client.query(query);
            if (result.rows.length > 0) {
                devolver = result.rows[0];
            }
        }
        catch (error) {
            console.log("error en repo event loc getById");
        }
        return devolver;
    }
    async crearEventLoc(crear, user) {
        let devolver = null;
        try {
            const query = {
                text: 'INSERT INTO event_locations (id_location, name, full_address, max_capacity, latitude, longitude, id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7)',
                values: [crear.id_location, crear.name, crear.full_address, crear.max_capacity, crear.latitude, crear.longitude, user]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        }
        catch (error) {
            console.log("error en repo event loc crear");
        }
        return devolver;
    }
    async modificarEventLoc(modificar, user) {
        let devolver = null;
        try {
            const query = {
                text: 'UPDATE event_locations SET id_location = $1, name = $2, full_address = $3, max_capacity = $4, latitude = $5, longitude = $6 WHERE id = $7 AND id_creator_user = $8',
                values: [modificar.id_location, modificar.name, modificar.full_address, modificar.max_capacity, modificar.latitude, modificar.longitude, modificar.id, user]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        }
        catch (error) {
            console.log("error en repo event loc modificar");
        }
        return devolver;
    }
    async borrarEventLoc(id, user) {
        let devolver = null;
        try {
            const query = {
                text: 'DELETE FROM event_locations WHERE id = $1 AND id_creator_user = $2',
                values: [id, user]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        }
        catch (error) {
            console.log("error en repo event loc eliminar");
        }
        return devolver;
    }
}
exports.EventLocationRepository = EventLocationRepository;
//# sourceMappingURL=event-location-repository.js.map