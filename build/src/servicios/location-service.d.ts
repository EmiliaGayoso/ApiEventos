export declare class LocationService {
    getAll(limit: number, offset: number, url: string, path: string): Promise<{
        collection: string | number | any[];
        pagination: import("../entities/Pagination").PaginationDto;
    }>;
    getByID(id: number): Promise<any>;
    getAllEventLocations(id: number, limit: number, offset: number, url: string, path: string): Promise<any>;
}
