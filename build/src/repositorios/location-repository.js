"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationRepository = void 0;
const pg_1 = __importDefault(require("pg"));
const bd_1 = require("../repositorios/bd");
const client = new pg_1.default.Client(bd_1.config);
console.log('config', bd_1.config);
client.connect();
class LocationRepository {
    async getAll(limit, offset) {
        console.log("llego a getAll loc");
        const query1 = `SELECT * FROM locations LIMIT ${limit} OFFSET ${offset}`;
        try {
            const { rows: resp } = await client.query(query1);
            const resp2 = resp.length;
            return [resp, resp2];
        }
        catch (error) {
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
            };
            const result = await client.query(query);
            if (result.rows.length > 0) {
                devolver = result.rows[0];
            }
        }
        catch (error) {
            console.log("error en loc getById");
        }
        return devolver;
    }
    async getAllEventsLocations(id, limit, offset) {
        console.log(id);
        console.log(limit);
        console.log(offset);
        const query1 = `SELECT * FROM event_locations WHERE id_location = ${id} LIMIT ${limit} OFFSET ${offset}`;
        console.log("estoy en repo getalleventlocations");
        try {
            console.log("Entre al try");
            console.log(query1);
            const { rows: result1 } = await client.query(query1);
            console.log('Result 1', result1);
            const result2 = result1.length;
            console.log(result2);
            return [result1, result2];
        }
        catch (error) {
            console.log('querry erros');
            return ("Query error");
        }
    }
}
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=location-repository.js.map