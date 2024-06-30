import EventLocaciones from "../entities/Eventos-Locaciones";
export declare class EventLocationService {
    getAll(limit: number, offset: number, url: string, path: string): Promise<{
        collection: string | number | any[];
        pagination: import("../entities/Pagination").PaginationDto;
    }>;
    getById(id: number): Promise<any>;
    crearEventLoc(eventIngresado: EventLocaciones, user: number): Promise<any>;
    modificarEventLoc(eventModificar: EventLocaciones, user: number): Promise<any>;
    borrarEventLoc(id: number, user: number): Promise<void>;
}
