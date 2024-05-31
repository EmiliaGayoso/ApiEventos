"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const event_location_service_1 = require("../servicios/event-location-service");
const authMiddleware_1 = require("../auth/authMiddleware");
const router = express_1.default.Router();
const eventLocService = new event_location_service_1.EventLocationService();
router.get("/", authMiddleware_1.AuthMiddleware, async (req, res) => {
    const limit = req.query.pageSize;
    const offset = req.query.page;
    const url = req.originalUrl;
    try {
        const allEventLoc = await eventLocService.getAll(Number(limit), Number(offset), url);
        return res.status(200).json(allEventLoc);
    }
    catch (error) {
        console.log("Se encontró un error en event location controller");
        return res.json("Un Error");
    }
});
router.get("/:id", authMiddleware_1.AuthMiddleware, async (req, res) => {
    try {
        const eventLocBuscado = await eventLocService.getById(Number(req.params.id));
        return res.status(200).json(eventLocBuscado);
    }
    catch (error) {
        if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'El ID ingresado no corresponde a ningún evento. El usuario no está autenticado' });
        }
        else {
            return res.status(400).json({ message: error.message });
        }
    }
});
router.post("/", authMiddleware_1.AuthMiddleware, async (req, res) => {
    try {
        const user = req.user.id;
        const crear = req.body;
        const creda = await eventLocService.crearEventLoc(crear, user);
        return res.status(200).json(creda);
    }
    catch (error) {
        if (error.message === 'Bad Request') {
            return res.status(400).json({ message: 'Hubo un error en uno de los campos ingresados' });
        }
        return res.json(error.message);
    }
});
router.put("/", authMiddleware_1.AuthMiddleware, async (req, res) => {
    try {
        const user = req.user.id;
        const modificar = req.body;
        const modificada = await eventLocService.modificarEventLoc(modificar, user);
        return res.status(200).json(modificada);
    }
    catch (error) {
        if (error.message === 'Bad Request') {
            return res.status(400).json({ message: 'Hubo un error en uno de los campos ingresados' });
        }
        else if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'El ID ingresado no pertence a ninguna locación o no tienes la autorización para poder modificarla' });
        }
        return res.json(error.message);
    }
});
router.delete("/:id", authMiddleware_1.AuthMiddleware, async (req, res) => {
    try {
        const user = req.user.id;
        const eliminado = eventLocService.borrarEventLoc(Number(req.params.id), user);
        return res.status(200).json(eliminado);
    }
    catch (error) {
        if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'El ID ingresado no pertenece a ninguna locación o no tienes la autorización suficiente para poder eliminarla' });
        }
        return res.status(error.message);
    }
});
exports.default = router;
//# sourceMappingURL=event-location-controller.js.map