import { query } from "express";

export class UserRepository{
    verificarExistencia(username, password){
        //acá iría la query que debe verificar si existe o no el usuario que se manda
        //si existe, deberia retornar al usuario
        //si no, deberia retornar null
    }
    
    crearUsuario(fName, lName, username, password){
        //acá iría la query que debe crear un usuario con los datos que se mandan
        //si se crea, deberia retornar true
        //si no, deberia retornar false
    }
}