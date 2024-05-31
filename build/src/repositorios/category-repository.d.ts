export declare class CategoryRepository {
    getAll(): Promise<any[][] | "Query error">;
    getById(id: any): Promise<any>;
    crearCat(catCrear: any): Promise<any>;
    modificarCat(catModificar: any): Promise<any>;
    eliminarCat(id: any): Promise<any>;
}
