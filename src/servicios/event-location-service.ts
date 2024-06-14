import { EventLocationRepository } from "../repositorios/event-location-repository";
import { Pagination } from "../entities/Pagination";
import EventLocaciones from "../entities/Eventos-Locaciones";

const eventLocRepository = new EventLocationRepository();

export class EventLocationService {
    async getAll(limit: number, offset: number, url: string, path: string){
        const pag = new Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset); 

        const [allEventLoc, cantidadEventLoc] = await eventLocRepository.getAll(parsedLimit, parsedOffset);
        const devolver = {
            collection: allEventLoc,

            pagination: pag.buildPagination(parsedLimit, parsedOffset, cantidadEventLoc, path, url),
        }
        return devolver;
    }

    async getById(id: number){
        let buscada = null;
        try {
            buscada = await eventLocRepository.getById(id)
        } catch (error) {
            console.log("erros en event loc service getbyid");
        }
        if(buscada === null){
            throw new Error ('Not Found');
        }
        return buscada;
    }

    async crearEventLoc(eventIngresado: EventLocaciones, user: number){
        let crear = null;
        if((eventIngresado.name || eventIngresado.full_address) === null || (eventIngresado.name || eventIngresado.full_address).length <= 3 || eventIngresado.id_location === null || eventIngresado.max_capacity <= 0){
            throw new Error('Bad Request');
        }
        try {
            crear = await eventLocRepository.crearEventLoc(eventIngresado, user);
        } catch (error) {
            console.log("error en crear event loc");
        }
        return crear;
    }

    async modificarEventLoc(eventModificar: EventLocaciones, user: number){
        let modificar = null;
        if((eventModificar.name || eventModificar.full_address) === null || (eventModificar.name || eventModificar.full_address).length <= 3 || eventModificar.id_location === null || eventModificar.max_capacity <= 0){
            throw new Error('Bad Request');
        }else if (await this.getById(eventModificar.id) === null){
            throw new Error('Not Found');
        }
        try {
            modificar = await eventLocRepository.modificarEventLoc(eventModificar, user);
        } catch (error) {
            console.log("error en modificar evento loc");
        }
        
        return modificar;
    }

    async borrarEventLoc(id: number, user: number){
        let eliminar = null;
        if (await this.getById(id) === null){
            throw new Error ('Not Found');
        }
        try {
            eliminar = await  eventLocRepository.borrarEventLoc(id, user);
        } catch (error) {
            console.log("error en service borrar evento loc");
        }
        
    }
}