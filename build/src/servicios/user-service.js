"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_repository_1 = require("../repositorios/user-repository");
class UserService {
    verificarExistenciaUsuario(username, password) {
        const userRepository = new user_repository_1.UserRepository();
        const existe = userRepository.verificarExistencia(username, password);
        return true;
    }
    creacionToken(username) {
    }
    crearUsuario(fName, lName, username, password) {
        const userRepository = new user_repository_1.UserRepository();
        const creado = userRepository.crearUsuario(fName, lName, username, password);
        return true;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user-service.js.map