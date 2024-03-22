import express, {Request, Response} from "express";
import {
  EventService
} from "../servicios/eventos-service";

const router = express.Router();

router.get("/event", (req: Request, res: Response) => {
  
  const limit = req.query.limit;
  const offset = req.query.offset;

  //Verificar si limit y offset son numeros y existen

  try 
  {
    const eventService = new EventService();
    const allEvent = eventService.getAllEventos(Number(limit), Number(offset), '', "Una Categoria"); //te llama la funcion en eventos-service que activa la query
    return res.json(allEvent);

  } 
  catch (error) 
  {
    console.log("Un Error");
    return res.json("Un Error");
  }
  
});

router.get("/event", (req: Request, res: Response) => {
  //hacer una query para getear 
});

router.get("/event", (req: Request, res: Response) => {
  //hacer una query para getear 
});

router.get("/event", (req: Request, res: Response) => {
  //hacer una query para getear 
});

router.get("/event/:id", (req: Request, res: Response) => {
  //hacer una query para getear 
  /* todos los atributos del Evento, como así también su localizacion (localidad y la provincia) */
});

router.post("/event/:id/enrollment", (req: Request, res: Response) => {
  //hacer una query para getear
});
export default router;