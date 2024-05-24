import Eventos from "../entities/Eventos";
import { EventRepository } from "../repositorios/eventos-repository";
import { Pagination } from "../entities/Pagination";

export class EventService {
    /*2 y 3*/
    async getAllEventos(limit: number, offset:number, url: string, name ?: string, cat ?: string, fecha ?: Date, tag ?: string) //el ?: (segun gemini) es para definir que el parametro es opcional
    {   
        //se tiene que verificar que name, cat, fecha y tag EXISTAN
        var queryWhere = ``;
        console.log(limit)
        console.log(offset)
        console.log(url)
        console.log(name)
        console.log(cat)
        console.log(fecha)
        console.log(tag)
        let fechaNew = fecha.toISOString().split('T')[0]
        let currentDate = new Date()
        //falta agregar cosas, ya que en el caso que no exista name, pero si las demas, el WHERE debería seguir funcionando
        if (name){
            queryWhere += `WHERE events.name ILIKE '%${name}%'`;
        }
        if (cat){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND event_categories.name = '${cat}'`;
            }
            else{
                queryWhere += ` WHERE event_categories.name = '${cat}'`;
            };
        }
        if (!(fechaNew === currentDate.toISOString().split('T')[0])){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND startDate = '${fecha}'`;
            }
            else{
                queryWhere += ` WHERE startDate = '${fecha}'`;
            };
        }
        if (tag){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND tags.name = '${tag}'`;
            }
            else{
                queryWhere += ` WHERE tags.name = '${tag}'`;
            }
        }
        console.log("Despues de todas las query: ", queryWhere)
        const pag = new Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);

        const eventRepository = new EventRepository();
        const [allEvents, cantidadEvents] = await eventRepository.getAllEvents(name, cat, fecha, tag, parsedLimit, parsedOffset, queryWhere);
        //throw new Error("Error en el servicio  de eventos");
        
        const resultado=
        {
            collection: allEvents, //aca deberia ir un array de elementos, esta es una version harcodeada
            
            pagination: {
                pageSize: parsedLimit,
                page: parsedOffset,
                nextPage: pag.buildNextPage(url,parsedLimit,parsedOffset),
                total: Number(cantidadEvents)
            }
        }
        return resultado;
            /*pagination: 
            {
              limit: pageSize, //la cantidad de elementos por pagina
              offset: requestedPage,// la pagina en la que estas
              nextPage: "http://localhost:5050/event?limit=15&offset=1",
              total: cantidadEvents, // cantidad de elementos, lo mismo de arriba
            },*/
    }
    /*4*/
    async getEventoById(id: number)
    {
        //se tiene que verificar que id EXISTA
        console.log(id);
        const eventRepository = new EventRepository();
        const evento = await eventRepository.getEventById(id);
        if (evento === null){
            throw new Error ('Not Found');
        }
        const returnEntity = evento.rows[0];
        console.log("ESTOY EN EVENTOS-SERVICE Y MANDO: ", returnEntity)
        return returnEntity;

    }

    /*5*/
    async getParticipants(limit: number, offset: number, id: number, fName ?: string, lName ?: string, username ?: string, attended ?: boolean, rating ?: number){
        //se tiene que verificar que id EXISTA
        var queryWhere = ``;
        console.log("llega a getParticipant service")
        console.log(fName);
        console.log(lName);
        console.log(username);
        console.log(attended);
        console.log(rating);
        const pag = new Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
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
        console.log(queryWhere);
        const [participants, countParticipants] = await eventRepository.getParticipants(id, parsedLimit, parsedOffset, queryWhere);
        const resultado=
        {
            collection: participants, //aca deberia ir un array de elementos, esta es una version harcodeada
            
            pagination: {
                limit: parsedLimit,
                offset: parsedOffset,
                nextPage: ((offset + 1) * limit <= Number(countParticipants)) ? null : process.env.URL_BASE,
                total: Number(countParticipants)
            }
        }
        return resultado;

        return participants;
    }


/*8*/
    async createEvent(eventito: Eventos) {
        const eventRepository = new EventRepository();
        const evento = await eventRepository.createEvent(eventito);
        return evento;
    }
    async updateEvent(eventito: Eventos, eventoId: number, user_id: number){
        const eventRepository = new EventRepository();
        if(eventito.id_creator_user === user_id){

            const evento = await eventRepository.updateEvent(eventito, eventoId);
            return evento;
        }///validacion de que las modificaciones son del mismo usuarios que lo creo
        else{
            return null;
        }
        // Aquí podrías realizar validaciones adicionales antes de crear el evento, si es necesario.
        
    }

    async deleteEvent(eventito: Eventos,id: number, user_id: number,){
        const eventRepository = new EventRepository();
        if(eventito.id_creator_user === user_id)
        {
            const eliminado = await eventRepository.deleteEvent(id);// Aquí podrías realizar validaciones adicionales antes de crear el evento, si es necesario.
            return eliminado;
        }///validacion de que las modificaciones son del mismo usuarios que lo creo
        else{
            return null;
        }
    }

    /*9*/
    //verificar si el nombre de usuario coincide con el id
    verificarExistenciaUsuario(idUser: number, username: string){
        const eventRepository = new EventRepository();
        const user = eventRepository.verificarExistenciaUsuario(idUser, username);
        return user;
    }

    //inscribirlo
    async enrollUser(id: number, idUser: number, username: string){
        const eventRepository = new EventRepository();
        //insertar el idUser a la BD de inscriptos
        const sePudo = await eventRepository.enrollUsuario(id, idUser, username)
        return sePudo;
    }
    /*10*/
    patchFeedback(id: number, attended: number, observations: string, rating: number){
        const eventRepository = new EventRepository();
        const sePudo = eventRepository.patchFeedback(id, attended, observations, rating)
        return sePudo;
    }

}





