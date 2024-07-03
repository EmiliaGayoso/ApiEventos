import express, {Request, Response} from "express";
import {CategoryService} from "../servicios/category-service";

const router = express.Router();
const categoryService = new CategoryService();

router.get("/", async (req: Request, res: Response) => {
    const limit = req.query.limit;
    const offset = req.query.offset;
    const url = "api/event-category";

    try {
        const allCat = await categoryService.getAll(Number(limit), Number(offset), url, req.path);
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
    const catCrear = req.body;
    try {
        const creada = await categoryService.crearCategoria(catCrear);
        return res.status(201).json({message: 'La categoría fue creada'});
    } catch (error) {
        if (error.message === 'Bad Request'){
            return res.status(400).json({   message: 'El nombre está vacío o tiene menos de 3 caracteres' });
        }
        return res.status(500).json({ message: error.message});
    }
});

router.put("/", async (req: Request, res: Response) => {
    const catModificar = req.body;
    try {
        const modificada = await categoryService.modificarCategoria(catModificar);
        return res.status(200).json({ message: 'La categoría fue modificada'});
    } catch (error) {
        if (error.message === 'Bad Request'){
            return res.status(400).json({   message: 'El nombre está vacío o tiene menos de 3 caracteres' });
        }else if (error.message === 'Not Found'){
            return res.status(404).json({   message: 'El id ingresado no corresponde a ninguna Categoria' });
        }
        return res.status(500).json({ message: error.message});
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        await categoryService.eliminarCategoria(Number(id));
        return res.status(200).json({   message: 'Categoria eliminada'  });
    } catch (error) {
        if (error.message === 'Not Found'){
            return res.status(404).json({   message: 'El id ingresado no corresponde a ninguna Categoria' });
        }
        return res.status(500).json({ message: error.message});
    }
});

export default router;