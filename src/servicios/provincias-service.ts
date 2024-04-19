import { ProvinciaRepository } from "../repositorios/provincias-repository";

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
        
        return 
    }

    crearProvincia(){

    }

    modificarProvincia(){

    }

    borrarProvincia(){

    }
}