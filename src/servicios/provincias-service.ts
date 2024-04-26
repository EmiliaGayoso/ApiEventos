import { ProvinciaRepository } from "../repositorios/provincias-repository";
import Provincias from "../models/Provincias";

export class ProvinciaService {
    async busquedaId(id: number){
        const provinciaRepository = new ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("buscarProvinciaId");
        provinciaDevolver = provinciaRepository.buscarId(id);
        console.log(provinciaDevolver);

        return provinciaDevolver;
    }

    traerTodas(limit: number, offset: number){
        const provinciaRepository = new ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("traerTodasProvincias");
        provinciaDevolver = provinciaRepository.traerTodas(limit, offset);
        console.log(provinciaDevolver);

        return provinciaDevolver;
    }

    crearProvincia(provinciaCrear: Provincias){

    }

    modificarProvincia(){

    }

    borrarProvincia(){

    }
}