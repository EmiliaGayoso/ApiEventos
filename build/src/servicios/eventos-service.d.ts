export declare class EventService {
    getAllEventos(pageSize: number, requestedPage: number, name?: string, cat?: string, fecha?: Date, tag?: string): {
        collection: string;
        pagination: {
            limit: number;
            offset: number;
            nextPage: string;
            total: string;
        };
    };
    getEventoById(id: number): void;
    getParticipants(id: number, fName?: string, lName?: string, username?: string, attended?: boolean, rating?: number): void;
}
