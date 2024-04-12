export declare class EventService {
    getAllEventos(pageSize: number, requestedPage: number, name?: string, cat?: string, fecha?: Date, tag?: string): {
        collection: {
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
        }[];
        pagination: {
            limit: number;
            offset: number;
            nextPage: string;
            total: {
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
            }[];
        };
    };
    getEventoById(id: number): void;
    getParticipants(limit: number, offset: number, id: number, fName?: string, lName?: string, username?: string, attended?: boolean, rating?: number): void;
}
