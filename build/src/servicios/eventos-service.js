"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const eventos_repository_1 = require("../repositorios/eventos-repository");
class EventService {
    getAllEventos(pageSize, requestedPage, name, cat, fecha, tag) {
        var queryWhere = ``;
        if (name) {
            queryWhere += `WHERE name = ${name},`;
        }
        if (cat) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND event_categories.category = ${cat}`;
            }
            else {
                queryWhere += ` WHERE event_categories.category = ${cat}`;
            }
            ;
        }
        if (fecha) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND startDate = ${fecha}`;
            }
            else {
                queryWhere += ` WHERE startDate = ${fecha}`;
            }
            ;
        }
        if (tag) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND tags.tag = ${tag}`;
            }
            else {
                queryWhere += ` WHERE tags.tag = ${tag}`;
            }
        }
        const eventRepository = new eventos_repository_1.EventRepository();
        const [allEvents, cantidadEvents] = eventRepository.getAllEvents(name, cat, fecha, tag, pageSize, requestedPage, queryWhere);
        return {
            collection: allEvents,
            pagination: {
                limit: pageSize,
                offset: requestedPage,
                nextPage: "http://localhost:5050/event?limit=15&offset=1",
                total: cantidadEvents,
            },
        };
    }
    getEventoById(id) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const evento = eventRepository.getEventById(id);
        return evento;
    }
    getParticipants(limit, offset, id, fName, lName, username, attended, rating) {
        var queryWhere = ``;
        if (fName) {
            queryWhere += `AND u.first_name = ${fName},`;
        }
        if (lName) {
            queryWhere += ` AND u.last_name = ${lName}`;
        }
        if (username) {
            queryWhere += ` AND u.username = ${username}`;
        }
        if (attended) {
            queryWhere += ` AND er.attended = ${attended}`;
        }
        if (rating) {
            queryWhere += ` AND er.rating = ${rating}`;
        }
        const eventRepository = new eventos_repository_1.EventRepository();
        const participants = eventRepository.getParticipants(id, limit, offset, queryWhere);
        return participants;
    }
    createEvent(eventito) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const evento = eventRepository.createEvent(eventito);
        return evento;
    }
    updateEvent(eventito, eventoId) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const evento = eventRepository.updateEvent(eventito, eventoId);
        return evento;
    }
    deleteEvent(id) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const evento = eventRepository.deleteEvent(id);
        return evento;
    }
    verificarExistenciaUsuario(idUser, username) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const user = eventRepository.verificarExistenciaUsuario(idUser, username);
        return user;
    }
    enrollUser(id, idUser, username) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const sePudo = eventRepository.enrollUsuario(id, idUser, username);
        return sePudo;
    }
    patchFeedback(id, attended, observations, rating) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const sePudo = eventRepository.patchFeedback(id, attended, observations, rating);
        return sePudo;
    }
}
exports.EventService = EventService;
//# sourceMappingURL=eventos-service.js.map