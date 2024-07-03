"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = exports.PaginationDto = void 0;
require("dotenv/config");
class PaginationDto {
    constructor(limit, currentOffset, nextPage, total) {
        console.log("constructor");
        console.log(limit);
        console.log(currentOffset);
        console.log(nextPage);
        console.log(total);
        this.limit = limit;
        this.currentOffset = currentOffset;
        this.nextPage = nextPage;
        this.total = total;
    }
}
exports.PaginationDto = PaginationDto;
class Pagination {
    constructor() {
        this.limitRegex = /limit=\d+/;
        this.offsetRegex = /offset=\d+/;
    }
    parseLimit(limit) {
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 2;
    }
    parseOffset(offset) {
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }
    buildPagination(limit, currentOffset, total, path, url) {
        console.log('estoy en builpagination');
        console.log(limit);
        console.log(currentOffset);
        console.log(total);
        console.log(path);
        console.log(url);
        console.log(limit !== -1 && limit + currentOffset < Number(total));
        const nextPage = limit !== -1 && limit + currentOffset < total
            ? this.buildNextPage(path, limit, currentOffset, url)
            : null;
        return new PaginationDto(limit, currentOffset, nextPage, total);
    }
    buildNextPage(path, limit, currentOffset, url1) {
        let url = process.env.BASE_URL + url1 + path;
        console.log(url);
        url = this.limitRegex.test(url)
            ? url.replace(this.limitRegex, `pageSize=${limit}`)
            : `${url}${url.includes("?") ? "&" : "?"}pageSize=${limit}`;
        console.log(url);
        url = this.offsetRegex.test(url)
            ? url.replace(this.offsetRegex, `page=${(currentOffset + 1) * limit}`)
            : `${url}${url.includes("?") ? "&" : "?"}page=${(currentOffset + 1) * limit}`;
        console.log(url);
        return url;
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map