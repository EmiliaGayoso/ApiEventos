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
        const query1 = `SELECT * FROM events
        LEFT JOIN event_categories ON events.id_event_category = event_categories.id
        LEFT JOIN event_tags ON event_tags.id_event = events.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        ` + queryWhere;
        const query2 = `select count(*) from events`;
        let resultado1 = '';
        let resultado2 = '';
        try {
            console.log("llega a la query1");
            resultado1 = await client.query(query1);
            console.log("llega a query2");
            resultado2 = await client.query(query2);
        }
        catch (_a) {
            console.log("Error en query");
        }
        return [resultado1, resultado2];
    }
    getEventById(id) {
        console.log("ESTOY EN EVENTOS-REPOSITORY con id: ", id);
        const queryId = `SELECT e.*, l.*, pr.*, et.*, u.*, ee.*, tg.* FROM events e
        LEFT JOIN locations l ON e.id_event_location = l.id
        LEFT JOIN provinces pr ON l.id_province = pr.id

        LEFT JOIN event_tags et ON e.id = et.id_event

        LEFT JOIN tags tg ON et.id_tag = tg.id

        LEFT JOIN event_categories ec ON e.id_event_category = ec.id
        LEFT JOIN users u ON e.id_creator_user = u.id

        LEFT JOIN event_enrollments ee ON e.id = ee.id_event
        LEFT JOIN event_enrollments ON u.id = ee.id_user 
        WHERE e.id = ${id}`;
        const values = client.query(queryId);
        console.log(values);
        return values;
    }
    getParticipants(id, limit, offset, queryWhere) {
        const query = `SELECT event_enrollment.*,u.first_name,u.last_name,u.username,e.name FROM event_enrollment er limit ${limit} offset ${offset}
        LEFT JOIN users u ON er.id_user = u.id
        LEFT JOIN events e ON er.id_event = e.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        WHERE e.id = ${id}` + queryWhere;
        return;
    }
    createEvent(eventito) {
        const query = `INSERT INTO events (name,description,id_event_category,id_event_location, start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance,id_creator_user)
        VALUES (${eventito.name},${eventito.description},${eventito.id_event_category},${eventito.id_event_location}, ${eventito.start_date},${eventito.duration_in_minutes},${eventito.price},${eventito.enabled_for_enrollment},${eventito.max_assistance},${eventito.id_creator_user}); `;
        const query2 = `SELECT * FROM events WHERE title = ${name}`;
        if (query2 != null) {
            return true;
        }
        else {
            return false;
        }
    }
    async updateEvent(eventito, eventoId) {
        const query = `UPDATE events 
        SET name=${eventito.name}, 
        description=${eventito.description},
        id_event_category=${eventito.id_event_category},
        id_event_location=${eventito.id_event_location},
        start_date= ${eventito.start_date}, 
        duration_in_minutes =${eventito.duration_in_minutes},
        price=${eventito.price}, 
        enabled_for_enrollment=${eventito.enabled_for_enrollment},
        max_assistance=${eventito.max_assistance},
        id_creator_user=${eventito.id_creator_user}); 
        WHERE id = ${eventoId}; `;
        const query2 = `SELECT * FROM events WHERE id = ${eventoId}}`;
        const { rows: categoryRows } = await client.query(query2);
        if (query2 != null) {
            return true;
        }
        else {
            return false;
        }
    }
    deleteEvent(id) {
        const query = `DELETE * FROM events WHERE id = ${id}`;
        const query2 = `SELECT * FROM events WHERE id = ${id}`;
        if (query2 == null) {
            return true;
        }
        else {
            return false;
        }
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