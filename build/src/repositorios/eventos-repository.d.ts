import pg from "pg";
import Eventos from "../entities/Eventos";
export declare class EventRepository {
    getAllEvents(name: any, cat: any, fecha: any, tag: any, limit: any, offset: any, queryWhere: any): Promise<(number | any[])[] | "Query Error">;
    getEventById(id: any): Promise<any>;
    getParticipants(id: number, limit: number, offset: number, queryWhere: string): Promise<"Query Error" | any[][]>;
    createEvent(eventito: Eventos): Promise<any>;
    getMaxAssistance(id: number): Promise<any>;
    getMaxCapacity(id: number): Promise<pg.QueryResult<any>>;
    updateEvent(eventito: Eventos, userId: Number): Promise<any>;
    deleteEvent(id: any, userId: any): Promise<{
        message: string;
    }>;
    verificarInscripcion(idEvent: number, idUser: number): Promise<boolean>;
    enrollUsuario(idEvento: number, idUsuario: number): Promise<{
        success: boolean;
        message: string;
    }>;
    eliminarEnrollment(idEvento: any, idUsuario: any): Promise<{
        success: boolean;
        message: string;
    }>;
    ingresoFeedback(idEvent: number, idUser: number, observations: string, rating: number): Promise<{
        success: boolean;
        message: string;
    } | {
        success: boolean;
        message?: undefined;
    }>;
}
