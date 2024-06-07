"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = exports.PaginationDto = void 0;
require("dotenv/config");
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
class Pagination {
    constructor() {
        this.limitRegex = /limit=\d+/;
        this.offsetRegex = /offset=\d+/;
    }
    parseLimit(limit) {
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 3;
    }
    parseOffset(offset) {
        return !isNaN(parseInt(offset)) ? parseInt(offset) : 0;
    }
    buildPagination(limit, currentOffset, total, path) {
        const response = new PaginationDto();
        response.limit = limit;
        response.offset = currentOffset;
        response.total = total;
        if (limit !== -1) {
            response.nextPage =
                limit + currentOffset < total
                    ? this.buildNextPage(path, limit, currentOffset)
                    : null;
        }
        return response;
    }
    buildNextPage(path, limit, currentOffset) {
        let url = process.env.BASE_URL + path;
        if (this.limitRegex.test(url)) {
            url = url.replace(this.limitRegex, `limit=${limit}`);
        }
        else {
            url = `${url}${url.includes("?") ? "&" : "?"}limit=${limit}`;
        }
        if (this.offsetRegex.test(url)) {
            url = url.replace(this.offsetRegex, `offset=${currentOffset + limit}`);
        }
        else {
            url = `${url}${url.includes("?") ? "&" : "?"} offset=${currentOffset + limit}`;
        }
        return url;
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map