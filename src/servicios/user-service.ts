import { UserRepository } from "../repositorios/user-repository";

export class UserService {
    verificarExistenciaUsuario(username: string, password: string){
        const userRepository = new UserRepository();
        const existe = userRepository.verificarExistencia(username, password);

        return true;
    }

    creacionToken(username: string){
        //supuestamente aca se crea el token y se devuelve
        // o el token ya es existente y hay 1 por usuario, por lo que deberia ir a la BD y traerlo
    }
    
    crearUsuario(fName: string, lName: string, username: string, password: string){
        const userRepository = new UserRepository();
        const creado = userRepository.crearUsuario(fName, lName, username, password);

        return true
    }
}