import { CategoryRepository } from "../repositorios/category-repository";
import { Pagination } from "../entities/Pagination";
import Categories from "../entities/Categorias";

export class CategoryService {

    async getAll(limit: number, offset: number, url: string){
        
        const pag = new Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);

        const categoryRepository = new CategoryRepository();
        const [allCategories, cantidadCategories] = await categoryRepository.getAll(parsedLimit, parsedOffset);
        const devolver = {
            collection: allCategories,

            pagination: {
                pageSize: parsedLimit,
                page: parsedOffset,
                nextPage: pag.buildNextPage(url,parsedLimit,parsedOffset),
                total: Number(cantidadCategories)
            }
        }
        return devolver;

    }

    async getByID(id: number){
        const categoryRepository = new CategoryRepository();
        let cat = null;
        try {
            cat = await categoryRepository.getById(id);;
        } catch (error) {
            console.log("error")
        }
        if (cat === null){
            throw new Error ('Not Found')
        }
        return cat;
    }

    async crearCategoria(catCrear: Categories){
        const categoryRepository = new CategoryRepository();
        let cat = null;
        try {
            cat = await categoryRepository.crearCat(catCrear);
        } catch (error) {
            console.log("error en crear categoria");
        }
        if (catCrear.name === null || catCrear.name.length <= 3){
            throw new Error ('Bad Request');
        }
        return cat;
    }

    async modificarCategoria(catModificar: Categories){
        const categoryRepository = new CategoryRepository();
        let cat = null;
        try {
            cat = await categoryRepository.modificarCat(catModificar);
        } catch (error) {
            console.log("error en modificar categoria")
        }
        if (catModificar.name === null || catModificar.name.length <= 3){
            throw new Error ('Bad Request');
        }else if (this.getByID(catModificar.id) === null){
            throw new Error ('Not Found');
        }
    }

    async eliminarCategoria(id: number){
        const categoryRepository = new CategoryRepository();
        let cat = null;
        try {
            cat = await categoryRepository.eliminarCat(id);
        } catch (error) {
            console.log("error en eliminar categoria")
        }
        if (this.getByID(id) === null){
            throw new Error ('Not Found');
        }
    }
}