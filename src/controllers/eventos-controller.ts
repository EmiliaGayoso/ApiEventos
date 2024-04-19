import express, {Request, Response} from "express";
import {EventService} from "../servicios/eventos-service";


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

/*create*/
import Eventos from '../src/models/Eventos'; // no se porque da error

router.post("/", async (req: Request, res: Response) => {
  const eventito= new Eventos();

  try {
    const createdEvent = await eventService.createEvent(eventito);
    return res.status(201).json({
      message: "Evento creado correctamente",
      data: createdEvent, 
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: "Error creando evento" });
  }
});

/*update*/
router.put("/id", async (req: Request, res: Response) => {
  
  const eventito= new Eventos();//crea un nuevo objeto dentro de la clase Eventos pero no funciona

  try {
    const updatedEvent = await eventService.updateEvent(eventito);
    return res.status(201).json({
      message: "Evento creado correctamente",
      data: updatedEvent, 
    });
  } catch (error) {
    console.error("Error creating event:", error);
    return res.status(500).json({ message: "Error creando evento" });
  }
});

/*delete*/
 router.delete( "/:id", (req,res) =>{
  const id=req.params.id;
  if(eventService.deleteEvent(Number(id))){
      return res.status(232).send({
          valido: "evento eliminado correctamente"
      });
  }
  return res.status(400).send("Error en los campos");
});

/*9*/
router.post("/:id/enrollment", (req: Request, res: Response) => {
  
  const id = req.params.id;
  const idUser = req.body.id_user;
  const username = req.body.username;

  try {
    const usuarioExistente = eventService.verificarExistenciaUsuario(Number(idUser), String(username));
    
    if(!usuarioExistente){
      return res.status(405).json({error: `El usuario ingresado es inválido`});
    } else {
      const event = eventService.enrollUser(Number(id), Number(idUser), String(username));
    }
    return res.json("Te pudiste inscribir bien")
  }
  catch{
    console.log("Un Error");
    return res.json("Un Error");
  }
});

/*10*/
/*id del evento, idUser, attended (para verificar), rating (1 a 10) feedback*/
router.patch("/:id/enrollment", (req: Request, res: Response) => {
  
  const id = req.params.id;
  const idUser = req.body.id_user;
  const attended = req.body.attended;
  const rating = req.body.rating;
  const feedback = req.body.feedback;

  try {
    
  }
  catch {
    console.log("Un error");
    return res.json("Un error");
  }

});

export default router;