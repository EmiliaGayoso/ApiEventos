import pg from "pg";
export declare class EventRepository {
    getAllEvents(name: any, cat: any, fecha: any, tag: any, limit: any, offset: any, queryWhere: any): Promise<(number | any[])[] | "Query Error">;
    getEventById(id: any): Promise<any>;
    getParticipants(id: any, limit: any, offset: any, queryWhere: any): Promise<"Query Error" | any[][]>;
    createEvent(eventito: any): Promise<any>;
    getMaxCapacity(id: any): Promise<pg.QueryResult<any>>;
    updateEvent(eventito: any, userId: any): Promise<any>;
    deleteEvent(id: any, userId: any): Promise<{
        message: string;
    }>;
    enrollUsuario(id: any, idUser: any, username: any): Promise<true | pg.QueryResult<any>>;
    patchFeedback(id: any, observations: any, rating: any): string;
}
