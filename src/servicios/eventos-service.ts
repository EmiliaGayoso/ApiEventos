import { EventRepository } from "../repositorios/eventos-repository";

export class EventService 
{
    
    getAllEventos(pageSize: number, requestedPage:number, name ?: string, cat ?: string, fecha ?: Date, tag ?: string) //el ?: (segun gemini) es para definir que el parametro es opcional
    {   
        //se tiene que verificar que name, cat, fecha y tag EXISTAN
        var queryWhere = ``;
        
        //falta agregar cosas, ya que en el caso que no exista name, pero si las demas, el WHERE debería seguir funcionando
        if (name){
            queryWhere += `WHERE name ${name},`;
        }
        if (cat){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND event_categories.category = ${cat}`;
            }
            else{
                queryWhere += ` WHERE event_categories.category = ${cat}`;
            };
        }
        if (fecha){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND startDate = ${fecha}`;
            }
            else{
                queryWhere += ` WHERE startDate = ${fecha}`;
            };
        }
        if (tag){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND tags.tag = ${tag}`;
            }
            else{
                queryWhere += ` WHERE tags.tag = ${tag}`;
            }
        }

        const eventRepository = new EventRepository();
        const [allEvents, cantidadEvents] = eventRepository.getAllEvents(name, cat, fecha, tag, pageSize, requestedPage, queryWhere);
        //throw new Error("Error en el servicio  de eventos");
        return {
            collection: allEvents, //aca deberia ir un array de elementos, esta es una version harcodeada
            pagination: 
            {
              limit: pageSize, //la cantidad de elementos por pagina
              offset: requestedPage,// la pagina en la que estas
              nextPage: "http://localhost:3000/event?limit=15&offset=1",
              total: cantidadEvents, // cantidad de elementos, lo mismo de arriba
            },
        };

    }

    getEventoById(id: number)
    {
        //se tiene que verificar que id EXISTA
        const eventRepository = new EventRepository();
        const evento = eventRepository.getEventById(id);
        return evento;

    }

    getParticipants(id: number, fName ?: string, lName ?: string, username ?: string, attended ?: boolean, rating ?: number){
        //se tiene que verificar que id EXISTA
        var queryWhere = ``;
        
        //falta agregar cosas, ya que en el caso que no exista name, pero si las demas, el WHERE debería seguir funcionando
        if (fName){
            queryWhere += `WHERE first_name ${fName},`;
        }
        if (lName){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND last_name = ${lName}`;
            }
            else{
                queryWhere += ` WHERE last_name = ${lName}`;
            };
        }
        if (username){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND username = ${username}`;
            }
            else{
                queryWhere += ` WHERE username = ${username}`;
            };
        }
        if (attended){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND attended = ${attended}`;
            }
            else{
                queryWhere += ` WHERE attended = ${attended}`;
            }
        }
        if (rating){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND rating = ${rating}`;
            }
            else{
                queryWhere += ` WHERE rating = ${rating}`;
            }
        }

        const eventRepository = new EventRepository();
        const participants = eventRepository.getParticipants(id, fName, lName, username, attended, rating, queryWhere);
        return participants;
    }

}
