import { EventRepository } from "../repositorios/eventos-repository";

export class EventService 
{
    getAllEventos(pageSize: number, requestedPage:number, name ?: string, cat ?: string, fecha ?: Date, tag ?: string) //el ?: (segun gemini) es para definir que el parametro es opcional
    {   
        
        const eventRepository = new EventRepository();
        const [allEvents, cantidadEvents] = eventRepository.getAllEvents(name, cat, fecha, tag, pageSize, requestedPage);
        //throw new Error("Error en el servicio  de eventos");
        return {
            collection: "query", //aca deberia ir un array de elementos, esta es una version harcodeada
            pagination: 
            {
              limit: pageSize, //la cantidad de elementos por pagina
              offset: requestedPage,// la pagina en la que estas
              nextPage: "http://localhost:3000/event?limit=15&offset=1",
              total: "query1", // cantidad de elementos, lo mismo de arriba
            },
        };

    }
    getEventoNombre(name : string)
    {
        //throw new Error("Error en el servicio  de eventos");

        return {
            collection: "query",
            pagination: 
            {
              nextPage: "http://localhost:3000/event?limit=15&offset=1",
              total: "query1", // cantidad de elementos
            },
        };
    }



}
