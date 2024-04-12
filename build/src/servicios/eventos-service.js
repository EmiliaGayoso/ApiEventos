"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const eventos_repository_1 = require("../repositorios/eventos-repository");
class EventService {
    getAllEventos(pageSize, requestedPage, name, cat, fecha, tag) {
        var queryWhere = ``;
        if (name) {
            queryWhere += `WHERE name ${name},`;
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
            queryWhere += `WHERE first_name ${fName},`;
        }
        if (lName) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND last_name = ${lName}`;
            }
            else {
                queryWhere += ` WHERE last_name = ${lName}`;
            }
            ;
        }
        if (username) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND username = ${username}`;
            }
            else {
                queryWhere += ` WHERE username = ${username}`;
            }
            ;
        }
        if (attended) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND attended = ${attended}`;
            }
            else {
                queryWhere += ` WHERE attended = ${attended}`;
            }
        }
        if (rating) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND rating = ${rating}`;
            }
            else {
                queryWhere += ` WHERE rating = ${rating}`;
            }
        }
        const eventRepository = new eventos_repository_1.EventRepository();
        const participants = eventRepository.getParticipants(limit, offset, queryWhere);
        return participants;
    }
}
exports.EventService = EventService;
//# sourceMappingURL=eventos-service.js.map