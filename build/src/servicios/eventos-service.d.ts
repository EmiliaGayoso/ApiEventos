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
    getEventoNombre(name: string): {
        collection: string;
        pagination: {
            nextPage: string;
            total: string;
        };
    };
}
