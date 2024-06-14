"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinciaService = void 0;
const provincias_repository_1 = require("../repositorios/provincias-repository");
const Pagination_1 = require("../entities/Pagination");
class ProvinciaService {
    async busquedaId(id) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("buscarProvinciaId");
        try {
            provinciaDevolver = await provinciaRepository.buscarId(id);
        }
        catch (error) {
            console.log("error");
        }
        console.log(provinciaDevolver);
        if (provinciaDevolver === null) {
            throw new Error('Not Found');
        }
        console.log(provinciaDevolver);
        return provinciaDevolver;
    }
    async traerTodas(limit, offset, url, path) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        const pag = new Pagination_1.Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
        console.log("traerTodasProvincias");
        const [allProv, countProv] = await provinciaRepository.traerTodas(parsedLimit, parsedOffset);
        const resultado = {
            collection: allProv,
            pagination: pag.buildPagination(parsedLimit, parsedOffset, countProv, path, url)
        };
        return resultado;
    }
    async traerTodasLoc(id, limit, offset, url, path) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        const pag = new Pagination_1.Pagination();
        const parsedLimit = pag.parseLimit(limit);
        const parsedOffset = pag.parseOffset(offset);
        if (await this.busquedaId(id) === null) {
            throw new Error('Not Found');
        }
        const [allLoc, countLoc] = await provinciaRepository.traerLoc(id, parsedLimit, parsedOffset);
        console.log('COunt loc: ', countLoc);
        const resultado = {
            collection: allLoc,
            pagination: pag.buildPagination(parsedLimit, parsedOffset, countLoc, path, url)
        };
        return resultado;
    }
    async crearProvincia(provinciaCrear) {
        let provincia = null;
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        try {
            provincia = await provinciaRepository.crearProvincia(provinciaCrear);
            console.log("se pudo crear la provincia");
        }
        catch (error) {
            console.log("error en crearProvincia");
        }
        if (provinciaCrear.name === null || provinciaCrear.name.length <= 3 || typeof provinciaCrear.latitude != 'number' || typeof provinciaCrear.longitude != 'number') {
            throw new Error('Bad Request');
        }
        return provincia;
    }
    async modificarProvincia(provinciaId, provinciaModificar) {
        let provincia = null;
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        try {
            provincia = await provinciaRepository.modificarProvincia(provinciaModificar, provinciaId);
            console.log("se pudo modificar la pregunta");
        }
        catch (error) {
            console.log("error en modificarProvincia");
        }
        if (provinciaModificar.name === null || provinciaModificar.name.length <= 3 || typeof provinciaModificar.latitude != 'number' || typeof provinciaModificar.longitude != 'number') {
            throw new Error('Bad Request');
        }
        else if (this.busquedaId(provinciaId) === null) {
            throw new Error('Not Found');
        }
        return provincia;
    }
    async borrarProvincia(provinciaId) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        let provincia = null;
        try {
            provincia = await provinciaRepository.borrarProvincia(provinciaId);
        }
        catch (error) {
            console.log("error en borrando Provincia");
        }
        if (this.busquedaId(provinciaId) === null) {
            throw new Error('Not Found');
        }
        return provincia;
    }
}
exports.ProvinciaService = ProvinciaService;
//# sourceMappingURL=provincias-service.js.map