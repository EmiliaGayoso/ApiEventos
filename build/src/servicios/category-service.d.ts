import Categories from "../entities/Categorias";
export declare class CategoryService {
    getAll(limit: number, offset: number, url: string, path: string): Promise<{
        collection: any;
        pagination: import("../entities/Pagination").PaginationDto;
    }>;
    getByID(id: number): Promise<any>;
    crearCategoria(catCrear: Categories): Promise<any>;
    modificarCategoria(catModificar: Categories): Promise<any>;
    eliminarCategoria(id: number): Promise<any>;
}
