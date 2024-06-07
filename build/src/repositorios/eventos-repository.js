"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const pg_1 = __importDefault(require("pg"));
const bd_1 = require("../repositorios/bd");
const client = new pg_1.default.Client(bd_1.config);
console.log('config', bd_1.config);
client.connect();
class EventRepository {
    async getAllEvents(name, cat, fecha, tag, pageSize, requestedPage, queryWhere) {
        console.log("llego a getAllEvents");
        const query1 = `SELECT e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.max_assistance FROM events e
        LEFT JOIN event_categories ON e.id_event_category = event_categories.id
        LEFT JOIN event_tags ON event_tags.id_event = e.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        ` + queryWhere;
        const query2 = `select count(*) from events`;
        try {
            console.log("llega a la query1");
            const { rows: resultado1 } = await client.query(query1);
            console.log("llega a query2");
            const { rows: resultado2 } = await client.query(query2);
            return [resultado1, resultado2];
        }
        catch (_a) {
            console.log("Error en query");
            return ("Query Error");
        }
    }
    async getEventById(id) {
        console.log("ESTOY EN EVENTOS-REPOSITORY con id: ", id);
        const queryId = `SELECT e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.max_assistance, l.name, pr.name, tg.name, ec.name FROM events e
        LEFT JOIN locations l ON e.id_event_location = l.id
        LEFT JOIN provinces pr ON l.id_province = pr.id

        LEFT JOIN event_tags et ON e.id = et.id_event

        LEFT JOIN tags tg ON et.id_tag = tg.id

        LEFT JOIN event_categories ec ON e.id_event_category = ec.id
        LEFT JOIN users u ON e.id_creator_user = u.id
        WHERE e.id = ${id}`;
        let retornar = null;
        try {
            console.log("llega a la query1");
            const { rows: result } = await client.query(queryId);
            if (result.length > 0) {
                retornar = result[0];
            }
        }
        catch (_a) {
            console.log("Error en query");
        }
        console.log(retornar);
        return retornar;
    }
    async getParticipants(id, limit, offset, queryWhere) {
        console.log("llega a getParticipant repository");
        const queryParticipants = `SELECT er.*,u.first_name,u.last_name,u.username,e.name FROM event_enrollments er
        LEFT JOIN users u ON er.id_user = u.id
        LEFT JOIN events e ON er.id_event = e.id 
		LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags ON et.id = tags.id
        WHERE e.id = ${id}` + queryWhere;
        const query2 = `select count(*) from event_enrollments`;
        try {
            console.log("llega a la query1");
            const { rows: participants } = await client.query(queryParticipants);
            console.log(participants);
            console.log("llega a query2");
            const { rows: countParticipants } = await client.query(query2);
            return [participants, countParticipants];
        }
        catch (_a) {
            console.log("Error en query");
            return ("Query Error");
        }
    }
    async createEvent(eventito) {
        const query = {
            text: 'INSERT INTO events (name,description,id_event_category,id_event_location, start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance,id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)',
            values: [eventito.name, eventito.description, eventito.id_event_category, eventito.id_event_location, eventito.start_date, eventito.duration_in_minutes, eventito.price, eventito.enabled_for_enrollment, eventito.max_assistance, eventito.id_creator_user]
        };
        const query2 = 'SELECT * FROM events WHERE title = ${eventito.name}';
        let retornar = null;
        try {
            console.log("llega a la query1");
            const { rows: seCreo } = await client.query(query);
            console.log(seCreo);
            const { rows: eventoCreado } = await client.query(query2);
            console.log(eventoCreado);
            retornar = eventoCreado;
        }
        catch (_a) {
            console.log("Error en query, no se pudo crear el evento");
        }
        return retornar;
    }
    async getMaxCapacity(id) {
        const query = `SELECT max_capacity FROM event_locations WHERE id = '${id}'`;
        const retornado = await client.query(query);
        return retornado;
    }
    async updateEvent(eventito, userId) {
        const query = `UPDATE events 
        SET name= '${eventito.name}', 
        description= '${eventito.description}',
        id_event_category= ${eventito.id_event_category},
        id_event_location= ${eventito.id_event_location},
        start_date= '${eventito.start_date}', 
        duration_in_minutes =${eventito.duration_in_minutes},
        price=${eventito.price}, 
        enabled_for_enrollment=${eventito.enabled_for_enrollment},
        max_assistance=${eventito.max_assistance}, 
        WHERE id = ${eventito.id} AND id_creator_user = ${userId}; `;
        let retornar = null;
        try {
            console.log("llega a la query1");
            const { rows: seModifico } = await client.query(query);
            console.log(seModifico);
            retornar = seModifico;
        }
        catch (_a) {
            console.log("Error en query, no se pudo modificar el evento");
        }
        return retornar;
    }
    async deleteEvent(id) {
        const query = `DELETE FROM events WHERE id = ${id}`;
        const query2 = `SELECT * FROM events WHERE id = ${id}`;
        let retornar = null;
        try {
            console.log("llega a la query1");
            const { rows: chauEvento } = await client.query(query);
            console.log(chauEvento);
            const { rows: eventoMuerto } = await client.query(query2);
            console.log(eventoMuerto);
            retornar = eventoMuerto;
        }
        catch (_a) {
            console.log("Error en query, no se pudo eliminar el evento");
        }
        return retornar;
    }
    verificarExistenciaUsuario(id, username) {
        return true;
    }
    enrollUsuario(id, idUser, username) {
        return true;
    }
    patchFeedback(id, attended, observations, rating) {
        return "json";
    }
}
exports.EventRepository = EventRepository;
//# sourceMappingURL=eventos-repository.js.map