import { ProvinciaRepository } from "../repositorios/provincias-repository";
import Provincias from "../entities/Provincias";

export class ProvinciaService {
    async busquedaId(id: number){
        const provinciaRepository = new ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("buscarProvinciaId");
        provinciaDevolver = await provinciaRepository.buscarId(id);
        console.log(provinciaDevolver);

        return provinciaDevolver;
    }

    async traerTodas(limit: number, offset: number){
        const provinciaRepository = new ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("traerTodasProvincias");
        provinciaDevolver = await provinciaRepository.traerTodas(limit, offset);
        console.log(provinciaDevolver);

        return provinciaDevolver;
    }

    async crearProvincia(provinciaCrear: Provincias){
        const provinciaRepository = new ProvinciaRepository();
        const provincia = await provinciaRepository.crearProvincia(provinciaCrear);
        return provincia;
    }

    async modificarProvincia(provinciaId: number, provinciaModificar: Provincias){
        const provinciaRepository = new ProvinciaRepository();
        const provincia = await provinciaRepository.modificarProvincia(provinciaModificar,provinciaId);
        return provincia;
    }

    async borrarProvincia(provinciaId: number){
        const provinciaRepository = new ProvinciaRepository();
        const provincia = await provinciaRepository.borrarProvincia(provinciaId);
        return provincia;
    }
}