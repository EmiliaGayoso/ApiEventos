import { ProvinciaRepository } from "../repositorios/provincias-repository";
import Provincias from "../entities/Provincias";
import { Pagination } from "../entities/Pagination"; 

export class ProvinciaService {
    async busquedaId(id: number){
        const provinciaRepository = new ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("buscarProvinciaId");
        
        try {
            provinciaDevolver = await provinciaRepository.buscarId(id);
        } catch (error) {
            console.log("error");
        }
        console.log(provinciaDevolver)
        if (provinciaDevolver === null){
            throw new Error ('Not Found');
        }
        console.log(provinciaDevolver);

        return provinciaDevolver;
    }

    async traerTodas(limit: number, offset: number, url: string, path: string){
        const provinciaRepository = new ProvinciaRepository();
        const pag = new Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
        
        console.log("traerTodasProvincias");
        const [allProv, countProv] = await provinciaRepository.traerTodas(parsedLimit, parsedOffset);

        const resultado = {
            collection: allProv, //aca deberia ir un array de elementos, esta es una version harcodeada
            
            pagination: pag.buildPagination(parsedLimit, parsedOffset, countProv, path, url)
        }


        return resultado;
    }

    async traerTodasLoc(id: number, limit: number, offset: number, url: string, path: string){
        const provinciaRepository = new ProvinciaRepository();
        const pag = new Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);

        if(await this.busquedaId(id) === null){
            throw new Error ('Not Found');
        }
        const [allLoc, countLoc] = await provinciaRepository.traerLoc(id, parsedLimit, parsedOffset);
        console.log('COunt loc: ',countLoc);
        const resultado = {
            collection: allLoc,
            
            pagination: pag.buildPagination(parsedLimit, parsedOffset, countLoc, path, url)
        }
        return resultado;
    }

    async crearProvincia(provinciaCrear: Provincias){
        let provincia = null;
        const provinciaRepository = new ProvinciaRepository();
        if (provinciaCrear.name === null || provinciaCrear.name.length<=3 || typeof provinciaCrear.latitude != 'number'|| typeof provinciaCrear.longitude != 'number'){
            throw new Error ('Bad Request'); 
        }
        try {
            
            provincia = await provinciaRepository.crearProvincia(provinciaCrear);
            console.log("se pudo crear la provincia")
        }
        catch (error){
            console.log("error en crearProvincia");
        }
        return provincia;
    }

    async modificarProvincia(provinciaId: number, provinciaModificar: Provincias){
        let provincia = null;
        const provinciaRepository = new ProvinciaRepository();
        if (provinciaModificar.name === null || provinciaModificar.name.length<=3 || typeof provinciaModificar.latitude != 'number'|| typeof provinciaModificar.longitude != 'number'){
            throw new Error ('Bad Request'); 
        }else if (await this.busquedaId(provinciaId) === null){
            throw new Error ('Not Found');
        }
        try {
            provincia = await provinciaRepository.modificarProvincia(provinciaModificar,provinciaId);
            console.log("se pudo modificar la pregunta")
        } catch (error) {
            console.log("error en modificarProvincia");
        }
        return provincia;
    }

    async borrarProvincia(provinciaId: number){
        const provinciaRepository = new ProvinciaRepository();
        let provincia = null;
        if (await this.busquedaId(provinciaId) === null){
            throw new Error ('Not Found');
        }
        try {
            
            provincia = await provinciaRepository.borrarProvincia(provinciaId);
        } catch (error) {
            console.log("error en borrando Provincia");
        }
        
        return provincia;
    }
}