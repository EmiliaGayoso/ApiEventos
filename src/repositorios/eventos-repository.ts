import pg from "pg";
import { config } from "../repositorios/bd"; 


const client = new pg.Client(config);
console.log('config', config)
client.connect();
//const respuesta = await client.query(sql);

export class EventRepository{
    async getAllEvents(name, cat, fecha, tag, pageSize, requestedPage, queryWhere) {
        
        console.log("llego a getAllEvents");
        //FIJARSE PORQUE FALLA EL HARCODEO, QUE FALTA AGREGAR
        const query1 = `SELECT e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.max_assistance FROM events e
        LEFT JOIN event_categories ON e.id_event_category = event_categories.id
        LEFT JOIN event_tags ON event_tags.id_event = e.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        ` + queryWhere;
        const query2= `select count(*) from events`; //te da la cantidad de eventos
        try {
            console.log("llega a la query1");
            const { rows: resultado1 }= await client.query(query1);

            console.log("llega a query2")
            const { rows: resultado2 } = await client.query(query2);
            return [resultado1,resultado2];
        }
        catch {
            console.log("Error en query");
            return("Query Error")
        }

        
        /*`SELECT * FROM events limit ${pageSize} offset ${requestedPage}
        LEFT JOIN event_categories ON event.id_event_category = event_categories.id
        LEFT JOIN event_tags ON event_tags.id_event = event.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        ` + queryBase; */
        //
        
        
        //const pizzasInDB = query.execute();

        //const values = client.query(sqlQuery);
        
        
        //const [allEvents, cantidadEvents] en el service
    }

    async getEventById(id)
    {
        console.log("ESTOY EN EVENTOS-REPOSITORY con id: ", id)
        //por alguna razón el e.name lo toma como si sería ec.name, aparece doble en el json lo mismo en el punto de arriba
        const queryId = `SELECT e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.max_assistance, l.name, pr.name, tg.name, ec.name FROM events e
        LEFT JOIN locations l ON e.id_event_location = l.id
        LEFT JOIN provinces pr ON l.id_province = pr.id

        LEFT JOIN event_tags et ON e.id = et.id_event

        LEFT JOIN tags tg ON et.id_tag = tg.id

        LEFT JOIN event_categories ec ON e.id_event_category = ec.id
        LEFT JOIN users u ON e.id_creator_user = u.id
        WHERE e.id = ${id}`;
        let retornar = null;
        try {
            console.log("llega a la query1");
            const { rows: values }= await client.query(queryId);
            console.log(values);
            retornar = values;
        }
        catch {
            console.log("Error en query");
        }
        return retornar;
    }

    /*5*/
    async getParticipants(id, limit, offset, queryWhere){
        console.log("llega a getParticipant repository")
        //por ahora sin limit ni offset
        const query = `SELECT er.*,u.first_name,u.last_name,u.username,e.name FROM event_enrollments er
        LEFT JOIN users u ON er.id_user = u.id
        LEFT JOIN events e ON er.id_event = e.id 
		LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags ON et.id = tags.id
        WHERE e.id = ${id}` + queryWhere;
        const query2= `select count(*) from event_enrollments`;
        try {
            console.log("llega a la query1");
            const { rows: participants } = await client.query(query);
            console.log(participants);

            console.log("llega a query2")
            const { rows: countParticipants } = await client.query(query2);

            return [participants, countParticipants];
        }
        catch {
            console.log("Error en query");
            return("Query Error")
        }
    }


    /*8*/
   createEvent(eventito){// Lógica para crear un nuevo evento en la base de datos
        const query= `INSERT INTO events (name,description,id_event_category,id_event_location, start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance,id_creator_user)
        VALUES (${eventito.name},${eventito.description},${eventito.id_event_category},${eventito.id_event_location}, ${eventito.start_date},${eventito.duration_in_minutes},${eventito.price},${eventito.enabled_for_enrollment},${eventito.max_assistance},${eventito.id_creator_user}); `;
        const query2=`SELECT * FROM events WHERE title = ${name}`
        // Suponiendo que tienes un método create en tu clase Database
        if(query2!=null)
        {
            return true;
        }
        else{
            return false
        }
    }
    async updateEvent(eventito, eventoId) {
        // Lógica para crear un nuevo evento en la base de datos
        const query= `UPDATE events 
        SET name=${eventito.name}, 
        description=${eventito.description},
        id_event_category=${eventito.id_event_category},
        id_event_location=${eventito.id_event_location},
        start_date= ${eventito.start_date}, 
        duration_in_minutes =${eventito.duration_in_minutes},
        price=${eventito.price}, 
        enabled_for_enrollment=${eventito.enabled_for_enrollment},
        max_assistance=${eventito.max_assistance},
        id_creator_user=${eventito.id_creator_user}); 
        WHERE id = ${eventoId}; `;

        const query2=`SELECT * FROM events WHERE id = ${eventoId}}`
        const { rows: categoryRows } = await client.query(query2);

        // Suponiendo que tienes un método create en tu clase Database
        if(query2!=null)
        {
            return true;
        }
        else{
            return false
        }
    }

   deleteEvent(id)
    {
        const query= `DELETE * FROM events WHERE id = ${id}`
        const query2=`SELECT * FROM events WHERE id = ${id}`
        if(query2==null)
        {
            return true;//se borro correctamente
        }
        else{
            return false
        }

    }
    

    /*9*/
    //verificar si el usuario existe
    verificarExistenciaUsuario(id, username){
        //se debería crear la query que confirme que el id que llega coincide con el id del username
        return true;
    }

    enrollUsuario(id, idUser, username){
        //se tiene que hacer lo de agregar el usuario
        //si no se pudo se manda null
        return true;
    }

    patchFeedback(id, attended, observations, rating){
        //deberia retornar el json de como
        return "json"
    }
}