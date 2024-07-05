import Eventos from "../entities/Eventos";
export declare class EventService {
    getAllEventos(path: string, url: string, limit: number, offset: number, name?: string, cat?: string, fecha?: string, tag?: string): Promise<{
        collection: any;
        pagination: import("../entities/Pagination").PaginationDto;
    }>;
    getEventoById(id: number): Promise<{
        id: any;
        name: any;
        description: any;
        event_category: {
            id: any;
            name: any;
        };
        event_location: {
            id: any;
            name: any;
            full_address: any;
            latitude: any;
            longitude: any;
            max_capacity: any;
            location: {
                id: any;
                name: any;
                latitude: any;
                longitude: any;
                province: {
                    id: any;
                    name: any;
                    full_name: any;
                    latitude: any;
                    longitude: any;
                    display_order: any;
                };
            };
        };
        start_date: any;
        duration_in_minutes: any;
        price: any;
        enabled_for_enrollment: any;
        max_assistance: any;
        creator_user: {
            id: any;
            username: any;
            first_name: any;
            last_name: any;
        };
        tags: any;
    }>;
    getParticipants(limit: number, offset: number, id: number, fName?: string, lName?: string, username?: string, attended?: boolean, rating?: number): Promise<any>;
    createEvent(eventito: Eventos): Promise<any>;
    updateEvent(eventito: Eventos, userId: number): Promise<any>;
    deleteEvent(id: number, user_id: number): Promise<any>;
    enrollUser(id: number, idUser: number): Promise<any>;
    deleteEnrollment(idEvent: number, idUser: number): Promise<any>;
    patchFeedback(idEvent: number, idUser: number, observations: string, rating: number): Promise<any>;
}
