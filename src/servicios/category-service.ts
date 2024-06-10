import { CategoryRepository } from "../repositorios/category-repository";
import { Pagination } from "../entities/Pagination";
import Categories from "../entities/Categorias";
import { parse } from "dotenv";

export class CategoryService {

    async getAll(limit: number, offset: number, url: string, path: string){
        
        const pag = new Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);

        const categoryRepository = new CategoryRepository();
        const [allCategories, cantidadCategories] = await categoryRepository.getAll(parsedLimit, parsedOffset);
        const devolver = {
            collection: allCategories,

            pagination: pag.buildPagination(parsedLimit, parsedOffset, cantidadCategories, path, url),
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
        if (catCrear.name === null || catCrear.name.length <= 3){
            throw new Error ('Bad Request');
        }
        try {
            cat = await categoryRepository.crearCat(catCrear);
        } catch (error) {
            console.log("error en crear categoria");
        }
        
        return cat;
    }

    async modificarCategoria(catModificar: Categories){
        const categoryRepository = new CategoryRepository();
        let cat = null;
        const buscada = await this.getByID(catModificar.id);
        if (catModificar.name === null || catModificar.name.length <= 3){
            throw new Error ('Bad Request');
        }else if (buscada === null){
            throw new Error ('Not Found');
        }
        try {
            cat = await categoryRepository.modificarCat(catModificar);
        } catch (error) {
            console.log("error en modificar categoria")
        }
        
        return cat;
    }

    async eliminarCategoria(id: number){
        const categoryRepository = new CategoryRepository();
        let cat = null;
        const buscada = await this.getByID(id);
        if (buscada === null){
            throw new Error ('Not Found');
        }
        try {
            cat = await categoryRepository.eliminarCat(id);
        } catch (error) {
            console.log("error en service eliminar categoria")
        }
        
        return cat;
    }
}