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
                text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
                values: [username, password]
            };
            devolver = await client.query(query);
            devolver = devolver.rows[0];
            console.log(devolver.rows[0]);
        }
        catch (error) {
            console.log("error en repo event loc crear");
        }
        return devolver;
    }
    async crearUsuario(fName, lName, username, password) {
        let devolver = null;
        try {
            let result = null;
            const verUsername = {
                text: 'SELECT * FROM users WHERE username= $1',
                values: [username]
            };
            const { rowCount } = await client.query(verUsername);
            if (rowCount === 0) {
                try {
                    const query = {
                        text: 'INSERT INTO users (first_name, last_name, username, password) VALUES ($1,$2,$3,$4) RETURNING *',
                        values: [fName, lName, username, password]
                    };
                    result = await client.query(query);
                    devolver = result.rows[0];
                }
                catch (error) {
                    console.log('register, error en insert');
                    throw new Error('Error invalido');
                }
            }
            else {
                throw new Error();
            }
        }
        catch (error) {
            if (error.message === 'Error inválido') {
                throw new Error('Pruebe otra vez');
            }
            console.log("error en repo regitro usuario");
            throw new Error('Usuario ya existente');
        }
        return devolver;
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user-repository.js.map