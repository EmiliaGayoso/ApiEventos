import Categories from "../entities/Categorias";
export declare class CategoryService {
    getAll(limit: number, offset: number, url: string): Promise<{
        collection: string | any[];
        pagination: {
            pageSize: number;
            page: number;
            nextPage: string;
            total: number;
        };
    }>;
    getByID(id: number): Promise<any>;
    crearCategoria(catCrear: Categories): Promise<any>;
    modificarCategoria(catModificar: Categories): Promise<any>;
    eliminarCategoria(id: number): Promise<any>;
}
