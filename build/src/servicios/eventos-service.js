"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventService = void 0;
const eventos_repository_1 = require("../repositorios/eventos-repository");
class EventService {
    getAllEventos(pageSize, requestedPage, name, cat, fecha, tag) {
        const eventRepository = new eventos_repository_1.EventRepository();
        const [allEvents, cantidadEvents] = eventRepository.getAllEvents(name, cat, fecha, tag, pageSize, requestedPage);
        return {
            collection: "query",
            pagination: {
                limit: pageSize,
                offset: requestedPage,
                nextPage: "http://localhost:3000/event?limit=15&offset=1",
                total: "query1",
            },
        };
    }
    getEventoNombre(name) {
        return {
            collection: "query",
            pagination: {
                nextPage: "http://localhost:3000/event?limit=15&offset=1",
                total: "query1",
            },
        };
    }
}
exports.EventService = EventService;
//# sourceMappingURL=eventos-service.js.map