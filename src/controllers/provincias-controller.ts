import express, {Request, Response} from "express";
import { ProvinciaService } from "../servicios/provincias-service";


const router = express.Router();
const provinciaService = new ProvinciaService();

// Obtener una provincia por ID
router.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
      const provincia = await provinciaService.busquedaId(Number(id));
      return res.status(200).json(provincia);
    } catch (error) {
      if (error.message === 'Not Found')
      return res.status(404).json({ message: error.message });
      return res.json(error);
    }
  });
  
//las provincias paginadas
router.get('/', async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const url = "api/provincias";
  try {
    const provinciasPaginadas = await provinciaService.traerTodas(Number(limit), Number(offset), url, req.path);
    console.log(provinciasPaginadas);
    res.json(provinciasPaginadas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/:id/locations', async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  const url = "api/provincias";

  try {
    const locProvPaginadas = await provinciaService.traerTodasLoc(Number(req.params.id), Number(limit), Number(offset), url, req.path)
    res.json(locProvPaginadas);
  } catch (error) {
    if (error.message === 'Not Found'){
      res.status(404).json({ message: 'El ID ingresado no corresponde a ninguna provincia'});
    }
    res.json({message: error.message});
  }
});

//creacion de provincia
router.post('/', async (req, res) => {
  const provinciaCrear = req.body;

  try {
    const provinciaCreada = await provinciaService.crearProvincia(provinciaCrear)
    return res.status(201).json({
      message: "La provincia se creó de manera correcta",
      data: provinciaCreada,
    });
  }
  catch (error) {
    if (error.message === 'Bad Request'){
      return res.status(400).json({ message: "Error creando provincia, los valores ingresados no conciden con lo pedido"});
    }else {
      return res.status(500).json({ message: error.message});
    }
  }
});

//modificar la provincia
router.put('/', async (req, res) => {
  const provinciaId= req.body.id;
  const provinciaModificar = req.body;

  try {
    const provinciaModificada = await provinciaService.modificarProvincia(Number(provinciaId), provinciaModificar);
    console.log("se creo la provincia")
    res.status(200).json({
      message: "Provincia modificada correctamente",
      data: provinciaModificada,
    });
  }
  catch(error) {
    if (error.message === 'Not found'){
      res.status(404).json({ message: "No se encontro la provincia con ese id"});
    }else{
      res.status(400).json({ message: error.message});
    }
    console.error("Error al modificar la provincia: ", error);
  }
});

//eliminar la provincia
router.delete('/:id', async (req, res) => {
  const provinciaId = req.params.id;

  try {
    await provinciaService.borrarProvincia(Number(provinciaId));
    return res.status(200).json({
      message: "Provincia eliminada"
    });
  }
  catch (error) {
    console.error("Error al eliminar la provincia: ", error);
    if (error.message === 'Not Found'){
      return res.status(404).json({ message: "No se encontro una provincia con ese ID" });
    }else {
      return res.status(400).json({ message: error.message });
    }
    
  }
});
  
  export default router;