import express, {Request, Response} from "express";
import {EventService} from "../servicios/eventos-service";


const router = express.Router();
const  eventService = new EventService();
// /event, el punto 2
router.get("/", async (req: Request, res: Response) => {
  
  console.log("PAJARO LOCO")

  const limit = req.query.pageSize;
  const offset = req.query.page;
  const url = req.originalUrl;

  const name = req.query.name;
  const cat = req.query.category;
  const fecha = req.query.startDate;
  const tag = req.query.tags;
  const fechaString = String(fecha);
  let fecha2 = new Date(fechaString);

  let nuevaFecha = fecha2 && !isNaN(fecha2.getTime()) ? new Date(fecha2) : new Date();
  //Verificar si limit y offset son numeros y existen

  try 
  {
    //te llama la funcion en eventos-service que activa la query
    const allEvent = await eventService.getAllEventos(Number(limit ?? 0), Number(offset ?? 0), String(url ?? ''), String(name ?? ''), String(cat ?? ''), nuevaFecha, String(tag ?? '')); 
    
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
    const event = await await eventService.getEventoById(Number(req.params.id));

    return res.json(event);
  }
  catch (error) 
  {
    console.log("Un Error");
    return res.json("Un Error");
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

router.post("/", async (req: Request, res: Response) => {
const eventito = req.body;
const user= req.body; // tenes que crear en postman un objeto

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
router.put("/:id", async (req: Request, res: Response) => {
  
  const eventoId = req.params.id;
  const eventito = req.body;//crea un nuevo objeto dentro de la clase Eventos pero no funciona
  const user = req.body;
  try {
    const updatedEvent = await eventService.updateEvent(eventito, Number(eventoId),user);
    return res.status(201).json({
      message: "Evento modificado correctamente",
      data: updatedEvent, 
    });
  } catch (error) {
    console.error("Error modificando event:", error);
    return res.status(500).json({ message: "Error modificando evento" });
  }
});

/*delete*/
 router.delete( "/:id", async(req,res) =>{
  const id=req.params.id;
  const eventito = req.body;
  const user = req.body;
  if(eventService.deleteEvent(eventito,Number(id),user)){
      return res.status(232).send({
          valido: "evento eliminado correctamente"
      });
  }
  return res.status(400).send("Error en los campos");
});

/*9*/
router.post("/:id/enrollment", async(req: Request, res: Response) => {
  
  const id = req.params.id;
  const idUser = req.body.id_user;
  const username = req.body.username;

  try {
    const usuarioExistente = await eventService.verificarExistenciaUsuario(Number(idUser), String(username));
    
    if(!usuarioExistente){
      return res.status(405).json({error: `El usuario ingresado es inválido`});
    } else {
      const event = await eventService.enrollUser(Number(id), Number(idUser), String(username));
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
router.patch("/:id/enrollment", async(req: Request, res: Response) => {
  
  const id = req.params.id;
  const attended = req.body.attended;
  const rating = req.body.rating;
  const observations = req.body.observations;
  //hay que verificar si fue, pero si no fue se debería mandar igual y queda todo lo demas en vacio
  try {
    if(attended==0 && !(Number.isInteger(Number(rating)))){
      return res.status(405).json({error: `El formato ingresado es inválido`});
    }
    const feedback = await eventService.patchFeedback(Number(id), Number(attended), String(observations), Number(rating));
    return res.json("El feedback se pudo cargar de manera exitosa");
  }
  catch {
    console.log("Un error");
    return res.json("Un error");
  }

});

export default router;