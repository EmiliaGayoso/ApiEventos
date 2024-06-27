import pg from "pg";
import { config } from "../repositorios/bd"; 
import Eventos from "../entities/Eventos";


const client = new pg.Client(config);
console.log('config', config);
client.connect();
//const respuesta = await client.query(sql);

export class EventRepository{
    async getAllEvents(name, cat, fecha, tag, limit, offset, queryWhere) {
        
        console.log("llego a getAllEvents");
        //FIJARSE PORQUE FALLA EL HARCODEO, QUE FALTA AGREGAR
        const query1 = `SELECT e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.max_assistance FROM events e
        LEFT JOIN event_categories ON e.id_event_category = event_categories.id
        LEFT JOIN event_tags ON event_tags.id_event = e.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        ` + queryWhere; //te da la cantidad de eventos
        try {
            console.log("llega a la query1");
            const { rows: resultado1 } = await client.query(query1);

            console.log("llega a query2")
            const resultado2 = resultado1.length;
            console.log(Number(resultado2));
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
            const {rows: result} = await client.query(queryId);
            if(result.length > 0){
                retornar = result[0];
            }
        }
        catch {
            console.log("Error en query getByID");
        }
        console.log(retornar);
        return retornar;
    }

    /*5*/
    async getParticipants(id: number, limit:number, offset:number, queryWhere: string){
        console.log("llega a getParticipant repository")
        //por ahora sin limit ni offset
        const queryParticipants = `SELECT er.*,u.first_name,u.last_name,u.username,e.name FROM event_enrollments er
        LEFT JOIN users u ON er.id_user = u.id
        LEFT JOIN events e ON er.id_event = e.id 
		LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags ON et.id = tags.id
        WHERE e.id = ${id}` + queryWhere;
        const query2= `select count(*) from event_enrollments`;
        try {
            console.log("llega a la query1");
            const { rows: participants } = await client.query(queryParticipants);
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
   async createEvent(eventito: Eventos){// Lógica para crear un nuevo evento en la base de datos
    console.log('llega a repo create event');
    //let fechaNew = eventito.start_date.toDateString();
    console.log("aaa");

    console.log(eventito.start_date.toString())
    
    console.log(eventito.id_creator_user)
    const query = {
        text: 'INSERT INTO events (name,description,id_event_category,id_event_location, start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance,id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',
        values: [eventito.name,eventito.description,eventito.id_event_category,eventito.id_event_location,eventito.start_date,eventito.duration_in_minutes,eventito.price,eventito.enabled_for_enrollment,eventito.max_assistance,eventito.id_creator_user]
    };
    // Suponiendo que tienes un método create en tu clase Database
    let retornar = null;
    try {
        console.log("llega a la query1");
        const { rows: seCreo} = await client.query(query);
        console.log(seCreo);
        retornar = seCreo;
    }
    catch(error){
        console.log("Error en query, no se pudo crear el evento");
        return { message: "Bad Request" };
    }
    return retornar;
}

    async getMaxCapacity(id:number){
        const query = `SELECT max_capacity FROM event_locations WHERE id = '${id}'`
        const retornado = await client.query(query);
        return retornado;
    }

    async updateEvent(eventito:Eventos, userId:Number) {
        // Lógica para crear un nuevo evento en la base de datos
        console.log(eventito);
        
        const query= `UPDATE events 
        SET name= '${eventito.name}', 
        description= '${eventito.description}',
        id_event_category= ${eventito.id_event_category},
        id_event_location= ${eventito.id_event_location},
        start_date= '${eventito.start_date}', 
        duration_in_minutes =${eventito.duration_in_minutes},
        price=${eventito.price}, 
        enabled_for_enrollment=${eventito.enabled_for_enrollment},
        max_assistance=${eventito.max_assistance}
        WHERE id = ${eventito.id} AND id_creator_user = ${userId} RETURNING * `;
        
        let retornar = null;
        
        try {
            console.log("llega a la query1");
            const { rows: seModifico} = await client.query(query);
            console.log(seModifico);
            retornar = seModifico;
        }
        catch{
            console.log("Error en query, no se pudo modificar el evento");
            return { message: "Bad Request" };
        }
        return retornar;
    }

   async deleteEvent(id, userId)
    {
        const queryEliminarTags = `DELETE FROM event_tags WHERE id_event=(SELECT id from events where id= ${id} and id_creator_user = ${userId})`
        const query= `DELETE FROM events WHERE id = ${id} AND id_creator_user = ${userId}`
        
        try {
            console.log("llega a la query");
            const rowCountTags = await client.query(queryEliminarTags);
            const { rowCount } = await client.query(query);/*si elimina bien el evento devuelve un 1 que es la cantidad de elementos eliminados. no necesito un select, porque me devolveria un array vacio, pero ya lo verifica con el 1 que devuelve el delete */
            if (rowCount === 0) {
                console.log("No se encontró ningún evento para eliminar con el ID proporcionado.");
                return null; // No se encontró ningún evento para eliminar
            }
            console.log("Evento eliminado correctamente.");
            return { message: "Evento eliminado correctamente." };
            /*guarda en una const las rows que le saltan, en este caso */
        }
        catch (error) {
            console.log("Error en query, no se pudo eliminar el evento");
            console.log(error.message);
            return { message: "Bad Request" };
        }
    }
    

    /*9*/
    //verificar si el usuario existe
    /*async verificarExistenciaUsuario(id, username){
        //se debería crear la query que confirme que el id que llega coincide con el id del username}
        const query= `SELECT * FROM users WHERE id = ${id} AND username=${username} `
        
        try {
            const { rowCount } = await client.query(query);;
            
            return rowCount;
        }
        catch{
            console.log("Error en query, no se pudo eliminar el evento");
            return { message: "Error query o database" };
        }
    }*/

    
        //se tiene que hacer lo de agregar el usuario
        //si no se pudo se manda null
        async enrollUsuario(idEvento, idUsuario) {

            // Verificar si el usuario ya está inscrito en el evento
            const query1 = `SELECT * FROM event_enrollments WHERE id_event = ${idEvento} AND id_user = ${idUsuario}`;
            const result1 = await client.query(query1);
            if (result1.rows.length > 0) {
                throw new Error('El usuario ya está inscrito en este evento.');
            }
        
            // Verificar si la fecha del evento aún no ha pasado
            const query2 = {
                text: 'SELECT * FROM events WHERE id = $1 AND start_date > NOW()',
                values: [idEvento]
            };
            const result2 = await client.query(query2);
            if (result2.rows.length === 0) {
                throw new Error('La fecha del evento ya ha pasado.');
            }
        
            // Verificar si no se ha alcanzado la cantidad máxima de personas para el evento
            const query3 = {
                text: 'SELECT count(*) AS num_enrollments FROM event_enrollments WHERE id_event = $1',
                values: [idEvento]
            };
            const result3 = await client.query(query3);
            const numEnrollments = parseInt(result3.rows[0].num_enrollments);
            const query4 = {
                text: 'SELECT max_assistance FROM events WHERE id = $1',
                values: [idEvento]
            };
            const result4 = await client.query(query4);
            const maxAssistance = parseInt(result4.rows[0].max_assistance);
            if (numEnrollments >= maxAssistance) {
                throw new Error('Se ha alcanzado la cantidad máxima de inscripciones para este evento.');
            }
        
            // Inscribir al usuario en el evento
            const query5 = {
                text: 'INSERT INTO event_enrollments(id_event, id_user, registration_date_time) VALUES ($1, $2, NOW()) RETURNING *',
                values: [idEvento, idUsuario]
            };
            const result5 = await client.query(query5);
            const usuarioInscripto = result5.rows[0];
            console.log('Usuario inscrito:', usuarioInscripto);
            return usuarioInscripto;
        }
    
        verificarInscripcion(idEvent, idUser){
            
        }
    patchFeedback(id, observations, rating){
        //deberia retornar el json de como
        return "json"
    }
}