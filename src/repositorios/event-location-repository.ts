import pg from "pg";
import { config } from "../repositorios/bd";

const client = new pg.Client(config);
console.log('config', config);
client.connect();

export class EventLocationRepository {
    getAll(){
        let devolver = null;

        return devolver;
    }

    getById(id){
        let devolver = null;

        return devolver;
    }

    crearEventLoc(crear){
        let devolver = null;

        return devolver;
    }

    modificarEventLoc(modificar){
        let devolver = null;

        return devolver;
    }

    borrarEventLoc(id){
        let devolver = null;

        return devolver;
    }
}