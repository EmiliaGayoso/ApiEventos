import { query } from "express";
import pg from "pg";
import { config } from "../repositories/db.js"; 
import {UserRepository} from "../repositories/user-repository.js";
const client = new pg.Client(config);
client.connect();


export class UserService {
    async verificarExistenciaUsuario(username: string, password: string){
        const userRepository = new UserRepository(); 
        const existe = userRepository.verificarExistenciaUsuario(username, password);
        return existe //devuelve o el usuario o null, si es null no existe el usuario
    }
    async crearUsuario(fName: string, lName: string, username: string, password: string){
        const userRepository = new UserRepository();
        const usuario = userRepository.crearUsuario(fName, lName, username, password);
        return usuario;//devuelve o el usuario o null, si es null no existe el usuario
    }
}


export class UserService {
    verificarExistenciaUsuario(username: string, password: string){
        const userRepository = new UserRepository();
        const existe = userRepository.verificarExistenciaUsuario(username, password);

        return true;
    }

    async creacionToken(username: string, password:number){
        const user= await this.UserRepository.getUser(username,password);
        console.log(user);
        const token= jwt.sign(
        {
            payload:
        }
        
        );
        //supuestamente aca se crea el token y se devuelve
        // o el token ya es existente y hay 1 por usuario, por lo que deberia ir a la BD y traerlo
    }
    
    
}