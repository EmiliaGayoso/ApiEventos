"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationService = void 0;
const location_repository_1 = require("../repositorios/location-repository");
const Pagination_1 = require("../entities/Pagination");
const pag = new Pagination_1.Pagination();
class LocationService {
    async getAll(limit, offset, url, path) {
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
        const locationRepository = new location_repository_1.LocationRepository();
        const [allLocations, cantidadLocations] = await locationRepository.getAll(parsedLimit, parsedOffset);
        const devolver = {
            collection: allLocations,
            pagination: pag.buildPagination(limit, offset, cantidadLocations, path, url),
        };
        return devolver;
    }
    async getByID(id) {
        const locationRepository = new location_repository_1.LocationRepository();
        let loc = null;
        try {
            loc = await locationRepository.getById(id);
        }
        catch (error) {
            console.log("error");
        }
        if (loc.rows.length === 0) {
            throw new Error('Not Found');
        }
        return loc;
    }
    async getAllEventLocations(id, limit, offset, url, path) {
        const locationRepository = new location_repository_1.LocationRepository();
        let eventLocations, countLocations = null;
        let devolver = null;
        try {
            [eventLocations, countLocations] = await locationRepository.getAllEventsLocations(id, limit, offset);
            devolver = {
                collection: eventLocations,
                pagination: pag.buildPagination(limit, offset, countLocations, path, url),
            };
        }
        catch (error) {
            console.log("error en location rep get all event");
        }
        if (eventLocations === null || eventLocations.rows.length === 0) {
            throw new Error('Not Found');
        }
        return devolver;
    }
}
exports.LocationService = LocationService;
//# sourceMappingURL=location-service.js.map