import { query } from "express";
import pg from "pg";
import { config } from "../repositorios/bd.js"; 
import {UserRepository} from "../repositorios/user-repository.js";
import {createToken} from "../auth/jwt"
import User from '../entities/User'
import { NewLineKind } from "typescript";

const client = new pg.Client(config);
client.connect();


export class UserService {
    async verificarExistenciaUsuario(username: string, password: string)
    {
        const userRepository = new UserRepository(); 
        let userExistence; 
        try 
        {
            userExistence= await userRepository.verificarExistenciaUsuario(username, password);
            console.log("llega a service user login");
            console.log(userExistence);
            
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
        //devuelve o el usuario o null, si es null no existe el usuario
        if(fName === null || fName.length < 3 || lName === null || lName.length < 3 || password === null || password.length < 3){
            throw new Error ('Bad Request');
        }else if(!(username.includes('@') && username.includes('.com'))){
            throw new Error ('Bad Request');
        } 
        const usuario = userRepository.crearUsuario(fName, lName, username, password);
        return usuario;
    }
    

    
}