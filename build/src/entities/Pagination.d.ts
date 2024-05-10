import 'dotenv/config';
export declare class PaginationDto {
    limit: any;
    offset: any;
    nextPage: any;
    total: any;
}
export declare class Pagination {
    parseLimit(limit: any): number;
    parseOffset(offset: any): number;
    buildPagination(limit: any, currentOffset: any, total: any, path: any): PaginationDto;
    buildNextPage(path: any, limit: any, currentOffset: any): void;
}
