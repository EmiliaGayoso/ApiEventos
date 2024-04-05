"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
class EventRepository {
    getAllEvents(name, cat, fecha, tag, pageSize, requestedPage, queryBase) {
        const query = `SELECT * FROM events limit ${pageSize} offset ${requestedPage}
        LEFT JOIN event_categories ON event.id_event_category = event_categories.id
        LEFT JOIN event_tags ON event_tags.id_event = event.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        ` + queryBase;
        const query1 = `select count(*) from events`;
        return [query, query1];
    }
    getEventById(id) {
        const queryId = `SELECT events.* , location.*, provinces.*, event_categories.*, users.*, event_enrollments.*, event_tag.*, tags.* FROM events e
        
        LEFT JOIN location l ON e.id_location = l.id
        LEFT JOIN provinces p ON l.id_province = p.id

        LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags t ON et.id_tag = t.id

        LEFT JOIN event_categories ec ON e.id_event_category = ec.id

        LEFT JOIN user u ON e.id_creator_user = u.id

        LEFT JOIN location l ON e.id_location = l.id

        LEFT JOIN event_enrollments ee ON e.id = ee.id_event
        LEFT JOIN event_enrollments ee ON u.id = ee.id_user
        
        WHERE id = ${id}`;
    }
    getParticipants(id, fName, lName, username, attended, rating, queryWhere) {
        const query = `` + queryWhere;
    }
}
exports.EventRepository = EventRepository;
//# sourceMappingURL=eventos-repository.js.map