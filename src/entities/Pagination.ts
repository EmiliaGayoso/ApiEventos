//seguir con lo de build next page, poque no se que hacer

import 'dotenv/config';
export class PaginationDto{
    limit;
    offset;
    nextPage;
    total;
}

export class Pagination {
    parseLimit(limit){
        return !isNaN(parseInt(limit))? parseInt(limit): 10;
    }
    parseOffset(offset){
        return !isNaN(parseInt(offset))? parseInt(offset): 0;
    }

    buildPagination(limit, currentOffset, total, path){
        const response = new PaginationDto();
        response.limit = limit;
        response.offset = currentOffset;
        response.total = total;
        
        if (limit !== -1){
            response.nextPage = limit + currentOffset < total ? this.buildNextPage(path, limit, currentOffset) : null;
        }

        return response;
    }

    buildNextPage(path, limit, currentOffset){
        let url = process.env.BASE_URL + path;

        /*if ()
        return url;*/
    }
}

/*
const response = {
collection:events,
pagination:{
limit:parsedLimit,
offset:parsedOffset,
nextPage:((parsedOffset +1) * parsedLimit <=totalCount) ? `${process.env.BASE_URL}
/
${path}?limit=${parsedLimit}&offset=${parsedOffset+1}
${(eventName) ? `&eventName= ${eventName}`:null}
${(eventCategory) ? `&eventCategory=${eventCategory}`` : null}
${(eventDate) ?`&eventDate=${eventDate}`:null}
${(eventTag) ? `&eventTag=${eventTag}`:null}`:null,
total:totalCount,
}
*/