"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const provincias_service_1 = require("../servicios/provincias-service");
const router = express_1.default.Router();
const provinciaService = new provincias_service_1.ProvinciaService();
router.get('/provincias/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const provincia = await provinciaService.busquedaId(Number(id));
        res.json(provincia);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/', async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    try {
        const provinciasPaginadas = await provinciaService.traerTodas(Number(limit), Number(offset));
        console.log(provinciasPaginadas);
        res.json(provinciasPaginadas);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/', async (req, res) => {
    const provinciaCrear = req.body;
    try {
        const provinciaCreada = await provinciaService.crearProvincia(provinciaCrear);
        return res.status(201).json({
            message: "La provincia se creó de manera correcta",
            data: provinciaCreada,
        });
    }
    catch (error) {
        console.error("Error al crear la provincia: ", error);
        return res.status(500).json({ message: "Error creando provincia" });
    }
});
router.put('/:id', async (req, res) => {
    const provinciaId = req.params.id;
    const provinciaModificar = req.body;
    try {
        const provinciaModificada = await provinciaService.modificarProvincia(Number(provinciaId), provinciaModificar);
        return res.status(201).json({
            message: "Provincia modificada correctamente",
            data: provinciaModificada,
        });
    }
    catch (error) {
        console.error("Error al modificar la provincia: ", error);
        return res.status(500).json({ message: "Error modificando provincia" });
    }
});
router.delete('/:id', async (req, res) => {
    const provinciaId = req.params.id;
    try {
        await provinciaService.borrarProvincia(Number(provinciaId));
        return res.json("Provincia eliminada");
    }
    catch (error) {
        console.error("Error al eliminar la provincia: ", error);
        return res.status(500).json({ message: "Error eliminando provincia" });
    }
});
exports.default = router;
//# sourceMappingURL=provincias-controller.js.map