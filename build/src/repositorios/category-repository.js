"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRepository = void 0;
const pg_1 = __importDefault(require("pg"));
const bd_1 = require("../repositorios/bd");
const client = new pg_1.default.Client(bd_1.config);
console.log('config', bd_1.config);
client.connect();
class CategoryRepository {
    async getAll(limit, offset) {
        console.log("llego a repo getAll cat");
        const query1 = `SELECT * FROM event_categories LIMIT ${limit} OFFSET ${offset}`;
        const queryCount = 'SELECT COUNT(*) FROM event_categories';
        try {
            const { rows: resp } = await client.query(query1);
            console.log("llega a query 2");
            const resp2 = resp.length;
            console.log(resp + ',' + resp2);
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
                text: 'SELECT * FROM event_categories WHERE id = $1',
                values: [id]
            };
            const result = await client.query(query);
            if (result.rows.length > 0) {
                devolver = result.rows[0];
            }
        }
        catch (error) {
            console.log("error en cat getById");
        }
        return devolver;
    }
    async crearCat(catCrear) {
        let devolver = null;
        try {
            const query = {
                text: 'INSERT INTO event_categories (name, display_order) VALUES ($1,$2)',
                values: [catCrear.name, catCrear.display_order]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        }
        catch (error) {
            console.log("error en cat crear");
        }
        return devolver;
    }
    async modificarCat(catModificar) {
        let devolver = null;
        try {
            const query = {
                text: 'UPDATE event_categories SET name = $1, display_order = $2 WHERE id = $3',
                values: [catModificar.name, catModificar.display_order, catModificar.id]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        }
        catch (error) {
            console.log("error en cat modificar");
        }
        return devolver;
    }
    async eliminarCat(id) {
        let devolver = null;
        try {
            const query = {
                text: 'DELETE FROM event_categories WHERE id = $1',
                values: [id]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        }
        catch (error) {
            console.log("error en cat eliminar");
        }
        return devolver;
    }
}
exports.CategoryRepository = CategoryRepository;
//# sourceMappingURL=category-repository.js.map