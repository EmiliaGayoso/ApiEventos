import express, {Request, Response} from "express";
import { ProvinciaService } from "../servicios/provincias-service";


const router = express.Router();
const provinciaService = new ProvinciaService();

// Obtener una provincia por ID
router.get('/provincias/:id', async (req, res) => {
    const id = req.params.id
    try {
      const provincia = await provinciaService.busquedaId(Number(id));
      res.json(provincia);
    } catch (err) {
      res.status(500).json({ message: err.message });
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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//creacion de provincia
router.post('/', async (req, res) => {
  const provinciaCrear = req.body;
});

//modificar la provcincia
router.patch('/', async (req, res) => {

});

//eliminar la provincia
router.delete('/', async (req, res) => {

});
  
  export default router;