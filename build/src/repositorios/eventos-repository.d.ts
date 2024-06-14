import pg from "pg";
import Eventos from "../entities/Eventos";
export declare class EventRepository {
    getAllEvents(name: any, cat: any, fecha: any, tag: any, limit: any, offset: any, queryWhere: any): Promise<(number | any[])[] | "Query Error">;
    getEventById(id: any): Promise<any>;
    getParticipants(id: number, limit: number, offset: number, queryWhere: string): Promise<"Query Error" | any[][]>;
    createEvent(eventito: Eventos): Promise<any>;
    getMaxCapacity(id: number): Promise<pg.QueryResult<any>>;
    updateEvent(eventito: Eventos, userId: Number): Promise<any>;
    deleteEvent(id: any, userId: any): Promise<{
        message: string;
    }>;
    enrollUsuario(idEvento: any, idUsuario: any): Promise<any>;
    patchFeedback(id: any, observations: any, rating: any): string;
}
