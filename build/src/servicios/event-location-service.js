"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventLocationService = void 0;
const event_location_repository_1 = require("../repositorios/event-location-repository");
const Pagination_1 = require("../entities/Pagination");
const eventLocRepository = new event_location_repository_1.EventLocationRepository();
class EventLocationService {
    async getAll(limit, offset, url, path) {
        const pag = new Pagination_1.Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
        const [allEventLoc, cantidadEventLoc] = await eventLocRepository.getAll(limit, offset);
        const devolver = {
            collection: allEventLoc,
            pagination: pag.buildPagination(parsedLimit, parsedOffset, cantidadEventLoc, path, url),
        };
        return devolver;
    }
    async getById(id) {
        let buscada = null;
        try {
            buscada = await eventLocRepository.getById(id);
        }
        catch (error) {
            console.log("erros en event loc service getbyid");
        }
        if (buscada.rows.length === 0) {
            throw new Error('Not Found');
        }
        return buscada;
    }
    async crearEventLoc(eventIngresado, user) {
        let crear = null;
        if ((eventIngresado.name || eventIngresado.full_address) === null || (eventIngresado.name || eventIngresado.full_address).length <= 3 || eventIngresado.id_location === null || eventIngresado.max_capacity <= 0) {
            throw new Error('Bad Request');
        }
        try {
            crear = await eventLocRepository.crearEventLoc(eventIngresado, user);
        }
        catch (error) {
            console.log("error en crear event loc");
        }
        return crear;
    }
    async modificarEventLoc(eventModificar, user) {
        let modificar = null;
        if ((eventModificar.name || eventModificar.full_address) === null || (eventModificar.name || eventModificar.full_address).length <= 3 || eventModificar.id_location === null || eventModificar.max_capacity <= 0) {
            throw new Error('Bad Request');
        }
        try {
            modificar = await eventLocRepository.modificarEventLoc(eventModificar, user);
        }
        catch (error) {
            console.log("error en modificar evento loc");
        }
        if (modificar.rows.length === 0) {
            throw new Error('Not Found');
        }
        return modificar;
    }
    async borrarEventLoc(id, user) {
        let eliminar = null;
        try {
            eliminar = await eventLocRepository.borrarEventLoc(id, user);
        }
        catch (error) {
            console.log("error en service borrar evento loc");
        }
        if (eliminar.rows.length === 0) {
            throw new Error('Not Found');
        }
    }
}
exports.EventLocationService = EventLocationService;
//# sourceMappingURL=event-location-service.js.map