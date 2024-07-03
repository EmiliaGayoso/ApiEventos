"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const location_service_1 = require("../servicios/location-service");
const authMiddleware_1 = require("../auth/authMiddleware");
const router = express_1.default.Router();
const locationService = new location_service_1.LocationService();
router.get("/", async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const url = "api/location";
    try {
        const allLoc = await locationService.getAll(Number(limit), Number(offset), url, req.path);
        return res.status(200).json(allLoc);
    }
    catch (error) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});
router.get("/:id", async (req, res) => {
    try {
        const encontrada = await locationService.getByID(Number(req.params.id));
        return res.status(200).json(encontrada);
    }
    catch (error) {
        if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'El ID ingresado no corresponde a ninguna locación' });
        }
        else {
            return res.status(400).json({ message: error.message });
        }
    }
});
router.get("/:id/event-location", authMiddleware_1.AuthMiddleware, async (req, res) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const url = "api/location";
    try {
        const eventLocations = await locationService.getAllEventLocations(Number(req.params.id), Number(limit), Number(offset), url, req.path);
        return res.status(200).json(eventLocations);
    }
    catch (error) {
        if (error.message === 'Not Found') {
            return res.status(404).json({ message: 'El ID ingresado no corresponde a ninguna locación' });
        }
        return res.status(400).json({ message: error.message });
    }
});
exports.default = router;
//# sourceMappingURL=location-controller.js.map