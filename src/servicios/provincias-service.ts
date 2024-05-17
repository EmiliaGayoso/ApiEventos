import { ProvinciaRepository } from "../repositorios/provincias-repository";
import Provincias from "../entities/Provincias";
import { Pagination } from "../entities/Pagination"; 

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
        const pag = new Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);

        let provinciaDevolver = null;
        console.log("traerTodasProvincias");
        provinciaDevolver = await provinciaRepository.traerTodas(parsedLimit, parsedOffset);
        console.log(provinciaDevolver);

        return provinciaDevolver;
    }

    async crearProvincia(provinciaCrear: Provincias){
        let provincia = null;
        const provinciaRepository = new ProvinciaRepository();
        try {
            provincia = await provinciaRepository.crearProvincia(provinciaCrear);
            console.log("se pudo crear la provincia")
        }
        catch (error){
            if (provinciaCrear.name == null || provinciaCrear.name.length<=3 || typeof provinciaCrear.latitude != 'number'|| typeof provinciaCrear.longitude != 'number'){
                throw new Error ('Bad Request'); 
            }
        }
        return provincia;
    }

    async modificarProvincia(provinciaId: number, provinciaModificar: Provincias){
        let provincia = null;
        const provinciaRepository = new ProvinciaRepository();
        try {
            provincia = await provinciaRepository.modificarProvincia(provinciaModificar,provinciaId);
            console.log("se pudo modificar la pregunta")
        } catch (error) {
            
        }
        return provincia;
    }

    async borrarProvincia(provinciaId: number){
        const provinciaRepository = new ProvinciaRepository();
        const provincia = await provinciaRepository.borrarProvincia(provinciaId);
        return provincia;
    }
}