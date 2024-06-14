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
        console.log("llegue a repo provincia buscarId");
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
        console.log("llegue a provincia traerTodas");
        let devolver = null;
        const query1 = `SELECT * FROM provinces LIMIT ${limit} OFFSET ${offset}`;
        const query2 = 'SELECT count(*) FROM provinces';
        try {
            const { rows: result1 } = await this.BDClient.query(query1);
            console.log(result1);
            const result2 = result1.length;
            return [result1, result2];
        }
        catch (error) {
            console.log("error en prov traerTodas");
            return ("Query error");
        }
        console.log(devolver);
    }
    async traerLoc(id, limit, offset) {
        const query1 = `SELECT * FROM locations WHERE id_province = ${id} LIMIT ${limit} OFFSET ${offset}`;
        const query2 = `SELECT COUNT(*) FROM locations WHERE id_province = ${id}`;
        try {
            const { rows: result1 } = await this.BDClient.query(query1);
            console.log('Result 1', result1);
            const result2 = result1.length;
            console.log(result2);
            return [result1, result2];
        }
        catch (error) {
            return ("Query error");
        }
    }
    async crearProvincia(provinciaCrear) {
        console.log("llego a prov crearProvincia");
        let devolver = null;
        try {
            const query = {
                text: 'INSERT INTO provinces (name,full_name,latitude,longitude) VALUES ($1,$2,$3,$4)',
                values: [provinciaCrear.name, provinciaCrear.full_name, provinciaCrear.latitude, provinciaCrear.longitude]
            };
            const result = await this.BDClient.query(query);
            devolver = result.rows[0];
            console.log("se creo la provincia");
        }
        catch (error) {
            console.log("Error creando la provincia");
        }
        return devolver;
    }
    async modificarProvincia(provinciaModificar, provinciaId) {
        console.log("llego a prov modificarProvincia");
        let devolver = null;
        try {
            const query = {
                text: 'UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4 WHERE id = $5',
                values: [provinciaModificar.name, provinciaModificar.full_name, provinciaModificar.latitude, provinciaModificar.longitude, provinciaId]
            };
            const result = await this.BDClient.query(query);
            devolver = result.rows[0];
            console.log("se modifico la provincia");
        }
        catch (error) {
            console.log("Error al modificar la prov");
        }
    }
    async borrarProvincia(provinciaId) {
        console.log("llego a prov borrarProvincia");
        let devolver = null;
        try {
            const query = {
                text: 'DELETE FROM provinces WHERE id = $1',
                values: [provinciaId]
            };
            const result = await this.BDClient.query(query);
            devolver = result.rows[0];
        }
        catch (error) {
            console.log("error eliminando la prov");
        }
    }
}
exports.ProvinciaRepository = ProvinciaRepository;
//# sourceMappingURL=provincias-repository.js.map