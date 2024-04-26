import Eventos from "../entities/Eventos";
export declare class EventService {
    getAllEventos(pageSize: number, requestedPage: number, name?: string, cat?: string, fecha?: Date, tag?: string): Promise<{
        collection: string;
        pagination: {
            limit: number;
            offset: number;
            nextPage: string;
            total: string;
        };
    }>;
    getEventoById(id: number): Promise<any>;
    getParticipants(limit: number, offset: number, id: number, fName?: string, lName?: string, username?: string, attended?: boolean, rating?: number): Promise<void>;
    createEvent(eventito: Eventos): Promise<boolean>;
    updateEvent(eventito: Eventos, eventoId: Number): Promise<boolean>;
    deleteEvent(id: number): Promise<boolean>;
    verificarExistenciaUsuario(idUser: number, username: string): boolean;
    enrollUser(id: number, idUser: number, username: string): Promise<boolean>;
    patchFeedback(id: number, attended: number, observations: string, rating: number): string;
}
