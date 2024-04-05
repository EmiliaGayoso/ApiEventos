"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const sql = "SELECT * FROM events";
class EventRepository {
    getAllEvents(name, cat, fecha, tag, pageSize, requestedPage) {
        const query = `select * from events limit ${pageSize} offset ${requestedPage} WHERE IF`;
        const query1 = `select count(*) from events`;
        return [query, query1];
    }
    getEeventName(name) {
    }
}
exports.EventRepository = EventRepository;
//# sourceMappingURL=eventos-repository.js.map