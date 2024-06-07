import pg from "pg";
export declare class EventRepository {
    getAllEvents(name: any, cat: any, fecha: any, tag: any, pageSize: any, requestedPage: any, queryWhere: any): Promise<any[][] | "Query Error">;
    getEventById(id: any): Promise<any>;
    getParticipants(id: any, limit: any, offset: any, queryWhere: any): Promise<any[][] | "Query Error">;
    createEvent(eventito: any): Promise<any>;
    getMaxCapacity(id: any): Promise<pg.QueryResult<any>>;
    updateEvent(eventito: any, userId: any): Promise<any>;
    deleteEvent(id: any): Promise<any>;
    verificarExistenciaUsuario(id: any, username: any): boolean;
    enrollUsuario(id: any, idUser: any, username: any): boolean;
    patchFeedback(id: any, attended: any, observations: any, rating: any): string;
}
