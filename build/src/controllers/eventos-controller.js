"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventos_service_1 = require("../servicios/eventos-service");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const name = req.query.name;
    const cat = req.query.cat;
    const fecha = req.query.fecha;
    const tag = req.query.tag;
    const fechaString = String(fecha);
    new Date(fechaString);
    try {
        const eventService = new eventos_service_1.EventService();
        const allEvent = eventService.getAllEventos(Number(limit), Number(offset), String(name), String(cat), new Date(fechaString), String(tag));
        return res.json(allEvent);
    }
    catch (error) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.get("/", (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const name = req.query.name;
    try {
        const eventService = new eventos_service_1.EventService();
        const eventWithName = eventService.getEventoNombre(String(name));
        return res.json(eventWithName);
    }
    catch (error) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.get("/", (req, res) => {
});
router.get("/", (req, res) => {
});
router.get("/:id", (req, res) => {
});
router.post("/:id/enrollment", (req, res) => {
});
exports.default = router;
//# sourceMappingURL=eventos-controller.js.map