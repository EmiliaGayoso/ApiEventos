"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const eventos_repository_1 = require("../repositorios/eventos-repository");
const Pagination_1 = require("../entities/Pagination");
class EventService {
    async getAllEventos(path, url, limit, offset, name, cat, fecha, tag) {
        var queryWhere = ``;
        let fechaNew = fecha.toISOString().split(' ')[0];
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
        queryWhere += `LIMIT ${limit} OFFSET ${offset}`;
        console.log("Despues de todas las query: ", queryWhere);
        const pag = new Pagination_1.Pagination();
        const eventRepository = new eventos_repository_1.EventRepository();
        const [allEvents, cantidadEvents] = await eventRepository.getAllEvents(name, cat, fecha, tag, limit, offset, queryWhere);
        const paginacionCreada = pag.buildPagination(limit, offset, cantidadEvents, path, url);
        console.log(paginacionCreada);
        const resultado = {
            collection: allEvents,
            pagination: paginacionCreada
        };
        return resultado;
    }
    async getEventoById(id) {
        console.log(id);
        const eventRepository = new eventos_repository_1.EventRepository();
        const evento = await eventRepository.getEventById(id);
        if (evento === null) {
            throw new Error('Not Found');
        }
        const returnEntity = evento;
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
        let evento = null;
        console.log('Id event loc: ', eventito.id_event_location);
        const maxCapacityLoc = eventRepository.getMaxCapacity(eventito.id_event_location);
        if ((eventito.description || eventito.name) === null || (eventito.description || eventito.name).length <= 3 || eventito.max_assistance > Number(maxCapacityLoc)) {
            throw new Error('Bad Request');
        }
        try {
            console.log('llega al try de event service create');
            evento = await eventRepository.createEvent(eventito);
        }
        catch (error) {
            console.log("error en evento service creat");
        }
        return evento;
    }
    async updateEvent(eventito, userId) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const maxCapacityLoc = eventRepository.getMaxCapacity(eventito.id_event_location);
        const buscada = await this.getEventoById(eventito.id);
        if ((eventito.description || eventito.name) === null || (eventito.description.length || eventito.name.length) <= 3 || eventito.max_assistance > Number(maxCapacityLoc)) {
            throw new Error('Bad Request');
        }
        else if (buscada === null) {
            throw new Error('Not Found');
        }
        let evento = null;
        try {
            evento = await eventRepository.updateEvent(eventito, userId);
        }
        catch (error) {
            console.log("error al modificar evento en service");
        }
        return evento;
    }
    async deleteEvent(id, user_id) {
        const eventRepository = new eventos_repository_1.EventRepository();
        let eliminado = null;
        eliminado = await eventRepository.deleteEvent(id, user_id);
        console.log('pasa el eliminar');
        if (eliminado === null) {
            throw new Error('Not Found');
        }
        else if (eliminado.message === 'Bad Request') {
            throw new Error('Bad Request');
        }
        return eliminado;
    }
    async enrollUser(id, idUser, username) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const sePudo = await eventRepository.enrollUsuario(id, idUser, username);
        return sePudo;
    }
    patchFeedback(id, observations, rating) {
        const eventRepository = new eventos_repository_1.EventRepository();
        let sePudo = null;
        try {
        }
        catch (error) {
        }
        return sePudo;
    }
}
exports.EventService = EventService;
//# sourceMappingURL=eventos-service.js.map