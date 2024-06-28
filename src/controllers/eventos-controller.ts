import express, {Request, Response} from "express";
import {EventService} from "../servicios/eventos-service";
import { AuthMiddleware } from "../auth/authMiddleware";
import RequestUser from "../entities/RequestUser";
import { Pagination } from "../entities/Pagination";
import Eventos from "../entities/Eventos";

const router = express.Router();
const  eventService = new EventService();
const pag = new Pagination();
// /event, el punto 2
router.get("/", async (req: Request, res: Response) => {
  
  console.log("event 2 y 3")

  const limit = pag.parseLimit(req.query.pageSize);
  const offset = pag.parseOffset(req.query.page);
  const url = "api/event";

  const name = req.query.name;
  const cat = req.query.category;
  const fecha = req.query.startDate;
  const tag = req.query.tag;
  const fechaString = String(fecha);
  let fecha2 = new Date(fechaString);

  let nuevaFecha = fecha2 && !isNaN(fecha2.getTime()) ? new Date(fecha2) : new Date();
  //Verificar si limit y offset son numeros y existen

  try 
  {
    //te llama la funcion en eventos-service que activa la query
    const allEvent = await eventService.getAllEventos(req.path, String(url), Number(limit ?? 0), Number(offset ?? 0), String(name ?? ''), String(cat ?? ''), nuevaFecha, String(tag ?? '')); 
    
    return res.json(allEvent);
  } 
  catch (error) 
  {
    console.log("Un Error");
    return res.json("Un Error");
  }
});


router.get("/:id", async (req: Request, res: Response) => {
  //hacer una query para getear 
  /* todos los atributos del Evento, como así también su localizacion (localidad y la provincia) */
  console.log("ESTOY EN EVENTOS-CONTROLLER")
  try{
    const event = await eventService.getEventoById(Number(req.params.id));
    return res.json(event);
  }
  catch (error) 
  {
    console.log("Un Error en get by id controller");
    if (error.message === 'Not Found'){
      return res.status(404).json({ message: 'El ID ingresado no corresponde a ningún evento'})
    }else {
      return res.json({ message: error.message });
    }
  }
});

/*5*/
router.get("/:id/enrollment", async (req: Request, res: Response) => {
  //hacer una query para getear
  
  console.log("llego al de enrollment");
  const limit = req.query.limit;
  const offset = req.query.offset;
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const username = req.query.username;
  const attended = req.query.attended;
  const rating = req.query.rating;

  try {
    const event = await eventService.getParticipants(Number(limit), Number(offset), Number(req.params.id ?? 1), String(first_name ?? ''), String(last_name ?? ''), String(username ?? ''), Boolean(attended ?? 'true'), Number(rating ?? '5'));
    /*if(!event){
      return res.status(405).json({error: `El formato ingresado es inválido`})
    }else {}*/
    return res.json(event);
  }
  catch{
    console.log("Un Error");
    return res.json("Un Error");
  }

});


/*8*/

/*create*/
// import Eventos from './../entities/Eventos'; // no se porque da error

router.post("/", AuthMiddleware, async (req: RequestUser, res: Response) => {
const eventito=new Eventos();
eventito.name=req.body.name;
eventito.description=req.body.description;
eventito.id_event_category=req.body.id_event_category;
eventito.id_event_location=req.body.id_event_location;
eventito.start_date=req.body.start_date;
eventito.duration_in_minutes=req.body.duration_in_minutes;
eventito.price=req.body.price;
eventito.enabled_for_enrollment=req.body.enabled_for_enrollment;
eventito.max_assistance=req.body.max_assistance;
eventito.id_creator_user = req.user.id;
console.log(req.user.id);

/*haciendo esto estoy asignando que parte de req body con el atributos de la clase Eventos;*/
const user= req.user; // tenes que crear en postman un objeto

  try {
    const createdEvent = await eventService.createEvent(eventito);
    return res.status(201).json({
      message: "Evento creado correctamente",
      data: createdEvent, 
    });
  } catch (error) {
    if (error.message === 'Bad Request'){
      return res.status(400).json({ message: "Error al completar los campos." });
    }
    console.error("Error creating event:", error);
    return res.json({ message: error.message });
  }
});

/*update*/
router.put("/", AuthMiddleware, async (req: RequestUser, res: Response) => {
  
  const eventito = req.body;//crea un nuevo objeto dentro de la clase Eventos pero no funciona
  const userId = req.user.id;
  try {
    const updatedEvent = await eventService.updateEvent(eventito,userId);
    return res.status(201).json({
      message: "Evento modificado correctamente",
      data: updatedEvent, 
    });
  } catch (error) {
    if (error.message === 'Bad Request'){
      return res.status(400).json({ message: "Error al completar los campos." });
    }
    else if (error.message === 'Not Found'){
      return res.status(404).json({ message: "El evento que busca modificar no existe o no tienen ese ID" });
    }
    console.error("Error modificando event:", error);
    return res.json({ message: error.message });
  }
});

/*delete*/
 router.delete( "/:id", AuthMiddleware, async (req: RequestUser, res: Response) =>{
  const id=req.params.id;
  const userId = req.user.id;
  console.log(userId);

  try {
    await eventService.deleteEvent(Number(id),userId);
    return res.status(200).send({valido: "evento eliminado correctamente"});
  } catch (error) {
    if(error.message === 'Not Found'){
      return res.status(404).json({ message: 'El ID ingresado no corresponde a ningún evento de su dominio'})
    } else if (error.message === 'Bad Request'){
      return res.status(400).send("El evento no se puede eliminar porque hay al menos 1 usuario inscripto");
    }
    return res.status(500);
  }
});

/*9 inscripcion a un evento*/
router.post("/:id/enrollment", AuthMiddleware, async(req: Request, res: Response) => {
  
  const id = req.params.id;
  const idUser = req.body.id_user;
  const username = req.body.username;

  try {
    try {
      const eventDisponible = await eventService.getEventoById(Number(id));
      if(!eventDisponible.enabled_for_enrollment){
        return res.status(400).json({message: 'El evento al que quiere inscribirse no tiene la inscripción abierta'});
      }else if(eventDisponible.current_attendance >= eventDisponible.max_assistance){
        return res.status(400).json({message: 'El evento al que quiere inscribirse ya no tiene cupos disponibles'});
      }
    } catch (error) {
      if(error.message === 'Not Found'){
        return res.status(404).json({ message: 'El evento que busca no existe'})
      }
    }
    const yaInscripto = await eventService.userYaInscripto(Number(id), Number(idUser));
    if(yaInscripto !== null){
      return res.status(400).json({message: 'Ya estás inscripto al evento deseado'})
    }else{
      const inscripto = await eventService.enrollUser(Number(id), Number(idUser), /*String(username)*/);
      if(inscripto !== null)
      return res.status(201).json({message: 'Te pudiste inscribir bien'});
    }
    return res.json('todo bien');
  }
  catch (error){
    console.log("Un Error");
    return res.json("Un Error");
  }
});

router.delete("/:id/enrollment", AuthMiddleware, async (req: Request, res: Response) => {
  const id = req.params.id;
  const idUser = req.body.id_user;
  try {
    const eventDisponible = await eventService.getEventoById(Number(id));
      if(eventDisponible.start_date <= Date.now()){
        return res.status(400).json({message: 'El evento al que quiere inscribirse no tiene la inscripción abierta'});
      }
    const yaInscripto = await eventService.userYaInscripto(Number(id), Number(idUser));
    if(yaInscripto === null){
      return res.status(400).json({message: 'No estás inscripto al evento deseado'})
    }
    const eliminado = await eventService.deleteEnrollment(Number(id), Number(idUser))
  } catch (error) {
    console.log("Un Error");
    return res.json("Un Error");
  }
});

/*10 rating del evento*/
/*id del evento, idUser, attended (para verificar), rating (1 a 10) feedback*/
router.patch("/:id/enrollment/:entero", AuthMiddleware, async(req: Request, res: Response) => {
  
  const id = req.params.id;
  const rating = req.params.entero;
  const observations = req.body.observations;
  //hay que verificar si fue, pero si no fue se debería mandar igual y queda todo lo demas en vacio
  try {
    if(!(Number.isInteger(Number(rating)))){
      return res.status(405).json({error: `El formato ingresado es inválido`});
    }
    const feedback = await eventService.patchFeedback(Number(id), String(observations), Number(rating));
    return res.status(200).json("El feedback se pudo cargar de manera exitosa");
  }
  catch (error) {
    if (error.message === 'Not Found'){
      return res.status(404).json({message : "El ID ingresado no corresponde a ningún evento"});
    }else if (error.message === 'Bad Request'){
      return res.status(400).json({ message: "El usuario ingresado no está registrado en el evento seleccionado, o a completado alguno de los campos de manera incorrecta"});
    }
    return res.json("Un error");
  }

});



export default router;