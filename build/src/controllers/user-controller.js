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
router.post("/register", (req, res) => {
    const { fName, lName, username, password } = req.body;
    console.log(fName, lName, username, password);
    const crearUsuario = userService.crearUsuario(String(fName), String(lName), String(username), String(password));
    if (crearUsuario) {
        return res.json("El usuario fue creado exitosamente");
    }
    else {
        return res.json("El usuario no se pudo crear");
    }
});
exports.default = router;
//# sourceMappingURL=user-controller.js.map