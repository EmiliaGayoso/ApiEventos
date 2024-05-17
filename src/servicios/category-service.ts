import { CategoryRepository } from "../repositorios/category-repository";
import { Pagination } from "../entities/Pagination";

export class CategoryService {

    async getAll(limit: number, offset: number){
        
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
                nextPage: ((offset + 1) * limit <= Number(cantidadCategories)) ? null : process.env.URL_BASE,
                total: Number(cantidadCategories)
            }
        }
        return devolver;

    }

    async getByID(id: number){
        const categoryRepository = new CategoryRepository();
        let cat = null;
        let devolver = null;
        try {
            cat = await categoryRepository.getById(id);
            devolver = cat.rows[0];
        } catch (error) {
            console.log("error")
        }
        if (cat == null){
            throw new Error ('Not Found')
        }
        return devolver;
        

    }
}