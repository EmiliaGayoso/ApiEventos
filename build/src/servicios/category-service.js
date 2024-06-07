"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const category_repository_1 = require("../repositorios/category-repository");
const Pagination_1 = require("../entities/Pagination");
class CategoryService {
    async getAll(limit, offset, url) {
        const pag = new Pagination_1.Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
        const categoryRepository = new category_repository_1.CategoryRepository();
        const [allCategories, cantidadCategories] = await categoryRepository.getAll();
        const devolver = {
            collection: allCategories,
            pagination: {
                pageSize: parsedLimit,
                page: parsedOffset,
                nextPage: pag.buildNextPage(url, parsedLimit, parsedOffset),
                total: Number(cantidadCategories)
            }
        };
        return devolver;
    }
    async getByID(id) {
        const categoryRepository = new category_repository_1.CategoryRepository();
        let cat = null;
        try {
            cat = await categoryRepository.getById(id);
            ;
        }
        catch (error) {
            console.log("error");
        }
        if (cat === null || cat.rows.length === 0) {
            throw new Error('Not Found');
        }
        return cat;
    }
    async crearCategoria(catCrear) {
        const categoryRepository = new category_repository_1.CategoryRepository();
        let cat = null;
        if (catCrear.name === null || catCrear.name.length <= 3) {
            throw new Error('Bad Request');
        }
        try {
            cat = await categoryRepository.crearCat(catCrear);
        }
        catch (error) {
            console.log("error en crear categoria");
        }
        return cat;
    }
    async modificarCategoria(catModificar) {
        const categoryRepository = new category_repository_1.CategoryRepository();
        let cat = null;
        if (catModificar.name === null || catModificar.name.length <= 3) {
            throw new Error('Bad Request');
        }
        try {
            cat = await categoryRepository.modificarCat(catModificar);
        }
        catch (error) {
            console.log("error en modificar categoria");
        }
        const buscada = await this.getByID(catModificar.id);
        if (buscada.rows.length === 0) {
            throw new Error('Not Found');
        }
        return cat;
    }
    async eliminarCategoria(id) {
        const categoryRepository = new category_repository_1.CategoryRepository();
        let cat = null;
        try {
            cat = await categoryRepository.eliminarCat(id);
        }
        catch (error) {
            console.log("error en service eliminar categoria");
        }
        const buscada = await this.getByID(id);
        if (buscada.rows.length === 0) {
            throw new Error('Not Found');
        }
        return cat;
    }
}
exports.CategoryService = CategoryService;
//# sourceMappingURL=category-service.js.map