import express, {Request, Response} from "express";
import {CategoryService} from "../servicios/category-service";

const router = express.Router();
const categoryService = new CategoryService();

router.get("/", async (req: Request, res: Response) => {
    const limit = req.query.pageSize;
    const offset = req.query.page;
    const url = req.originalUrl;

    try {
        const allCat = await categoryService.getAll(Number(limit ?? 0), Number(offset ?? 10), url);
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
        return res.status(200).json(creada);
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
        return res.status(200).json(modificada);
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