import Eventos from "../entities/Eventos";
export declare class EventService {
    getAllEventos(path: string, url: string, limit: number, offset: number, name?: string, cat?: string, fecha?: string, tag?: string): Promise<{
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
    updateEvent(eventito: Eventos, userId: number): Promise<any>;
    deleteEvent(id: number, user_id: number): Promise<any>;
    enrollUser(id: number, idUser: number): Promise<any>;
    deleteEnrollment(idEvent: number, idUser: number): Promise<any>;
    patchFeedback(idEvent: number, idUser: number, observations: string, rating: number): Promise<any>;
}
