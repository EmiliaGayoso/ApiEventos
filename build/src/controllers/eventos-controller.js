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
    console.log("PAJARO LOCO");
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
router.get("/:id", async (req, res) => {
    console.log("ESTOY EN EVENTOS-CONTROLLER");
    try {
        const event = await eventService.getEventoById(Number(req.params.id));
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
router.post("/", async (req, res) => {
    const eventito = req.body;
    try {
        const createdEvent = await eventService.createEvent(eventito);
        return res.status(201).json({
            message: "Evento creado correctamente",
            data: createdEvent,
        });
    }
    catch (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({ message: "Error creando evento" });
    }
});
router.put("/:id", async (req, res) => {
    const eventoId = req.params.id;
    const eventito = req.body;
    try {
        const updatedEvent = await eventService.updateEvent(eventito, Number(eventoId));
        return res.status(201).json({
            message: "Evento creado correctamente",
            data: updatedEvent,
        });
    }
    catch (error) {
        console.error("Error creating event:", error);
        return res.status(500).json({ message: "Error creando evento" });
    }
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    if (eventService.deleteEvent(Number(id))) {
        return res.status(232).send({
            valido: "evento eliminado correctamente"
        });
    }
    return res.status(400).send("Error en los campos");
});
router.post("/:id/enrollment", (req, res) => {
    const id = req.params.id;
    const idUser = req.body.id_user;
    const username = req.body.username;
    try {
        const usuarioExistente = eventService.verificarExistenciaUsuario(Number(idUser), String(username));
        if (!usuarioExistente) {
            return res.status(405).json({ error: `El usuario ingresado es inválido` });
        }
        else {
            const event = eventService.enrollUser(Number(id), Number(idUser), String(username));
        }
        return res.json("Te pudiste inscribir bien");
    }
    catch (_a) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.patch("/:id/enrollment", (req, res) => {
    const id = req.params.id;
    const attended = req.body.attended;
    const rating = req.body.rating;
    const observations = req.body.observations;
    try {
        if (attended == 0 && !(Number.isInteger(Number(rating)))) {
            return res.status(405).json({ error: `El formato ingresado es inválido` });
        }
        const feedback = eventService.patchFeedback(Number(id), Number(attended), String(observations), Number(rating));
        return res.json("El feedback se pudo cargar de manera exitosa");
    }
    catch (_a) {
        console.log("Un error");
        return res.json("Un error");
    }
});
exports.default = router;
//# sourceMappingURL=eventos-controller.js.map