import { query } from "express";
import pg from "pg";
import { config } from "../repositorios/bd.js"; 
import {UserRepository} from "../repositorios/user-repository.js";
import {createToken} from "../auth/jwt"
import User from '../entities/User'

const client = new pg.Client(config);
client.connect();


export class UserService {
    async verificarExistenciaUsuario(username: string, password: string)
    {
        const userRepository = new UserRepository(); 
        let userExistence; 
            try 
            {
                userExistence= userRepository.verificarExistenciaUsuario(username, password);
                console.log("llega a repo user login")
                
            }
            catch (error)
            {
                console.log("Error");
            }
        
        if (userExistence !== null)
        {
            const token = createToken(userExistence);
            return token;
        } 
        else
        {
            throw new Error("Usuario no existe")
        }
            
        
    }
        async crearUsuario(fName: string, lName: string, username: string, password: string)
    {
        const userRepository = new UserRepository();
        const usuario = userRepository.crearUsuario(fName, lName, username, password);
        return usuario;//devuelve o el usuario o null, si es null no existe el usuario
    }
    

    
}