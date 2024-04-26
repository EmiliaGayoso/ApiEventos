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
    catch (err) {
        res.status(500).json({ message: err.message });
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
    catch (err) {
        res.status(500).json({ message: err.message });
    }
});
router.post('/', async (req, res) => {
    const provinciaCrear = req.body;
});
router.patch('/', async (req, res) => {
});
router.delete('/', async (req, res) => {
});
exports.default = router;
//# sourceMappingURL=provincias-controller.js.map