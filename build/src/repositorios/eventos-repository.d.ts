export declare class EventRepository {
    getAllEvents(name: any, cat: any, fecha: any, tag: any, pageSize: any, requestedPage: any, queryWhere: any): Promise<any[] | "Query Error">;
    getEventById(id: any): any;
    getParticipants(id: any, limit: any, offset: any, queryWhere: any): void;
    createEvent(eventito: any): boolean;
    updateEvent(eventito: any, eventoId: any): Promise<boolean>;
    deleteEvent(id: any): boolean;
    verificarExistenciaUsuario(id: any, username: any): boolean;
    enrollUsuario(id: any, idUser: any, username: any): boolean;
    patchFeedback(id: any, attended: any, observations: any, rating: any): string;
}
