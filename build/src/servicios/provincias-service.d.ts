import Provincias from "../entities/Provincias";
export declare class ProvinciaService {
    busquedaId(id: number): Promise<any>;
    traerTodas(limit: number, offset: number, url: string): Promise<{
        collection: string | any[];
        pagination: {
            pageSize: number;
            page: number;
            nextPage: string;
            total: number;
        };
    }>;
    crearProvincia(provinciaCrear: Provincias): Promise<any>;
    modificarProvincia(provinciaId: number, provinciaModificar: Provincias): Promise<any>;
    borrarProvincia(provinciaId: number): Promise<any>;
}
