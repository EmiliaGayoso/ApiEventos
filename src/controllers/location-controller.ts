import express, {Request, Response} from "express";
import { LocationService } from "../servicios/location-service";
import { AuthMiddleware } from "../auth/authMiddleware";

const router = express.Router();
const locationService = new LocationService();

router.get("/", async (req: Request, res: Response) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const url = "api/location";

    try {
        const allLoc = await locationService.getAll(Number(limit), Number(offset), url, req.path);
        return res.status(200).json(allLoc);
    } catch (error) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const encontrada = await locationService.getByID(Number(req.params.id));
        return res.status(200).json(encontrada);
    } catch (error) {
        if (error.message === 'Not Found'){
            return res.status(404).json({ message: 'El ID ingresado no corresponde a ninguna locación'})
        }else {
            return res.status(400).json({ message: error.message})
        }
    }
});

//Se necesita autenticacion
router.get("/:id/event-location", AuthMiddleware, async (req: Request, res: Response) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const url = "api/location";
    
    try {
        const eventLocations = await locationService.getAllEventLocations(Number(req.params.id), Number(limit), Number(offset), url, req.path);
        return res.status(200).json(eventLocations);
    } catch (error) {
        if (error.message === 'Not Found'){
            return res.status(404).json({ message: 'El ID ingresado no corresponde a ninguna locación'})
        }
        return res.status(400).json({ message: error.message})
    }
});

export default router;