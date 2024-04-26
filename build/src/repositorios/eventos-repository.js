"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
class EventRepository {
    getAllEvents(name, cat, fecha, tag, pageSize, requestedPage, queryWhere) {
        const query = `SELECT * FROM collection limit ${pageSize} offset ${requestedPage}
        LEFT JOIN event_categories ON event.id_event_category = event_categories.id
        LEFT JOIN event_tags ON event_tags.id_event = event.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        ` + queryWhere;
        const query1 = `select count(*) from events`;
        const collection = [
            {
                "id": 2,
                "name": "Taylor Swift",
                "description": "Un alto show",
                "start_date": "2024-03-21T03:00:00.000Z",
                "duration_in_minutes": 210,
                "price": "15500",
                "enabled_for_enrollment": true,
                "max_assistance": 120000,
                "tags": [
                    "Rock",
                    "Pop"
                ],
                "creator_user": {
                    "id": 3,
                    "username": "Jschiffer",
                    "first_name": "Julian",
                    "last_name": "Schiffer"
                },
                "event_category": {
                    "id": 1,
                    "name": "Musica"
                },
                "event_location": {
                    "id": 1,
                    "name": "River",
                    "full_address": "Av. Pres. Figueroa Alcorta 7597",
                    "latitude": -34.5453,
                    "longitude": -58.4498,
                    "max_capacity": "84567"
                }
            }
        ];
        return [collection];
    }
    getEventById(id) {
        const queryId = `SELECT event.*, location.*, provinces.*, event_categories.*, users.*, event_enrollments.*, event_tag.*, tags.* FROM events e
        
        LEFT JOIN location l ON e.id_location = l.id
        LEFT JOIN provinces p ON l.id_province = p.id

        LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags t ON et.id_tag = t.id

        LEFT JOIN event_categories ec ON e.id_event_category = ec.id

        LEFT JOIN user u ON e.id_creator_user = u.id

        LEFT JOIN location l ON e.id_location = l.id

        LEFT JOIN event_enrollments ee ON e.id = ee.id_event
        LEFT JOIN event_enrollments ee ON u.id = ee.id_user
        
        WHERE e.id = ${id}`;
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
    updateEvent(eventito, eventoId) {
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