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

router.post("/:id/enrollment", (req: Request, res: Response) => {
  //hacer una query para getear

  const first_name = req.query.first_name;
  const last_name = req.query.last_name;
  const username = req.query.username;
  const attended = req.query.attended;
  const rating = req.query.rating;

  try {
    const event = eventService.getParticipants(Number(req.params.id), String(first_name), String(last_name), String(username), Boolean(attended), Number(rating));
    return res.json(event);
  }
  catch{
    console.log("Un Error");
    return res.json("Un Error");
  }

});
export default router;