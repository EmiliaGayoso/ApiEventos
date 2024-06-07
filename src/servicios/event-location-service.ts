import { EventLocationRepository } from "../repositorios/event-location-repository";
import { Pagination } from "../entities/Pagination";
import EventLocaciones from "../entities/Eventos-Locaciones";

const eventLocRepository = new EventLocationRepository();

export class EventLocationService {
    async getAll(limit: number, offset: number, url: string, path: string){
        const pag = new Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset); 

        const [allEventLoc, cantidadEventLoc] = await eventLocRepository.getAll(limit, offset);
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
        if(buscada.rows.length === 0){
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
        }
        try {
            modificar = await eventLocRepository.modificarEventLoc(eventModificar, user);
        } catch (error) {
            console.log("error en modificar evento loc");
        }
        if (modificar.rows.length === 0 /*|| lo de si el usuario está autenticado*/){
            throw new Error('Not Found');
        }
        return modificar;
    }

    async borrarEventLoc(id: number, user: number){
        let eliminar = null;
        try {
            eliminar = await  eventLocRepository.borrarEventLoc(id, user);
        } catch (error) {
            console.log("error en service borrar evento loc");
        }
        if (eliminar.rows.length === 0){
            throw new Error ('Not Found');
        }
    }
}