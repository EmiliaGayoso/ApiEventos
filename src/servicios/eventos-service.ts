import Eventos from "../models/Eventos";
import { EventRepository } from "../repositorios/eventos-repository";

export class EventService {
    
    getAllEventos(pageSize: number, requestedPage:number, name ?: string, cat ?: string, fecha ?: Date, tag ?: string) //el ?: (segun gemini) es para definir que el parametro es opcional
    {   
        //se tiene que verificar que name, cat, fecha y tag EXISTAN
        var queryWhere = ``;
        
        //falta agregar cosas, ya que en el caso que no exista name, pero si las demas, el WHERE debería seguir funcionando
        if (name){
            queryWhere += `WHERE name = ${name},`;
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
              nextPage: "http://localhost:5050/event?limit=15&offset=1",
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

    /*5*/
    getParticipants(limit: number, offset: number, id: number, fName ?: string, lName ?: string, username ?: string, attended ?: boolean, rating ?: number){
        //se tiene que verificar que id EXISTA
        var queryWhere = ``;
        
        //falta agregar cosas, ya que en el caso que no exista name, pero si las demas, el WHERE debería seguir funcionando
        if (fName){
            queryWhere += `AND u.first_name = ${fName},`;
        }
        if (lName){
            queryWhere += ` AND u.last_name = ${lName}`;
        }
        if (username){
            queryWhere += ` AND u.username = ${username}`;
        }
        if (attended){
            queryWhere += ` AND er.attended = ${attended}`;
        }
        if (rating){
            queryWhere += ` AND er.rating = ${rating}`;
        }

        const eventRepository = new EventRepository();
        const participants = eventRepository.getParticipants(id, limit, offset, queryWhere);
        return participants;
    }


/*8*/
    createEvent(eventito: Eventos) {
        const eventRepository = new EventRepository();
        const evento= eventRepository.createEvent(eventito);
        return evento;
    }
    updateEvent(eventito: Eventos, eventoId:Number){
        const eventRepository = new EventRepository();
        const evento= eventRepository.updateEvent(eventito,eventoId);// Aquí podrías realizar validaciones adicionales antes de crear el evento, si es necesario.
        
        return evento;
    }

    deleteEvent(id:number){
        const eventRepository = new EventRepository();
        const evento= eventRepository.deleteEvent(id);// Aquí podrías realizar validaciones adicionales antes de crear el evento, si es necesario.
        
        return evento;
    }
/*
    async editEvent(eventId: number, eventData: Event): Promise<Event | null> {
        // Verificar si el evento existe
        const existingEvent: Event | null = await this.eventRepository.getEventById(eventId);
        if (!existingEvent) {
            return null; // Evento no encontrado
        }

        // Aquí podrías realizar validaciones adicionales antes de editar el evento, si es necesario.
        return await this.eventRepository.editEvent(eventId, eventData);
    }

    async deleteEvent(eventId: number): Promise<boolean> {
        // Verificar si el evento existe
        const existingEvent: Event | null = await this.eventRepository.getEventById(eventId);
        if (!existingEvent) {
            return false; // Evento no encontrado
        }

        return await this.eventRepository.deleteEvent(eventId);
    }

    async isUserEventCreator(eventId: number, userId: number): Promise<boolean> {
        // Verificar si el usuario es el creador del evento
        const event: Event | null = await this.eventRepository.getEventById(eventId);
        return event !== null && event.creatorUserId === userId;
    }
*/

    /*9*/
    //verificar si el nombre de usuario coincide con el id
    verificarExistenciaUsuario(idUser: number, username: string){
        const eventRepository = new EventRepository();
        const user = eventRepository.verificarExistenciaUsuario(idUser, username);
        return user;
    }

    //inscribirlo
    enrollUser(id: number, idUser: number, username: string){
        const eventRepository = new EventRepository();
        //insertar el idUser a la BD de inscriptos
        const sePudo = eventRepository.enrollUsuario(id, idUser, username)
        return sePudo;
    }
    /*10*/
    patchFeedback(id: number, attended: number, observations: string, rating: number){
        const eventRepository = new EventRepository();
        const sePudo = eventRepository.patchFeedback(id, attended, observations, rating)
        return sePudo;
    }

}





