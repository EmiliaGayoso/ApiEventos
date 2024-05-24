"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../servicios/user-service");
const router = express_1.default.Router();
const userService = new user_service_1.UserService();
router.post("/login", (req, res) => {
    const { username, password } = req.body;
    const userExistence = userService.verificarExistenciaUsuario(String(username), String(password));
    console.log(username, password);
    if (userExistence != null) {
        const token = userService.creacionToken(String(username));
        return token;
    }
    else {
        console.log("error");
        return res.json("El usuario no fue encontrado");
    }
});
router.post("/register", (req, res) => {
    const { fName, lName, username, password } = req.body;
    console.log(fName, lName, username, password);
    const crearUsuario = userService.crearUsuario(String(fName), String(lName), String(username), String(password));
    if (crearUsuario === true) {
        return res.json("El usuario fue creado exitosamente");
    }
    else {
        return res.json("El usuario no se pudo crear");
    }
});
exports.default = router;
//# sourceMappingURL=user-controller.js.map