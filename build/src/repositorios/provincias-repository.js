"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinciaRepository = void 0;
const pg_1 = __importDefault(require("pg"));
const bd_1 = require("../repositorios/bd");
class ProvinciaRepository {
    constructor() {
        const { Client } = pg_1.default;
        this.BDClient = new pg_1.default.Client(bd_1.config);
        this.BDClient.connect();
    }
    async buscarId(id) {
        let devolver = null;
        try {
            const query = {
                text: 'SELECT * FROM provinces WHERE id = $1',
                values: [id]
            };
            const result = await this.BDClient.query(query);
            if (result.rows.length > 0) {
                devolver = result.rows[0];
            }
        }
        catch (error) {
            console.log("error en prov.rep.buscarId");
        }
        console.log(devolver);
        return devolver;
    }
    async traerTodas(limit, offset) {
        const query = {
            text: 'SELECT * FROM provinces LIMIT $1 OFFSET $2',
            values: [limit, offset]
        };
        const result = await this.BDClient.query(query);
        const devolver = result.rows[0];
        console.log(result);
        return devolver;
    }
    crearProvincia(provinciaCrear) {
    }
    modificarProvincia(provinciaModificar, provinciaId) {
    }
    borrarProvincia(provinciaId) {
    }
}
exports.ProvinciaRepository = ProvinciaRepository;
//# sourceMappingURL=provincias-repository.js.map