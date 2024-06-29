import Eventos from "../entities/Eventos";
import { EventRepository } from "../repositorios/eventos-repository";
import { Pagination } from "../entities/Pagination";

export class EventService {
    /*2 y 3*/
    async getAllEventos(path: string, url: string, limit: number, offset:number, name ?: string, cat ?: string, fecha ?: Date, tag ?: string) //el ?: (segun gemini) es para definir que el parametro es opcional
    {   
        //se tiene que verificar que name, cat, fecha y tag EXISTAN
        var queryWhere = ``;
        let fechaNew = fecha.toISOString().split(' ')[0]
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
        queryWhere += `LIMIT ${limit} OFFSET ${offset}`
        console.log("Despues de todas las query: ", queryWhere)
        const pag = new Pagination();

        const eventRepository = new EventRepository();
        const [allEvents, cantidadEvents] = await eventRepository.getAllEvents(name, cat, fecha, tag, limit, offset, queryWhere);
        //throw new Error("Error en el servicio  de eventos");
        const paginacionCreada = pag.buildPagination(limit, offset, cantidadEvents, path, url)
        console.log(paginacionCreada);
        const resultado=
        {
            collection: allEvents,
            
            pagination: paginacionCreada
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
        const returnEntity = evento;
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
        let evento = null;
        console.log('Id event loc: ', eventito.id_event_location);
        const maxCapacityLoc = eventRepository.getMaxCapacity(eventito.id_event_location);
        if((eventito.description || eventito.name) === null || (eventito.description || eventito.name).length <= 3 || eventito.max_assistance > Number(maxCapacityLoc)){
            throw new Error ('Bad Request');
        }
        try {
            console.log('llega al try de event service create')
            evento = await eventRepository.createEvent(eventito);
            if (evento.message === 'Bad Request'){
                throw new Error ('Bad Request');
            }
        } catch (error) {
            console.log("error en evento service creat");
        }
        return evento;
    }

    async updateEvent(eventito: Eventos, userId: number){
        const eventRepository = new EventRepository();
        ///validacion de que las modificaciones son del mismo usuarios que lo creo
        // Aquí podrías realizar validaciones adicionales antes de crear el evento, si es necesario.
        const maxCapacityLoc = eventRepository.getMaxCapacity(eventito.id_event_location);
        const buscada = await this.getEventoById(eventito.id);
        if((eventito.description || eventito.name) === null || (eventito.description.length || eventito.name.length) <= 3 || eventito.max_assistance > Number(maxCapacityLoc)){
            throw new Error ('Bad Request');
        }else if (buscada === null){
            throw new Error ('Not Found')
        }
        let evento = null;
        try {   
            evento = await eventRepository.updateEvent(eventito, userId);
            if (evento.message === 'Bad Request'){
                throw new Error ('Bad Request');
            }
        } catch (error) {
            console.log("error al modificar evento en service")
        }
        return evento;
    }

    async deleteEvent(id: number, user_id: number,){
        const eventRepository = new EventRepository();
        
        let eliminado = null;
        eliminado = await eventRepository.deleteEvent(id, user_id);
        console.log('pasa el eliminar');
        if (eliminado === null){
            throw new Error ('Not Found');
        }else if (eliminado.message === 'Bad Request'){
            throw new Error ('Bad Request');
        }
        return eliminado;
    }

    /*9*/
    //verificar si el nombre de usuario coincide con el id

    //inscribirlo
    async enrollUser(id: number, idUser: number /*username: string*/){
        const eventRepository = new EventRepository();
        //insertar el idUser a la BD de inscriptos
        const sePudo = await eventRepository.enrollUsuario(id, idUser)
        return sePudo;
    }
    //listo
    /*
    async userYaInscripto(idEvent: number, idUser: number){
        const eventRepository = new EventRepository();
        const yaInscripto = await eventRepository.verificarInscripcion(idEvent, idUser);
        return yaInscripto;
    }
    */

    
    //delete el enrollment
    async deleteEnrollment(idEvent: number, idUser: number){
        const eventRepository = new EventRepository();
        const eliminado = await eventRepository.eliminarEnrollment(idEvent, idUser);
        const buscada = await this.getEventoById(idEvent);
        if (buscada === null){
            throw new Error ('Not Found')
        }
        try {
            
        } catch (error) {
            
        }
        return eliminado;
    }

    /*10*/
    async patchFeedback(idEvent: number, idUser: number, observations: string, rating: number){
        const eventRepository = new EventRepository();
        const buscada = await this.getEventoById(idEvent);
        if(!(Number(rating) >= 1 && Number(rating) <= 10)){
            throw new Error ('Bad Request rating');
        }else if (buscada === null){
            throw new Error ('Not Found')
        }
        let sePudo = null;
        try {
            sePudo = await eventRepository.ingresoFeedback(idEvent, idUser, rating, observations);
        } catch (error) {
            if(!sePudo.success){//habria que ver una manera de que el success tenga opcion de 2 false, uno para el error de noInscripto y otro para el de noSucedio
                throw new Error ('Bad Request noInscripto');//por ahora quedara esa
                //la otra es que se mande como null, y que así lo identifiquemos, esto va tambien para el punto 9
            }
        }
        return sePudo;
    }

}





