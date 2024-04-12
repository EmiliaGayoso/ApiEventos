export declare class EventRepository {
    getAllEvents(name: any, cat: any, fecha: any, tag: any, pageSize: any, requestedPage: any, queryWhere: any): {
        id: number;
        name: string;
        description: string;
        start_date: string;
        duration_in_minutes: number;
        price: string;
        enabled_for_enrollment: boolean;
        max_assistance: number;
        tags: string[];
        creator_user: {
            id: number;
            username: string;
            first_name: string;
            last_name: string;
        };
        event_category: {
            id: number;
            name: string;
        };
        event_location: {
            id: number;
            name: string;
            full_address: string;
            latitude: number;
            longitude: number;
            max_capacity: string;
        };
    }[][];
    getEventById(id: any): void;
    getParticipants(limit: any, offset: any, queryWhere: any): void;
}
