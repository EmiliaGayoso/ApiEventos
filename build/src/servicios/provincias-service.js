"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProvinciaService = void 0;
const provincias_repository_1 = require("../repositorios/provincias-repository");
class ProvinciaService {
    async busquedaId(id) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("buscarProvinciaId");
        provinciaDevolver = provinciaRepository.buscarId(id);
        console.log(provinciaDevolver);
        return provinciaDevolver;
    }
    traerTodas(limit, offset) {
        const provinciaRepository = new provincias_repository_1.ProvinciaRepository();
        let provinciaDevolver = null;
        console.log("traerTodasProvincias");
        provinciaDevolver = provinciaRepository.traerTodas(limit, offset);
        console.log(provinciaDevolver);
        return provinciaDevolver;
    }
    crearProvincia() {
    }
    modificarProvincia() {
    }
    borrarProvincia() {
    }
}
exports.ProvinciaService = ProvinciaService;
//# sourceMappingURL=provincias-service.js.map