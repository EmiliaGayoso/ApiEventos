import express, {Request, Response} from "express";
import {
  EventService
} from "../servicios/eventos-service";

const router = express.Router();

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
    const eventService = new EventService();
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

router.get("/", (req: Request, res: Response) => {
  //hacer una query para getear 
  const limit = req.query.limit;
  const offset = req.query.offset;
  const name = req.query.name;

  //Verificar si limit y offset son numeros y existen

  try 
  {
    const eventService = new EventService();
    //te llama la funcion en eventos-service que activa la query
    const eventWithName = eventService.getEventoNombre(String(name)); 
    
    return res.json(eventWithName);

  } 
  catch (error) 
  {
    console.log("Un Error");
    return res.json("Un Error");
  }

});

router.get("/", (req: Request, res: Response) => {
  //hacer una query para getear 
});

router.get("/", (req: Request, res: Response) => {
  //hacer una query para getear 
});

router.get("/:id", (req: Request, res: Response) => {
  //hacer una query para getear 
  /* todos los atributos del Evento, como así también su localizacion (localidad y la provincia) */
});

router.post("/:id/enrollment", (req: Request, res: Response) => {
  //hacer una query para getear
});
export default router;