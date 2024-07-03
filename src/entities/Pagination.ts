//seguir con lo de build next page, poque no se que hacer
import 'dotenv/config';

export class PaginationDto{
    limit: number;
    currentOffset: number;
    nextPage: string | null;
    total: number;
    constructor (limit, currentOffset, nextPage, total){
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

export class Pagination {
    limitRegex = /limit=\d+/;
    offsetRegex = /offset=\d+/;

    parseLimit(limit){
        return !isNaN(parseInt(limit))? parseInt(limit): 2;
    }
    parseOffset(offset){
        return !isNaN(parseInt(offset))? parseInt(offset): 0;
    }

    buildPagination(limit, currentOffset, total, path, url){
        console.log('estoy en builpagination');
        console.log(limit);
        console.log(currentOffset);
        console.log(total);
        console.log(path);
        console.log(url);
        console.log(limit !== -1 && limit + currentOffset < Number(total))
        const nextPage = 
        limit !== -1 && limit + currentOffset < total
        ? this.buildNextPage(path, limit, currentOffset,url) 
        : null;
        

        return new PaginationDto(limit, currentOffset, nextPage, total);
    }

    buildNextPage(path, limit, currentOffset, url1){
        let url = process.env.BASE_URL + url1 + path;
        console.log(url);
        url = this.limitRegex.test(url)
        ? url.replace(this.limitRegex, `limit=${limit}`)
        : `${url}${url.includes("?") ? "&" : "?"}limit=${limit}`;
        console.log(url);
        url = this.offsetRegex.test(url)
        ? url.replace(this.offsetRegex, `offset=${currentOffset + limit}`)
        : `${url}${url.includes("?") ? "&" : "?"}offset=${currentOffset + limit}`;
        console.log(url);
        currentOffset++;
        return url;

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