import express, {Request, Response} from "express";
import {CategoryService} from "../servicios/category-service";

const router = express.Router();
const categoryService = new CategoryService();

router.get("/", async (req: Request, res: Response) => {
    const limit = req.query.pageSize;
    const offset = req.query.page;

    try {
        const allCat = await categoryService.getAll(Number(limit ?? 0), Number(offset ?? 10));
        return res.status(200).json(allCat);
    } catch (error) {
        console.log("Un Error");
        return res.json("Un Error");
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const encontrada = await categoryService.getByID(Number(req.params.id));
        return res.status(200).json(encontrada);
    } catch (error) {
        if (error.message === 'Not Found'){
            return res.status(404).json({ message: 'El ID ingresado no corresponde a ninguna categoría'})
        }else {
            return res.status(400).json({ message: error.message})
        }
    }
});

router.post("/", async (req: Request, res: Response) => {
    
});

router.put("/", async (req: Request, res: Response) => {
    
});

router.delete("/:id", async (req: Request, res: Response) => {
    
});

export default router;