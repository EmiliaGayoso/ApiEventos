import express, {Request, Response} from "express";
import { ProvinciaService } from "../servicios/provincias-service";


const router = express.Router();
const provinciaService = new ProvinciaService();

// Obtener una provincia por ID
router.get('/provincias/:id', async (req, res) => {
    const id = req.params.id
    try {
      const provincia = await provinciaService.busquedaId(Number(id));
      res.status(200).json(provincia);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
//las provincias paginadas
router.get('/', async (req, res) => {
  const limit = req.query.limit;
  const offset = req.query.offset;
  try {
    const provinciasPaginadas = await provinciaService.traerTodas(Number(limit), Number(offset));
    console.log(provinciasPaginadas);
    res.json(provinciasPaginadas);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    console.error("Error al crear la provincia: ", error);
    return res.status(400).json({ message: "Error creando provincia" });
  }
});

//modificar la provincia
router.put('/:id', async (req, res) => {
  const provinciaId = req.params.id;
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
    return res.json("Provincia eliminada");
  }
  catch (error) {
    console.error("Error al eliminar la provincia: ", error);
    return res.status(404).json({ message: "No se encontro una provincia con ese ID" });
  }
});
  
  export default router;