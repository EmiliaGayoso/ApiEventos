import Eventos from "../entities/Eventos";
export declare class EventService {
    getAllEventos(path: string, url: string, limit: number, offset: number, name?: string, cat?: string, fecha?: Date, tag?: string): Promise<{
        collection: string | number | any[];
        pagination: import("../entities/Pagination").PaginationDto;
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
    createEvent(eventito: Eventos): Promise<any>;
    updateEvent(eventito: Eventos, eventoId: number, userId: number): Promise<any>;
    deleteEvent(id: number, user_id: number): Promise<{
        message: string;
    }>;
    enrollUser(id: number, idUser: number, username: string): Promise<true | import("pg").QueryResult<any>>;
    patchFeedback(id: number, observations: string, rating: number): any;
}
