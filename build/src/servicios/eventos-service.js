"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const eventos_repository_1 = require("../repositorios/eventos-repository");
const Pagination_1 = require("../entities/Pagination");
class EventService {
    async getAllEventos(path, url, limit, offset, name, cat, fecha, tag) {
        var queryWhere = ``;
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
        if (fecha) {
            if (queryWhere.includes("WHERE")) {
                queryWhere += ` AND start_date = '${fecha}'`;
            }
            else {
                queryWhere += ` WHERE start_date = '${fecha}'`;
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
        queryWhere += `ORDER BY e.id LIMIT ${limit} OFFSET ${offset}`;
        console.log("Despues de todas las query: ", queryWhere);
        const pag = new Pagination_1.Pagination();
        const eventRepository = new eventos_repository_1.EventRepository();
        const [allEvents, cantidadEvents] = await eventRepository.getAllEvents(name, cat, fecha, tag, limit, offset, queryWhere);
        const formattedEvents = allEvents.map(event => ({
            id: event.id,
            name: event.name,
            description: event.description,
            event_category: {
                id: event.id_event_category,
                name: event.category_name
            },
            event_location: {
                id: event.id_event_location,
                name: event.event_location_name,
                full_address: event.full_address,
                latitude: event.event_location_latitude,
                longitude: event.event_location_longitude,
                max_capacity: event.event_location_max_capacity,
                location: {
                    id: event.location_id,
                    name: event.location_name,
                    latitude: event.location_latitude,
                    longitude: event.location_longitude,
                    province: {
                        id: event.province_id,
                        name: event.province_name,
                        full_name: event.province_full_name,
                        latitude: event.province_latitude,
                        longitude: event.province_longitude,
                        display_order: event.province_display_order
                    }
                }
            },
            start_date: event.start_date,
            duration_in_minutes: event.duration_in_minutes,
            price: event.price,
            enabled_for_enrollment: event.enabled_for_enrollment,
            max_assistance: event.max_assistance,
            creator_user: {
                id: event.user_id,
                username: event.user_username,
                first_name: event.user_first_name,
                last_name: event.user_last_name
            },
            tags: event.tags ? event.tags.map(tag => ({
                id: tag.id,
                name: tag.name
            })) : []
        }));
        console.log(formattedEvents);
        const paginacionCreada = pag.buildPagination(limit, offset, cantidadEvents, path, url);
        console.log(paginacionCreada);
        const resultado = {
            collection: formattedEvents,
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
        const formattedEvents = {
            id: evento.id,
            name: evento.name,
            description: evento.description,
            event_category: {
                id: evento.id_event_category,
                name: evento.category_name
            },
            event_location: {
                id: evento.id_event_location,
                name: evento.event_location_name,
                full_address: evento.full_address,
                latitude: evento.event_location_latitude,
                longitude: evento.event_location_longitude,
                max_capacity: evento.event_location_max_capacity,
                location: {
                    id: evento.location_id,
                    name: evento.location_name,
                    latitude: evento.location_latitude,
                    longitude: evento.location_longitude,
                    province: {
                        id: evento.province_id,
                        name: evento.province_name,
                        full_name: evento.province_full_name,
                        latitude: evento.province_latitude,
                        longitude: evento.province_longitude,
                        display_order: evento.province_display_order
                    }
                }
            },
            start_date: evento.start_date,
            duration_in_minutes: evento.duration_in_minutes,
            price: evento.price,
            enabled_for_enrollment: evento.enabled_for_enrollment,
            max_assistance: evento.max_assistance,
            creator_user: {
                id: evento.user_id,
                username: evento.user_username,
                first_name: evento.user_first_name,
                last_name: evento.user_last_name
            },
            tags: evento.tags ? evento.tags.map(tag => ({
                id: tag.id,
                name: tag.name
            })) : []
        };
        console.log("ESTOY EN EVENTOS-SERVICE Y MANDO: ", formattedEvents);
        return formattedEvents;
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
            if (evento.message === 'Bad Request') {
                throw new Error('Bad Request');
            }
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
            if (evento.message === 'Bad Request') {
                throw new Error('Bad Request');
            }
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
    async enrollUser(id, idUser) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const buscada = await this.getEventoById(id);
        if (buscada === null) {
            throw new Error('Not Found');
        }
        let sePudo = null;
        try {
            sePudo = await eventRepository.enrollUsuario(id, idUser);
        }
        catch (error) {
            if (error.message === 'Bad Request inscripto') {
                throw new Error('Bad Request inscripto');
            }
            else if (error.message === 'Bad Request cerrado') {
                throw new Error('Bad Request cerrado');
            }
            else if (error.message === 'Bad Request agotado') {
                throw new Error('Bad Request agotado');
            }
        }
        return sePudo;
    }
    async deleteEnrollment(idEvent, idUser) {
        const eventRepository = new eventos_repository_1.EventRepository();
        let eliminado = null;
        const buscada = await this.getEventoById(idEvent);
        if (buscada === null) {
            throw new Error('Not Found');
        }
        try {
            eliminado = await eventRepository.eliminarEnrollment(idEvent, idUser);
        }
        catch (error) {
            if (error.message === 'Bad Request noInscripto') {
                throw new Error('Bad Request noInscripto');
            }
            else if (error.message === 'Bad Request cerrado') {
                throw new Error('Bad Request cerrado');
            }
        }
        return eliminado;
    }
    async patchFeedback(idEvent, idUser, observations, rating) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const buscada = await this.getEventoById(idEvent);
        if (!(Number(rating) >= 1 && Number(rating) <= 10)) {
            throw new Error('Bad Request rating');
        }
        else if (buscada === null) {
            throw new Error('Not Found');
        }
        let sePudo = null;
        try {
            sePudo = await eventRepository.ingresoFeedback(idEvent, idUser, observations, rating);
        }
        catch (error) {
            if (error.message === 'Bad Request noInscripto') {
                throw new Error('Bad Request noInscripto');
            }
            throw new Error('Query Error');
        }
        return sePudo;
    }
}
exports.EventService = EventService;
//# sourceMappingURL=eventos-service.js.map