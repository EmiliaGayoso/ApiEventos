import pg from "pg";
export declare class ProvinciaRepository {
    BDClient: pg.Client;
    constructor();
    buscarId(id: any): Promise<any>;
    traerTodas(limit: any, offset: any): Promise<(number | any[])[] | "Query error">;
    traerLoc(id: any, limit: any, offset: any): Promise<(number | any[])[] | "Query error">;
    crearProvincia(provinciaCrear: any): Promise<any>;
    modificarProvincia(provinciaModificar: any, provinciaId: any): Promise<void>;
    borrarProvincia(provinciaId: any): Promise<void>;
}
