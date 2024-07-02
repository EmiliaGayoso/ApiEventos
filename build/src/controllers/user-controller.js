"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_service_1 = require("../servicios/user-service");
const router = express_1.default.Router();
const userService = new user_service_1.UserService();
router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    console.log(username, password);
    const token = await userService.verificarExistenciaUsuario(String(username), String(password));
    return res.json(token);
});
router.post("/register", async (req, res) => {
    const fName = req.body.first_name;
    const lName = req.body.last_name;
    const username = req.body.username;
    const password = req.body.password;
    console.log(fName, lName, username, password);
    try {
        const crearUsuario = await userService.crearUsuario(String(fName), String(lName), String(username), String(password));
        return res.json("El usuario fue creado exitosamente");
    }
    catch (error) {
        if (error.message === 'Bad Request') {
            return res.status(400).json({ message: 'El registro no cumplia con los requisitos de los campos' });
        }
        else if (error.message === 'Pruebe otra vez') {
            return res.json({ message: 'Pruebe otra vez' });
        }
        else if (error.message === 'Usuario ya existente') {
            return res.status(500).json({ message: 'Usuario ya existente, pruebe otra vez' });
        }
        return res.json('Error, pruebe otra vez');
    }
});
exports.default = router;
//# sourceMappingURL=user-controller.js.map