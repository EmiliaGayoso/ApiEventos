"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const pg_1 = __importDefault(require("pg"));
const bd_js_1 = require("../repositorios/bd.js");
const user_repository_js_1 = require("../repositorios/user-repository.js");
const jwt_1 = require("../auth/jwt");
const client = new pg_1.default.Client(bd_js_1.config);
client.connect();
class UserService {
    async verificarExistenciaUsuario(username, password) {
        const userRepository = new user_repository_js_1.UserRepository();
        let userExistence;
        try {
            userExistence = await userRepository.verificarExistenciaUsuario(username, password);
            console.log("llega a service user login");
            console.log(userExistence);
        }
        catch (error) {
            console.log("Error");
        }
        if (userExistence !== null) {
            const token = (0, jwt_1.createToken)(userExistence);
            return token;
        }
        else {
            throw new Error("Usuario no existe");
        }
    }
    async crearUsuario(fName, lName, username, password) {
        const userRepository = new user_repository_js_1.UserRepository();
        const usuario = userRepository.crearUsuario(fName, lName, username, password);
        return usuario;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map