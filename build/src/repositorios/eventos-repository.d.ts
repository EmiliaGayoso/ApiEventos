export declare class EventRepository {
    getAllEvents(name: any, cat: any, fecha: any, tag: any, pageSize: any, requestedPage: any, queryBase: any): string[];
    getEventById(id: any): void;
    getParticipants(id: any, fName: any, lName: any, username: any, attended: any, rating: any, queryWhere: any): void;
}
