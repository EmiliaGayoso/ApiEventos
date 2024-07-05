import Eventos from "../entities/Eventos";
import { EventRepository } from "../repositorios/eventos-repository";
import { Pagination } from "../entities/Pagination";

export class EventService {
    /*2 y 3*/
    async getAllEventos(path: string, url: string, limit: number, offset:number, name ?: string, cat ?: string, fecha ?: string, tag ?: string) //el ?: (segun gemini) es para definir que el parametro es opcional
    {   
        //se tiene que verificar que name, cat, fecha y tag EXISTAN
        var queryWhere = ``;
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
        if (fecha){
            if(queryWhere.includes("WHERE")){
                queryWhere += ` AND start_date = '${fecha}'`;
            }
            else{
                queryWhere += ` WHERE start_date = '${fecha}'`;
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
        queryWhere += `ORDER BY e.id LIMIT ${limit} OFFSET ${offset}`
        console.log("Despues de todas las query: ", queryWhere)
        const pag = new Pagination();

        const eventRepository = new EventRepository();
        const [allEvents, cantidadEvents] = await eventRepository.getAllEvents(name, cat, fecha, tag, limit, offset, queryWhere);
        const formattedEvents = allEvents.map(event => ({
            id: event.id,
            name: event.name,
            description: event.description,
            event_category: {
                id: event.id_event_category,
                name: event.category_name
            },
            event_location: {
                id: event.id_event_location,
                name: event.event_location_name,
                full_address: event.full_address,
                latitude: event.event_location_latitude,
                longitude: event.event_location_longitude,
                max_capacity: event.event_location_max_capacity,
                location: {
                    id: event.location_id,
                    name: event.location_name,
                    latitude: event.location_latitude,
                    longitude: event.location_longitude,
                    province: {
                        id: event.province_id,
                        name: event.province_name,
                        full_name: event.province_full_name,
                        latitude: event.province_latitude,
                        longitude: event.province_longitude,
                        display_order: event.province_display_order
                    }
                }
            },
            start_date: event.start_date,
            duration_in_minutes: event.duration_in_minutes,
            price: event.price,
            enabled_for_enrollment: event.enabled_for_enrollment,
            max_assistance: event.max_assistance,
            creator_user: {
                id: event.id_creator_user,
                username: event.username,
                first_name: event.first_name,
                last_name: event.last_name
            },
            tags: event.tags ? event.tags.map(tag => ({
                id: tag.id,
                name: tag.name
            })) : []
        }));

        //throw new Error("Error en el servicio  de eventos");
        const paginacionCreada = pag.buildPagination(limit, offset, cantidadEvents, path, url)
        console.log(paginacionCreada);
        
        const resultado=
        {
            collection: formattedEvents,
            
            pagination: paginacionCreada
        }
        
        return resultado;
            /*pagination: 
            {
              limit: limit, //la cantidad de elementos por pagina
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
        const formattedEvents = {
            id: evento.id,
            name: evento.name,
            description: evento.description,
            event_category: {
                id: evento.id_event_category,
                name: evento.category_name
            },
            event_location: {
                id: evento.id_event_location,
                name: evento.event_location_name,
                full_address: evento.full_address,
                latitude: evento.event_location_latitude,
                longitude: evento.event_location_longitude,
                max_capacity: evento.event_location_max_capacity,
                location: {
                    id: evento.location_id,
                    name: evento.location_name,
                    latitude: evento.location_latitude,
                    longitude: evento.location_longitude,
                    province: {
                        id: evento.province_id,
                        name: evento.province_name,
                        full_name: evento.province_full_name,
                        latitude: evento.province_latitude,
                        longitude: evento.province_longitude,
                        display_order: evento.province_display_order
                    }
                }
            },
            start_date: evento.start_date,
            duration_in_minutes: evento.duration_in_minutes,
            price: evento.price,
            enabled_for_enrollment: evento.enabled_for_enrollment,
            max_assistance: evento.max_assistance,
            creator_user: {
                id: evento.id_creator_user,
                username: evento.username,
                first_name: evento.first_name,
                last_name: evento.last_name
            },
            tags: evento.tags ? evento.tags.map(tag => ({
                id: tag.id,
                name: tag.name
            })) : []
        };

        console.log("ESTOY EN EVENTOS-SERVICE Y MANDO: ", formattedEvents)
        return formattedEvents;

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
        const buscada = await this.getEventoById(id);
        if (buscada === null){
            throw new Error ('Not Found')
        }
        let sePudo = null;
        try {
            sePudo = await eventRepository.enrollUsuario(id, idUser);
        } catch (error) {
            if(error.message === 'Bad Request inscripto'){
                throw new Error ('Bad Request inscripto');
            }else if(error.message === 'Bad Request cerrado'){
                throw new Error ('Bad Request cerrado');
            }else if (error.message === 'Bad Request agotado'){
                throw new Error ('Bad Request agotado');
            }
        }
        
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
        let eliminado = null;
        const buscada = await this.getEventoById(idEvent);
        if (buscada === null){
            throw new Error ('Not Found')
        }
        try {
            eliminado = await eventRepository.eliminarEnrollment(idEvent, idUser);
        } catch (error) {
            if(error.message === 'Bad Request noInscripto'){
                throw new Error ('Bad Request noInscripto');
            }else if(error.message === 'Bad Request cerrado'){
                throw new Error ('Bad Request cerrado');
            }
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
            sePudo = await eventRepository.ingresoFeedback(idEvent, idUser, observations, rating);
        } catch (error) {
            if(error.message === 'Bad Request noInscripto'){//habria que ver una manera de que el success tenga opcion de 2 false, uno para el error de noInscripto y otro para el de noSucedio
                throw new Error ('Bad Request noInscripto');//por ahora quedara esa
                //la otra es que se mande como null, y que así lo identifiquemos, esto va tambien para el punto 9
            }
            throw new Error ('Query Error');
        }
        return sePudo;
    }

}





