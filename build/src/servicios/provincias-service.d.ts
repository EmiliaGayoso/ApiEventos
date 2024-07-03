import Provincias from "../entities/Provincias";
export declare class ProvinciaService {
    busquedaId(id: number): Promise<any>;
    traerTodas(limit: number, offset: number, url: string, path: string): Promise<{
        collection: any;
        pagination: import("../entities/Pagination").PaginationDto;
    }>;
    traerTodasLoc(id: number, limit: number, offset: number, url: string, path: string): Promise<{
        collection: any;
        pagination: import("../entities/Pagination").PaginationDto;
    }>;
    crearProvincia(provinciaCrear: Provincias): Promise<any>;
    modificarProvincia(provinciaId: number, provinciaModificar: Provincias): Promise<any>;
    borrarProvincia(provinciaId: number): Promise<any>;
}
