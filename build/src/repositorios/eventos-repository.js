"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRepository = void 0;
const pg_1 = __importDefault(require("pg"));
const bd_1 = require("../repositorios/bd");
const client = new pg_1.default.Client(bd_1.config);
console.log('config', bd_1.config);
client.connect();
class EventRepository {
    async getAllEvents(name, cat, fecha, tag, limit, offset, queryWhere) {
        console.log("llego a getAllEvents");
        const query1 = `SELECT DISTINCT ON (e.id) e.id, e.name, e.description, e.start_date, e.duration_in_minutes, e.price, e.max_assistance FROM events e
        LEFT JOIN event_categories ON e.id_event_category = event_categories.id
        LEFT JOIN event_tags ON event_tags.id_event = e.id 
        LEFT JOIN tags ON event_tags.id_tag = tags.id
        ` + queryWhere;
        const queryCount = 'SELECT COUNT(id) as total FROM events';
        try {
            console.log("llega a la query1");
            const { rows: resultado1 } = await client.query(query1);
            console.log("llega a query2");
            const { rows: resultado2 } = await client.query(queryCount);
            console.log(Number(resultado2));
            return [resultado1, resultado2[0].total];
        }
        catch (_a) {
            console.log("Error en query");
            return ("Query Error");
        }
    }
    async getEventById(id) {
        console.log("ESTOY EN EVENTOS-REPOSITORY con id: ", id);
        const queryId = `SELECT 
        e.*, 
        ec.name as category_name, 
        el.name as event_location_name, 
        el.full_address, 
        el.latitude as event_location_latitude, 
        el.longitude as event_location_longitude, 
        el.max_capacity as event_location_max_capacity,
        l.id as location_id,
        l.name as location_name,
        l.latitude as location_latitude,
        l.longitude as location_longitude,
        pr.id as province_id,
        pr.name as province_name,
        pr.full_name as province_full_name,
        pr.latitude as province_latitude,
        pr.longitude as province_longitude,
        pr.display_order as province_display_order 
        FROM events e
        LEFT JOIN locations l ON e.id_event_location = l.id
        LEFT JOIN provinces pr ON l.id_province = pr.id
        LEFT JOIN event_locations el ON e.id_event_location = el.id
        LEFT JOIN event_tags et ON e.id = et.id_event

        LEFT JOIN tags tg ON et.id_tag = tg.id

        LEFT JOIN event_categories ec ON e.id_event_category = ec.id
        LEFT JOIN users u ON e.id_creator_user = u.id
        WHERE e.id = ${id}`;
        let retornar = null;
        try {
            console.log("llega a la query1");
            const { rows: result } = await client.query(queryId);
            if (result.length > 0) {
                retornar = result[0];
            }
        }
        catch (_a) {
            console.log("Error en query getByID");
        }
        console.log(retornar);
        return retornar;
    }
    async getParticipants(id, limit, offset, queryWhere) {
        console.log("llega a getParticipant repository");
        const queryParticipants = `SELECT er.*,u.first_name,u.last_name,u.username,e.name FROM event_enrollments er
        LEFT JOIN users u ON er.id_user = u.id
        LEFT JOIN events e ON er.id_event = e.id 
		LEFT JOIN event_tags et ON e.id = et.id_event
        LEFT JOIN tags ON et.id = tags.id
        WHERE e.id = ${id}` + queryWhere;
        const query2 = `select count(*) from event_enrollments`;
        try {
            console.log("llega a la query1");
            const { rows: participants } = await client.query(queryParticipants);
            console.log(participants);
            console.log("llega a query2");
            const { rows: countParticipants } = await client.query(query2);
            return [participants, countParticipants];
        }
        catch (_a) {
            console.log("Error en query");
            return ("Query Error");
        }
    }
    async createEvent(eventito) {
        console.log('llega a repo create event');
        console.log("aaa");
        console.log(eventito.start_date.toString());
        console.log(eventito.id_creator_user);
        const query = {
            text: 'INSERT INTO events (name,description,id_event_category,id_event_location, start_date,duration_in_minutes,price,enabled_for_enrollment,max_assistance,id_creator_user) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *',
            values: [eventito.name, eventito.description, eventito.id_event_category, eventito.id_event_location, eventito.start_date, eventito.duration_in_minutes, eventito.price, eventito.enabled_for_enrollment, eventito.max_assistance, eventito.id_creator_user]
        };
        let retornar = null;
        try {
            console.log("llega a la query1");
            const { rows: seCreo } = await client.query(query);
            console.log(seCreo);
            retornar = seCreo;
        }
        catch (error) {
            console.log("Error en query, no se pudo crear el evento");
            return { message: "Bad Request" };
        }
        return retornar;
    }
    async getMaxAssistance(id) {
        const query = `SELECT max_assistance FROM events WHERE id = $1`;
        const result = await client.query(query, [id]);
        if (result.rows.length > 0) {
            const maxAsistencia = result.rows[0].max_assistance;
            console.log("Capacidad máxima:", maxAsistencia);
            return maxAsistencia;
        }
        else {
            return null;
        }
    }
    async getMaxCapacity(id) {
        const query = `SELECT max_capacity FROM event_locations WHERE id = '${id}'`;
        const retornado = await client.query(query);
        return retornado;
    }
    async updateEvent(eventito, userId) {
        console.log(eventito);
        const query = `UPDATE events 
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
            const { rows: seModifico } = await client.query(query);
            console.log(seModifico);
            retornar = seModifico;
        }
        catch (_a) {
            console.log("Error en query, no se pudo modificar el evento");
            return { message: "Bad Request" };
        }
        return retornar;
    }
    async deleteEvent(id, userId) {
        const queryEliminarTags = `DELETE FROM event_tags WHERE id_event=(SELECT id from events where id= ${id} and id_creator_user = ${userId})`;
        const query = `DELETE FROM events WHERE id = ${id} AND id_creator_user = ${userId}`;
        try {
            console.log("llega a la query");
            const rowCountTags = await client.query(queryEliminarTags);
            const { rowCount } = await client.query(query);
            if (rowCount === 0) {
                console.log("No se encontró ningún evento para eliminar con el ID proporcionado.");
                return null;
            }
            console.log("Evento eliminado correctamente.");
            return { message: "Evento eliminado correctamente." };
        }
        catch (error) {
            console.log("Error en query, no se pudo eliminar el evento");
            console.log(error.message);
            return { message: "Bad Request" };
        }
    }
    async verificarInscripcion(idEvent, idUser) {
        const query = `SELECT * FROM event_enrollments WHERE id_event = ${idEvent} AND id_user=${idUser}`;
        try {
            const { rowCount } = await client.query(query);
            if (rowCount === 0) {
                return false;
            }
            return true;
        }
        catch (error) {
            console.log("Error en query, no se pudo ver si el usuario esta en el evento:", error);
            throw new Error('Error en la verificación de inscripción');
        }
    }
    async enrollUsuario(idEvento, idUsuario) {
        try {
            const existe = await this.verificarInscripcion(idEvento, idUsuario);
            if (existe) {
                throw new Error('Bad Request inscripto');
            }
            const evento = await client.query(`SELECT start_date FROM events WHERE id = ${idEvento}`);
            const hoy = new Date();
            if (evento.rows.length > 0) {
                const startDate = new Date(evento.rows[0].start_date);
                if (startDate.getTime() < hoy.getTime()) {
                    throw new Error('Bad Request cerrado');
                }
                const cantInscriptos = await client.query(`SELECT COUNT(*) FROM event_enrollments WHERE id_event = ${idEvento}`);
                const maxAsistencia = await this.getMaxAssistance(idEvento);
                if (cantInscriptos >= maxAsistencia) {
                    console.log("llego agotado");
                    console.log("max asistencias: " + maxAsistencia);
                    console.log("enrollment: " + cantInscriptos);
                    throw new Error('Bad Request agotado');
                }
            }
            else {
                throw new Error('Not Found');
            }
            console.log('9 enroll hoy:', hoy);
            console.log('9 enroll lelga a la query de insert into enrollments');
            await client.query(`
                INSERT INTO event_enrollments (id_event, id_user, registration_date_time) VALUES ($1, $2, $3)`, [idEvento, idUsuario, hoy]);
            return { success: true, message: 'Usuario inscrito correctamente en el evento.' };
        }
        catch (error) {
            console.error('Error al inscribir usuario:', error);
            throw new Error(error.message || 'Ocurrió un error al intentar inscribir al usuario en el evento.');
        }
    }
    async eliminarEnrollment(idEvento, idUsuario) {
        try {
            const existe = await this.verificarInscripcion(idEvento, idUsuario);
            if (!existe) {
                throw new Error('Bad Request noInscripto');
            }
            const evento = await client.query(`SELECT start_date FROM events WHERE id = ${idEvento}`);
            const hoy = new Date();
            if (evento.rows.length > 0) {
                const startDate = new Date(evento.rows[0].start_date);
                if (startDate.getTime() < hoy.getTime()) {
                    throw new Error('Bad Request cerrado');
                }
            }
            else {
                throw new Error('Not Found');
            }
            await client.query(`
                DELETE FROM event_enrollments WHERE id_event = $1 AND id_user = $2`, [idEvento, idUsuario]);
            return { success: true, message: 'Usuario eliminado correctamente del evento.' };
        }
        catch (error) {
            console.error('Error al eliminar usuario:', error);
            throw new Error(error.message || 'Ocurrió un error al intentar eliminar al usuario del evento.');
        }
    }
    async ingresoFeedback(idEvent, idUser, observations, rating) {
        try {
            const existe = await this.verificarInscripcion(idEvent, idUser);
            console.log('Registrado en evento', existe);
            if (!existe) {
                throw new Error('Bad Request noInscripto');
            }
            console.log('10, llega a verificarion de fecha');
            const evento = await this.getEventById(idEvent);
            if (evento.start_date >= Date.now()) {
                throw new Error('Bad Request noSucedio');
            }
            console.log('10, llega al UPDATE');
            await client.query(`UPDATE event_enrollments SET rating = $1, observations = $2 WHERE id_event = $3 AND id_user = $4`, [rating, observations, idEvent, idUser]);
            console.log('Punto 10, pasa el UPDATE');
            const { rowCount } = await client.query(`SELECT * FROM event_enrollments WHERE observations = $1 AND rating = $2`, [observations, rating]);
            if (rowCount > 0) {
                return { success: true, message: 'El feedback se pudo cargar de manera exitosa' };
            }
            return { success: false };
        }
        catch (error) {
            console.error('Error al actualizar el feedback:', error);
            throw new Error(error.message || 'Ocurrió un error al intentar actualizar el feedback del evento.');
        }
    }
}
exports.EventRepository = EventRepository;
//# sourceMappingURL=eventos-repository.js.map