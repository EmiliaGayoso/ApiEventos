"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventos_service_1 = require("../servicios/eventos-service");
const router = express_1.default.Router();
const eventService = new eventos_service_1.EventService();
router.get("/", async (req, res) => {
    console.log("PAJARO LOCO");
    const limit = req.query.pageSize;
    const offset = req.query.page;
    const url = req.originalUrl;
    const name = req.query.name;
    const cat = req.query.category;
    const fecha = req.query.startDate;
    const tag = req.query.tag;
    const fechaString = String(fecha);
    let fecha2 = new Date(fechaString);
    let nuevaFecha = fecha2 && !isNaN(fecha2.getTime()) ? new Date(fecha2) : new Date();
    try {
        const allEvent = await eventService.getAllEventos(Number(limit !== null && limit !== void 0 ? limit : 0), Number(offset !== null && offset !== void 0 ? offset : 0), String(url !== null && url !== void 0 ? url : ''), String(name !== null && name !== void 0 ? name : ''), String(cat !== null && cat !== void 0 ? cat : ''), nuevaFecha, String(tag !== null && tag !== void 0 ? tag : ''));
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
        const event = await await eventService.getEventoById(Number(req.params.id));
        return res.json(event);
    }
    catch (error) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.post("/:id/enrollment", async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const username = req.query.username;
    const attended = req.query.attended;
    const rating = req.query.rating;
    try {
        const event = await eventService.getParticipants(Number(limit), Number(offset), Number(req.params.id), String(first_name), String(last_name), String(username), Boolean(attended), Number(rating));
        return res.json(event);
    }
    catch (_a) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.post("/", async (req, res) => {
    const eventito = req.body;
    const user = req.body;
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
    const user = req.body;
    try {
        const updatedEvent = await eventService.updateEvent(eventito, Number(eventoId), user);
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
router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const eventito = req.body;
    const user = req.body;
    if (eventService.deleteEvent(eventito, Number(id), user)) {
        return res.status(232).send({
            valido: "evento eliminado correctamente"
        });
    }
    return res.status(400).send("Error en los campos");
});
router.post("/:id/enrollment", async (req, res) => {
    const id = req.params.id;
    const idUser = req.body.id_user;
    const username = req.body.username;
    try {
        const usuarioExistente = await eventService.verificarExistenciaUsuario(Number(idUser), String(username));
        if (!usuarioExistente) {
            return res.status(405).json({ error: `El usuario ingresado es inválido` });
        }
        else {
            const event = await eventService.enrollUser(Number(id), Number(idUser), String(username));
        }
        return res.json("Te pudiste inscribir bien");
    }
    catch (_a) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.patch("/:id/enrollment", async (req, res) => {
    const id = req.params.id;
    const attended = req.body.attended;
    const rating = req.body.rating;
    const observations = req.body.observations;
    try {
        if (attended == 0 && !(Number.isInteger(Number(rating)))) {
            return res.status(405).json({ error: `El formato ingresado es inválido` });
        }
        const feedback = await eventService.patchFeedback(Number(id), Number(attended), String(observations), Number(rating));
        return res.json("El feedback se pudo cargar de manera exitosa");
    }
    catch (_a) {
        console.log("Un error");
        return res.json("Un error");
    }
});
exports.default = router;
//# sourceMappingURL=eventos-controller.js.map