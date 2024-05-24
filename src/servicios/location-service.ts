import { LocationRepository } from "../repositorios/location-repository";
import { Pagination } from "../entities/Pagination";
import Locaciones from "../entities/Locaciones";

export class LocationService {
    async getAll(limit: number, offset: number, url: string){
        
        const pag = new Pagination();
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
            loc = await locationRepository.getById(id);;
        } catch (error) {
            console.log("error")
        }
        if (loc === null){
            throw new Error ('Not Found')
        }
        return loc;
    }

    async getAllEventLocations(id: number){

    }
}