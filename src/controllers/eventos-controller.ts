import express, {Request, Response} from "express";
import {
  EventService
} from "../servicios/eventos-service";

const router = express.Router();
const eventService = new EventService();
// /event, el punto 2
router.get("/", (req: Request, res: Response) => {
  
  const limit = req.query.limit;
  const offset = req.query.offset;
  const name = req.query.name;
  const cat = req.query.cat;
  const fecha = req.query.fecha;
  const tag = req.query.tag;
  const fechaString = String(fecha);
  new Date(fechaString);

  //Verificar si limit y offset son numeros y existen

  try 
  {
    //te llama la funcion en eventos-service que activa la query
    const allEvent = eventService.getAllEventos(Number(limit), Number(offset), String(name), String(cat), new Date(fechaString), String(tag)); 
    
    return res.json(allEvent);

  } 
  catch (error) 
  {
    console.log("Un Error");
    return res.json("Un Error");
  }
});


router.get("/:id", (req: Request, res: Response) => {
  //hacer una query para getear 
  /* todos los atributos del Evento, como así también su localizacion (localidad y la provincia) */

  try{
    const event = eventService.getEventoById(Number(req.params.id));

    return res.json(event);
  }
  catch (error) 
  {
    console.log("Un Error");
    return res.json("Un Error");
  }
});

/*5*/
router.post("/:id/enrollment", (req: Request, res: Response) => {
  //hacer una query para getear
  
  const limit = req.query.limit;
  const offset = req.query.offset;
  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const username = req.query.username;
  const attended = req.query.attended;
  const rating = req.query.rating;

  try {
    const event = eventService.getParticipants(Number(limit), Number(offset), Number(req.params.id), String(first_name), String(last_name), String(username), Boolean(attended), Number(rating));
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

// Create Event

router.post("/", (req: Request, res: Response) => {
  //hacer una query para getear
/*crear una clase llama event, y hacer objeto EMIIIIIIIIIIIIIIIII*/

  try {
    const event = eventService.createEvent(req.body);
    if(!event){
      return res.status(405).json({error: `El formato ingresado es inválido`})
    }else {}
    return res.json(event);
  }
  catch{
    console.log("Un Error");
    return res.json("Un Error");
  }

});

/*más del 8*/
/*
export async function createEvent(req: Request, res: Response): Promise<void> {
    try {
        // Extract event data from request body
        const eventData: Event = req.body;

        // Call service to create event
        const newEvent: Event = await eventService.createEvent(eventData);

        // Return the newly created event
        res.json(newEvent);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Failed to create event" });
    }
}

Edit Event
export async function editEvent(req: Request, res: Response): Promise<void> {
    const eventId: number = parseInt(req.params.id, 10);
    const userId: number = req.body.id; // Assuming you have user information in request

    try {
        // Check if the user is the creator of the event
        const isCreator: boolean = await eventService.isUserEventCreator(eventId, userId);
        if (!isCreator) {
            return res.status(403).json({ error: "You are not authorized to edit this event" });
        }

        // Extract updated event data from request body
        const eventData: Event = req.body;

        // Call service to edit event
        const updatedEvent: Event | null = await eventService.editEvent(eventId, eventData);

        if (updatedEvent) {
            // Return the updated event
            res.json(updatedEvent);
        } else {
            res.status(404).json({ error: "Event not found" });
        }
    } catch (error) {
        console.error("Error editing event:", error);
        res.status(500).json({ error: "Failed to edit event" });
    }
}

Delete Event
export async function deleteEvent(req: Request, res: Response): Promise<void> {
    const eventId: number = parseInt(req.params.id, 10);
    const userId: number = req.body.id; // Assuming you have user information in request

    try {
        // Check if the user is the creator of the event
        const isCreator: boolean = await eventService.isUserEventCreator(eventId, userId);
        if (!isCreator) {
            return res.status(403).json({ error: "You are not authorized to delete this event" });
        }

        // Call service to delete event
        const deletedEvent: boolean = await eventService.deleteEvent(eventId);

        if (deletedEvent) {
            // Return success message
            res.json({ message: "Event deleted successfully" });
        } else {
            res.status(404).json({ error: "Event not found" });
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({ error: "Failed to delete event" });
    }
}*/

/*9*/
router.post("/:id/enrollment", (req: Request, res: Response) => {
  
  const idUser = req.body;
  const id = req.params.id;
  const username = req.body.username;

  try {
    const usuarioExistente = eventService.verificarExistenciaUsuario(Number(idUser), String(username));
    if(!usuarioExistente){
      return res.status(405).json({error: `El usuario ingresado es inválido`});
    } else {
      const event = eventService.enrollUser(Number(id), Number(idUser));
    }
    //se deberia fijar si existe el evento
    return res.json("Te pudiste inscribir bien")
  }
  catch{
    console.log("Un Error");
    return res.json("Un Error");
  }

});

export default router;