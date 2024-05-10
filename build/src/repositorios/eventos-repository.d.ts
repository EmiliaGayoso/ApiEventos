export declare class EventRepository {
    getAllEvents(name: any, cat: any, fecha: any, tag: any, pageSize: any, requestedPage: any, queryWhere: any): Promise<any[][] | "Query Error">;
    getEventById(id: any): Promise<any>;
    getParticipants(id: any, limit: any, offset: any, queryWhere: any): Promise<any[][] | "Query Error">;
    createEvent(eventito: any): Promise<any>;
    updateEvent(eventito: any, eventoId: any): Promise<boolean>;
    deleteEvent(id: any): boolean;
    verificarExistenciaUsuario(id: any, username: any): boolean;
    enrollUsuario(id: any, idUser: any, username: any): boolean;
    patchFeedback(id: any, attended: any, observations: any, rating: any): string;
}
