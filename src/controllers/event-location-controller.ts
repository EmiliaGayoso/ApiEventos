import express, {Request, Response} from "express";
import { EventLocationService } from "../servicios/event-location-service";
import { AuthMiddleware } from "../auth/authMiddleware";
import User from "../entities/User";
import UserToken from "../entities/UserToken";
import RequestUser from "../entities/RequestUser";

const router = express.Router();
const eventLocService = new EventLocationService();



router.get("/", AuthMiddleware, async (req: RequestUser, res: Response) => {
    const limit = req.query.pageSize;
    const offset = req.query.page;
    const url = "api/event-location";

    try {
        const allEventLoc = await eventLocService.getAll(Number(limit), Number(offset),url, req.path);
        return res.status(200).json(allEventLoc);
    } catch (error) {
        console.log("Se encontró un error en event location controller");
        return res.json("Un Error");
    }
    
});

router.get("/:id", AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const eventLocBuscado = await eventLocService.getById(Number(req.params.id));
        return res.status(200).json(eventLocBuscado);
    } catch (error) {
        if (error.message === 'Not Found'){
            return res.status(404).json({ message: 'El ID ingresado no corresponde a ningún evento. El usuario no está autenticado'})
        }else {
            return res.status(400).json({ message: error.message})
        }
    }
});

router.post("/", AuthMiddleware, async (req: RequestUser, res: Response) => {
    try {
        const user = req.user.id;
        const crear = req.body;
        const creda = await eventLocService.crearEventLoc(crear, user);
        return res.status(200).json(creda);
    } catch (error) {
        if(error.message === 'Bad Request'){
            return res.status(400).json({   message: 'Hubo un error en uno de los campos ingresados' });
        }
        return res.json(error.message)
    }
});

router.put("/", AuthMiddleware, async (req: RequestUser, res: Response) => {
    try {
        const user = req.user.id;
        const modificar = req.body;
        const modificada = await eventLocService.modificarEventLoc(modificar,user);
        return res.status(200).json(modificada);
    } catch (error) {
        if(error.message === 'Bad Request'){
            return res.status(400).json({   message: 'Hubo un error en uno de los campos ingresados' });
        }else if (error.message === 'Not Found'){
            return res.status(404).json({   message: 'El ID ingresado no pertence a ninguna locación o no tienes la autorización para poder modificarla' });
        }
        return res.json(error.message)
    }
});

router.delete("/:id", AuthMiddleware, async (req: RequestUser, res: Response) => {
    try {
        const user = req.user.id;
        const eliminado = eventLocService.borrarEventLoc(Number(req.params.id),user)
        return res.status(200).json(eliminado)
    } catch (error) {
        if(error.message === 'Not Found'){
            return res.status(404).json({   message: 'El ID ingresado no pertenece a ninguna locación o no tienes la autorización suficiente para poder eliminarla' });
        }
        return res.status(error.message);
    }
});

export default router;