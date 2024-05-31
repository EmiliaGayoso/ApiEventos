export declare class LocationService {
    getAll(limit: number, offset: number, url: string): Promise<{
        collection: string | any[];
        pagination: {
            pageSize: number;
            page: number;
            nextPage: string;
            total: number;
        };
    }>;
    getByID(id: number): Promise<any>;
    getAllEventLocations(id: number, limit: number, offset: number, url: string): Promise<any>;
}
