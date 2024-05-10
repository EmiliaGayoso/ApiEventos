import Eventos from "../entities/Eventos";
export declare class EventService {
    getAllEventos(limit: number, offset: number, url: string, name?: string, cat?: string, fecha?: Date, tag?: string): Promise<{
        collection: string | any[];
        pagination: {
            limit: number;
            offset: number;
            nextPage: string;
            total: number;
        };
    }>;
    getEventoById(id: number): Promise<any>;
    getParticipants(limit: number, offset: number, id: number, fName?: string, lName?: string, username?: string, attended?: boolean, rating?: number): Promise<string | any[] | {
        collection: string | any[];
        pagination: {
            limit: number;
            offset: number;
            nextPage: string;
            total: number;
        };
    }>;
    createEvent(eventito: Eventos): Promise<boolean>;
    updateEvent(eventito: Eventos, eventoId: number, user_id: number): Promise<boolean>;
    deleteEvent(eventito: Eventos, id: number, user_id: number): Promise<boolean>;
    verificarExistenciaUsuario(idUser: number, username: string): boolean;
    enrollUser(id: number, idUser: number, username: string): Promise<boolean>;
    patchFeedback(id: number, attended: number, observations: string, rating: number): string;
}
