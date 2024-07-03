"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventos_service_1 = require("../servicios/eventos-service");
const authMiddleware_1 = require("../auth/authMiddleware");
const Pagination_1 = require("../entities/Pagination");
const Eventos_1 = __importDefault(require("../entities/Eventos"));
const router = express_1.default.Router();
const eventService = new eventos_service_1.EventService();
const pag = new Pagination_1.Pagination();
router.get("/", async (req, res) => {
    console.log("event 2 y 3");
    const limit = pag.parseLimit(req.query.limit);
    const offset = pag.parseOffset(req.query.offset);
    const url = "api/event";
    const name = req.query.name;
    const cat = req.query.category;
    const fecha = req.query.startDate;
    console.log(fecha);
    const tag = req.query.tag;
    try {
        const allEvent = await eventService.getAllEventos(req.path, String(url), Number(limit !== null && limit !== void 0 ? limit : 0), Number(offset !== null && offset !== void 0 ? offset : 0), String(name !== null && name !== void 0 ? name : ''), String(cat !== null && cat !== void 0 ? cat : ''), String(fecha !== null && fecha !== void 0 ? fecha : ''), String(tag !== null && tag !== void 0 ? tag : ''));
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
        console.log("Un Error en get by id controller");
        if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'El ID ingresado no corresponde a ningún evento' });
        }
        else {
            return res.json({ message: error.message });
        }
    }
});
router.get("/:id/enrollment", async (req, res) => {
    var _a;
    console.log("llego al de enrollment");
    const limit = req.query.limit;
    const offset = req.query.offset;
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const username = req.query.username;
    const attended = req.query.attended;
    const rating = req.query.rating;
    try {
        const event = await eventService.getParticipants(Number(limit), Number(offset), Number((_a = req.params.id) !== null && _a !== void 0 ? _a : 1), String(first_name !== null && first_name !== void 0 ? first_name : ''), String(last_name !== null && last_name !== void 0 ? last_name : ''), String(username !== null && username !== void 0 ? username : ''), Boolean(attended !== null && attended !== void 0 ? attended : 'true'), Number(rating !== null && rating !== void 0 ? rating : '5'));
        return res.json(event);
    }
    catch (_b) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.post("/", authMiddleware_1.AuthMiddleware, async (req, res) => {
    const eventito = new Eventos_1.default();
    eventito.name = req.body.name;
    eventito.description = req.body.description;
    eventito.id_event_category = req.body.id_event_category;
    eventito.id_event_location = req.body.id_event_location;
    eventito.start_date = req.body.start_date;
    eventito.duration_in_minutes = req.body.duration_in_minutes;
    eventito.price = req.body.price;
    eventito.enabled_for_enrollment = req.body.enabled_for_enrollment;
    eventito.max_assistance = req.body.max_assistance;
    eventito.id_creator_user = req.user.id;
    console.log(req.user.id);
    const user = req.user;
    try {
        const createdEvent = await eventService.createEvent(eventito);
        return res.status(201).json({
            message: "Evento creado correctamente",
            data: createdEvent,
        });
    }
    catch (error) {
        if (error.message === 'Bad Request') {
            return res.status(400).json({ message: "Error al completar los campos." });
        }
        console.error("Error creating event:", error);
        return res.json({ message: error.message });
    }
});
router.put("/", authMiddleware_1.AuthMiddleware, async (req, res) => {
    const eventito = req.body;
    const userId = req.user.id;
    try {
        const updatedEvent = await eventService.updateEvent(eventito, Number(userId));
        return res.status(201).json({
            message: "Evento modificado correctamente",
            data: updatedEvent,
        });
    }
    catch (error) {
        if (error.message === 'Bad Request') {
            return res.status(400).json({ message: "Error al completar los campos." });
        }
        else if (error.message === 'Not Found') {
            return res.status(404).json({ message: "El evento que busca modificar no existe o no tienen ese ID" });
        }
        console.error("Error modificando event:", error);
        return res.json({ message: error.message });
    }
});
router.delete("/:id", authMiddleware_1.AuthMiddleware, async (req, res) => {
    const id = req.params.id;
    const userId = req.user.id;
    console.log(userId);
    try {
        await eventService.deleteEvent(Number(id), Number(userId));
        return res.status(200).send({ valido: "evento eliminado correctamente" });
    }
    catch (error) {
        if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'El ID ingresado no corresponde a ningún evento de su dominio' });
        }
        else if (error.message === 'Bad Request') {
            return res.status(400).send("El evento no se puede eliminar porque hay al menos 1 usuario inscripto");
        }
        return res.status(500);
    }
});
router.post("/:id/enrollment", authMiddleware_1.AuthMiddleware, async (req, res) => {
    const id = req.params.id;
    const idUser = req.user.id;
    try {
        const inscripto = await eventService.enrollUser(Number(id), Number(idUser));
        return res.status(201).json({ message: 'Te pudiste inscribir bien' });
    }
    catch (error) {
        if (error.message === 'Bad Request inscripto') {
            return res.status(400).json({ message: 'Ya estás inscripto al evento deseado' });
        }
        else if (error.message === 'Bad Request cerrado') {
            return res.status(400).json({ message: 'El evento al que quiere inscribirse no tiene la inscripción abierta' });
        }
        else if (error.message === 'Bad Request agotado') {
            return res.status(400).json({ message: 'El evento al que quiere inscribirse ya no tiene cupos disponibles' });
        }
        else if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'El evento que busca no existe' });
        }
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.delete("/:id/enrollment", authMiddleware_1.AuthMiddleware, async (req, res) => {
    const id = req.params.id;
    const idUser = req.user.id;
    console.log(idUser);
    try {
        const eliminado = await eventService.deleteEnrollment(Number(id), Number(idUser));
        return res.status(200).json({ message: 'Se pudo eliminar su inscripción correctamente' });
    }
    catch (error) {
        if (error.message === 'Bad Request noInscripto') {
            return res.status(400).json({ message: 'No estás inscripto al evento deseado' });
        }
        else if (error.message === 'Bad Request pasado') {
            return res.status(400).json({ message: 'El evento al que quiere desinscribirse ya pasó' });
        }
        else if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'El evento al que quiere desinscribirse no existe' });
        }
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.patch("/:id/enrollment/:entero", authMiddleware_1.AuthMiddleware, async (req, res) => {
    const idEvent = req.params.id;
    const rating = req.params.entero;
    const observations = req.body.observations;
    const idUser = req.user.id;
    try {
        const feedback = await eventService.patchFeedback(Number(idEvent), Number(idUser), String(observations), Number(rating));
        return res.status(200).json("El feedback se pudo cargar de manera exitosa");
    }
    catch (error) {
        if (error.message === 'Not Found') {
            return res.status(404).json({ message: "El ID ingresado no corresponde a ningún evento" });
        }
        else if (error.message === 'Bad Request rating') {
            return res.status(400).json({ error: `El formato ingresado del rating es inválido` });
        }
        else if (error.message === 'Bad Request noInscripto') {
            return res.status(400).json({ message: "El usuario ingresado no está registrado en el evento seleccionado" });
        }
        else if (error.message === 'Bad Request noSucedio') {
            return res.status(400).json({ message: "El evento seleccionado no ha finalizado" });
        }
        return res.json("Un error en query");
    }
});
exports.default = router;
//# sourceMappingURL=eventos-controller.js.map