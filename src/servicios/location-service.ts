import { LocationRepository } from "../repositorios/location-repository";
import { Pagination } from "../entities/Pagination";
import Locaciones from "../entities/Locaciones";
const pag = new Pagination();

export class LocationService {
    async getAll(limit: number, offset: number, url: string){
        
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);

        const locationRepository = new LocationRepository();
        const [allLocations, cantidadLocations] = await locationRepository.getAll(parsedLimit, parsedOffset);
        const devolver = {
            collection: allLocations,

            pagination: {
                pageSize: parsedLimit,
                page: parsedOffset,
                nextPage: pag.buildNextPage(url,parsedLimit,parsedOffset),
                total: Number(cantidadLocations)
            }
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
        if (loc.rows.length === 0){
            throw new Error ('Not Found')
        }
        return loc;
    }

    async getAllEventLocations(id: number, limit: number, offset: number, url: string){
        const locationRepository = new LocationRepository();
        let eventLocations, countLocations = null;
        let devolver = null;
        try {
            [eventLocations, countLocations] = await locationRepository.getAllEventsLocations(id);
            devolver = {
                collection: eventLocations,
    
                pagination: {
                    pageSize: pag.parseLimit(limit),
                    page: pag.parseOffset(offset),
                    nextPage: pag.buildNextPage(url,pag.parseLimit(limit),pag.parseOffset(offset)),
                    total: Number(countLocations)
                }
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