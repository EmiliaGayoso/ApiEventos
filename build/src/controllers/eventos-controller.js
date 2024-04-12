"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventos_service_1 = require("../servicios/eventos-service");
const router = express_1.default.Router();
const eventService = new eventos_service_1.EventService();
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
        const allEvent = eventService.getAllEventos(Number(limit), Number(offset), String(name), String(cat), new Date(fechaString), String(tag));
        return res.json(allEvent);
    }
    catch (error) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.get("/:id", (req, res) => {
    try {
        const event = eventService.getEventoById(Number(req.params.id));
        return res.json(event);
    }
    catch (error) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.post("/:id/enrollment", (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const username = req.query.username;
    const attended = req.query.attended;
    const rating = req.query.rating;
    try {
        const event = eventService.getParticipants(Number(limit), Number(offset), Number(req.params.id), String(first_name), String(last_name), String(username), Boolean(attended), Number(rating));
        return res.json(event);
    }
    catch (_a) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
exports.default = router;
//# sourceMappingURL=eventos-controller.js.map