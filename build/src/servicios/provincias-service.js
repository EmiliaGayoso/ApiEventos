"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinciaService = void 0;
const provincias_repository_1 = require("../repositorios/provincias-repository");
class ProvinciaService {
    async busquedaId(id) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("buscarProvinciaId");
        provinciaDevolver = await provinciaRepository.buscarId(id);
        console.log(provinciaDevolver);
        return provinciaDevolver;
    }
    async traerTodas(limit, offset) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("traerTodasProvincias");
        provinciaDevolver = await provinciaRepository.traerTodas(limit, offset);
        console.log(provinciaDevolver);
        return provinciaDevolver;
    }
    async crearProvincia(provinciaCrear) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        const provincia = await provinciaRepository.crearProvincia(provinciaCrear);
        return provincia;
    }
    async modificarProvincia(provinciaId, provinciaModificar) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        const provincia = await provinciaRepository.modificarProvincia(provinciaModificar, provinciaId);
        return provincia;
    }
    async borrarProvincia(provinciaId) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        const provincia = await provinciaRepository.borrarProvincia(provinciaId);
        return provincia;
    }
}
exports.ProvinciaService = ProvinciaService;
//# sourceMappingURL=provincias-service.js.map