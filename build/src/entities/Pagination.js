"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pagination = exports.PaginationDto = void 0;
require("dotenv/config");
class PaginationDto {
}
exports.PaginationDto = PaginationDto;
class Pagination {
    parseLimit(limit) {
        return !isNaN(parseInt(limit)) ? parseInt(limit) : 10;
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
            response.nextPage = limit + currentOffset < total ? this.buildNextPage(path, limit, currentOffset) : null;
        }
        return response;
    }
    buildNextPage(path, limit, currentOffset) {
        let url = process.env.BASE_URL + path;
    }
}
exports.Pagination = Pagination;
//# sourceMappingURL=Pagination.js.map