import 'dotenv/config';
export declare class PaginationDto {
    limit: number;
    currentOffset: number;
    nextPage: string | null;
    total: number;
    constructor(limit: any, currentOffset: any, nextPage: any, total: any);
}
export declare class Pagination {
    limitRegex: RegExp;
    offsetRegex: RegExp;
    parseLimit(limit: any): number;
    parseOffset(offset: any): number;
    buildPagination(limit: any, currentOffset: any, total: any, path: any, url: any): PaginationDto;
    buildNextPage(path: any, limit: any, currentOffset: any, url1: any): string;
}
