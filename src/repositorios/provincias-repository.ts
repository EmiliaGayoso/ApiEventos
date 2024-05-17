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
        console.log("llegue a provincia buscarId");
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
        console.log("llegue a provincia traerTodas");
        let devolver = null;
        try {
            const query = {
                text: 'SELECT * FROM provinces LIMIT $1 OFFSET $2',
                values: [limit, offset]
            };
            const result = await this.BDClient.query(query);
            devolver = result.rows[0];
            console.log(result);
        }
        catch(error) {
            console.log("error en prov traerTodas");
        }
        console.log(devolver);
        return devolver;
    }

    async crearProvincia (provinciaCrear){
        console.log("llego a prov crearProvincia");
        let devolver = null;
        try {
            const query = {
                text: 'INSERT INTO provinces (name,full_name,latitude,longitude) VALUES ($1,$2,$3,$4)',
                values: [provinciaCrear.name,provinciaCrear.full_name,provinciaCrear.latitude,provinciaCrear.longitude]
            };
            const result = await this.BDClient.query(query);
            devolver = result.rows[0];
            console.log("se creo la provincia");
        }catch (error){
            console.log("Error creando la provincia")
        }
        return devolver;
    }

    async modificarProvincia(provinciaModificar, provinciaId){
        console.log("llego a prov modificarProvincia");
        let devolver = null;
        try {
            const query = {
                text: 'UPDATE provinces SET name = $1, full_name = $2, latitude = $3, longitude = $4 WHERE id = $5',
                values: [provinciaModificar.name, provinciaModificar.full_name, provinciaModificar.latitude, provinciaModificar.longitude, provinciaId]
            };
            const result = await this.BDClient.query(query);
            devolver = result.rows[0];
            console.log("se modifico la provincia");
        } catch (error) {
            console.log("Error al modificar la prov");
        }
    }

    async borrarProvincia(provinciaId){
        console.log("llego a prov borrarProvincia");
        let devolver = null;
        try {
            const query = {
                text: 'DELETE FROM provinces WHERE id = $1',
                values: [provinciaId]
            };
            const result = await this.BDClient.query(query);
            devolver = result.rows[0];
        } catch (error) {
            console.log("error eliminando la prov");
        }
    }
}