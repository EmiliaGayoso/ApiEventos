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
    getParticipants(limit, offset, queryWhere) {
        const query = `SELECT * FROM collection limit ${limit} offset ${offset}
        LEFT JOIN event_categories ON event.id_event_category = event_categories.id
        LEFT JOIN event_tags ON event_tags.id_event = event.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        ` + queryWhere;
        return;
    }
}
exports.EventRepository = EventRepository;
//# sourceMappingURL=eventos-repository.js.map