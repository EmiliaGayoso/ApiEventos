import Provincias from "../entities/Provincias";
export declare class ProvinciaService {
    busquedaId(id: number): Promise<any>;
    traerTodas(limit: number, offset: number): Promise<any>;
    crearProvincia(provinciaCrear: Provincias): Promise<void>;
    modificarProvincia(provinciaId: number, provinciaModificar: Provincias): Promise<void>;
    borrarProvincia(provinciaId: number): Promise<void>;
}
