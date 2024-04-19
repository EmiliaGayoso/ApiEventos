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
  
  // Obtener todas las provincias con paginación
//   router.get('/Provincias', async (req, res) => {
//     const page = req.query.page || 1;
//     const limit = req.query.limit || 10;
//     const offset = req.query.offset || 0;
  
//     try {
//       const provincias = await provinciaService.traerTodas(Number(limit),Number(offset));
//       res.json({
//         total: provincias.count,
//         results: provincias.rows,
//       });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
//   // Crear una nueva provincia
//   router.post('/Provincias', async (req, res) => {
//     try {
//       const provincia = await provinciaService.crearProvincia(req.body);
//       res.status(201).json(provincia);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Actualizar una provincia por ID
//   router.put('/Provincias/:id', async (req, res) => {
//     try {
//       const provincia = await provinciaService.modificarProvincia(req.body, {
//         where: { id: req.params.id },
//         returning: true,
//       });
//       res.json(provincia[1][0]);
//     } catch (err) {
//       res.status(400).json({ message: err.message });
//     }
//   });
  
//   // Eliminar una provincia por ID
//   router.delete('/Provincias/:id', async (req, res) => {
//     try {
//       await provinciaService.borrarProvincia({
//         where: { id: req.params.id },
//       });
//       res.json({ message: 'Provincia eliminada' });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
  
  export default router;