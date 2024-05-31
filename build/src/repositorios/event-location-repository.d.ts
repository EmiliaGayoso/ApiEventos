export declare class EventLocationRepository {
    getAll(): Promise<any[][] | "error en repo event loc getAll">;
    getById(id: any): Promise<any>;
    crearEventLoc(crear: any, user: any): Promise<any>;
    modificarEventLoc(modificar: any, user: any): Promise<any>;
    borrarEventLoc(id: any, user: any): Promise<any>;
}
