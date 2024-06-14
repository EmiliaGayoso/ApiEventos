export declare class LocationRepository {
    getAll(limit: any, offset: any): Promise<(number | any[])[] | "Query error">;
    getById(id: any): Promise<any>;
    getAllEventsLocations(id: any, limit: any, offset: any): Promise<(number | any[])[] | "Query error">;
}
