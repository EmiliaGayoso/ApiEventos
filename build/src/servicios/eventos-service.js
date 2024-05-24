"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const eventos_repository_1 = require("../repositorios/eventos-repository");
const Pagination_1 = require("../entities/Pagination");
class EventService {
    async getAllEventos(limit, offset, url, name, cat, fecha, tag) {
        var queryWhere = ``;
        console.log(limit);
        console.log(offset);
        console.log(url);
        console.log(name);
        console.log(cat);
        console.log(fecha);
        console.log(tag);
        let fechaNew = fecha.toISOString().split('T')[0];
        let currentDate = new Date();
        if (name) {
            queryWhere += `WHERE events.name ILIKE '%${name}%'`;
        }
        if (cat) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND event_categories.name = '${cat}'`;
            }
            else {
                queryWhere += ` WHERE event_categories.name = '${cat}'`;
            }
            ;
        }
        if (!(fechaNew === currentDate.toISOString().split('T')[0])) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND startDate = '${fecha}'`;
            }
            else {
                queryWhere += ` WHERE startDate = '${fecha}'`;
            }
            ;
        }
        if (tag) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND tags.name = '${tag}'`;
            }
            else {
                queryWhere += ` WHERE tags.name = '${tag}'`;
            }
        }
        console.log("Despues de todas las query: ", queryWhere);
        const pag = new Pagination_1.Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
        const eventRepository = new eventos_repository_1.EventRepository();
        const [allEvents, cantidadEvents] = await eventRepository.getAllEvents(name, cat, fecha, tag, parsedLimit, parsedOffset, queryWhere);
        const resultado = {
            collection: allEvents,
            pagination: {
                limit: parsedLimit,
                offset: parsedOffset,
                nextPage: ((offset + 1) * limit <= Number(cantidadEvents)) ? null : process.env.URL_BASE,
                total: Number(cantidadEvents)
            }
        };
        return resultado;
        ;
    }
    async getEventoById(id) {
        console.log(id);
        const eventRepository = new eventos_repository_1.EventRepository();
        const evento = await eventRepository.getEventById(id);
        const returnEntity = evento.rows[0];
        console.log("ESTOY EN EVENTOS-SERVICE Y MANDO: ", returnEntity);
        return returnEntity;
    }
    async getParticipants(limit, offset, id, fName, lName, username, attended, rating) {
        var queryWhere = ``;
        console.log("llega a getParticipant service");
        console.log(fName);
        console.log(lName);
        console.log(username);
        console.log(attended);
        console.log(rating);
        const pag = new Pagination_1.Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
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
        console.log(queryWhere);
        const [participants, countParticipants] = await eventRepository.getParticipants(id, parsedLimit, parsedOffset, queryWhere);
        const resultado = {
            collection: participants,
            pagination: {
                limit: parsedLimit,
                offset: parsedOffset,
                nextPage: ((offset + 1) * limit <= Number(countParticipants)) ? null : process.env.URL_BASE,
                total: Number(countParticipants)
            }
        };
        return resultado;
        return participants;
    }
    async createEvent(eventito) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const evento = await eventRepository.createEvent(eventito);
        return evento;
    }
    async updateEvent(eventito, eventoId, user_id) {
        const eventRepository = new eventos_repository_1.EventRepository();
        if (eventito.id_creator_user = user_id) {
            const evento = await eventRepository.updateEvent(eventito, eventoId);
            return evento;
        }
        else {
            return null;
        }
    }
    async deleteEvent(eventito, id, user_id) {
        const eventRepository = new eventos_repository_1.EventRepository();
        if (eventito.id_creator_user = user_id) {
            const eliminado = await eventRepository.deleteEvent(id);
            return eliminado;
        }
        else {
            return null;
        }
    }
    verificarExistenciaUsuario(idUser, username) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const user = eventRepository.verificarExistenciaUsuario(idUser, username);
        return user;
    }
    async enrollUser(id, idUser, username) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const sePudo = await eventRepository.enrollUsuario(id, idUser, username);
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