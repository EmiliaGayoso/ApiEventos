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
        const query1 = 'SELECT * FROM locations';
        const queryCount = 'SELECT COUNT(*) FROM locations';
        try {
            const { rows: resp } = await client.query(query1);
            const { rows: resp2 } = await client.query(queryCount);
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
    async getAllEventsLocations(id) {
        return "algo";
    }
}
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=location-repository.js.map