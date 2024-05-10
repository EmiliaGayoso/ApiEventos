import pg from "pg";
export declare class ProvinciaRepository {
    BDClient: pg.Client;
    constructor();
    buscarId(id: any): Promise<any>;
    traerTodas(limit: any, offset: any): Promise<any>;
    crearProvincia(provinciaCrear: any): void;
    modificarProvincia(provinciaModificar: any, provinciaId: any): void;
    borrarProvincia(provinciaId: any): void;
}
