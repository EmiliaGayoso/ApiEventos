import Eventos from "../entities/Eventos";
export declare class EventRepository {
    getAllEvents(name: any, cat: any, fecha: any, tag: any, limit: any, offset: any, queryWhere: any): Promise<any[] | "Query Error">;
    getEventById(id: any): Promise<any>;
    getParticipants(id: number, limit: number, offset: number, queryWhere: string): Promise<any[] | "Query Error">;
    createEvent(eventito: Eventos): Promise<any>;
    getMaxCapacity(id: number): Promise<any>;
    updateEvent(eventito: Eventos, userId: Number): Promise<any>;
    deleteEvent(id: any, userId: any): Promise<{
        message: string;
    }>;
    verificarInscripcion(idEvent: any, idUser: any): Promise<any>;
    enrollUsuario(idEvento: any, idUsuario: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
