import { LocationRepository } from "../repositorios/location-repository";
import { Pagination } from "../entities/Pagination";
import Locaciones from "../entities/Locaciones";
const pag = new Pagination();

export class LocationService {
    async getAll(limit: number, offset: number, url: string, path: string){
        
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
        console.log("loc service get all");
        console.log(parsedLimit);
        const locationRepository = new LocationRepository();
        const [allLocations, cantidadLocations] = await locationRepository.getAll(parsedLimit, parsedOffset);
        const devolver = {
            collection: allLocations,

            pagination: pag.buildPagination(parsedLimit, parsedOffset, cantidadLocations, path, url),
        }
        return devolver;
    }

    async getByID(id: number){
        const locationRepository = new LocationRepository();
        let loc = null;
        try {
            loc = await locationRepository.getById(id);
        } catch (error) {
            console.log("error")
        }
        if (loc === null){
            throw new Error ('Not Found')
        }
        return loc;
    }

    async getAllEventLocations(id: number, limit: number, offset: number, url: string, path: string){
        const locationRepository = new LocationRepository();
        let eventLocations, countLocations = null;
        let devolver = null;
        try {
            [eventLocations, countLocations] = await locationRepository.getAllEventsLocations(id,limit,offset);
            devolver = {
                collection: eventLocations,
    
                pagination: pag.buildPagination(limit, offset, countLocations, path, url),
            }
            
        } catch (error) {
            console.log("error en location rep get all event");
        }
        if (eventLocations === null || eventLocations.rows.length === 0){
            throw new Error ('Not Found');
        }
        return devolver;
    }
}