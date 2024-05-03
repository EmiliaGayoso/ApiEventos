import { query } from "express";
import pg from "pg";
import { config } from "../repositorios/bd";

export class ProvinciaRepository {
    BDClient: pg.Client //hay que declararlo
    constructor(){
        //const BDClient = new ??;
        const { Client } = pg;
        this.BDClient = new pg.Client(config);
        this.BDClient.connect();
    }
    
    async buscarId(id){
        let devolver = null;
        //se pone un try catch, para que si el sql falle, se sepa que es eso y no te devuelve null o algo parecido
        try {
            const query = {
                text: 'SELECT * FROM provinces WHERE id = $1',
                values: [id]
            };
            const result = await this.BDClient.query(query);//espera al resultado, sino te suele mandar vacio
            if(result.rows.length > 0){//rows son las filas que te devuelven sql --> si rows.length > o significa que devuelve algo
                devolver = result.rows[0]; //para que agarre el primero
            }
            
        }
        catch(error){
            console.log("error en prov.rep.buscarId")
        }
        console.log(devolver);
        return devolver;
    }

    async traerTodas(limit, offset){
        const query = {
            text: 'SELECT * FROM provinces LIMIT $1 OFFSET $2',
            values: [limit, offset]
        };
        const result = await this.BDClient.query(query);
        const devolver = result.rows[0];
        console.log(result);
        return devolver;
    }

    crearProvincia (provinciaCrear){

    }

    modificarProvincia(provinciaModificar, provinciaId){

    }

    borrarProvincia(provinciaId){
        
    }
}