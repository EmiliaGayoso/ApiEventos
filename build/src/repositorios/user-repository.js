"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const pg_1 = __importDefault(require("pg"));
const bd_1 = require("../repositorios/bd");
const client = new pg_1.default.Client(bd_1.config);
console.log('config', bd_1.config);
client.connect();
class UserRepository {
    async verificarExistenciaUsuario(username, password) {
        let devolver = null;
        try {
            const query = {
                text: 'SELECT * FROM user where username=$1 AND password=$2',
                values: [username, password]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        }
        catch (error) {
            console.log("error en repo event loc crear");
        }
        return devolver;
    }
    async crearUsuario(fName, lName, username, password) {
        let devolver = null;
        try {
            const query = {
                text: 'SELECT * FROM user where username=$1 AND password=$2',
                values: [username, password]
            };
            const result = await client.query(query);
            devolver = result.rows[0];
        }
        catch (error) {
            console.log("error en repo event loc crear");
        }
        return devolver;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user-repository.js.map