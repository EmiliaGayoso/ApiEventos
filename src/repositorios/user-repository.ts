import pg from "pg";
import { config } from "../repositorios/bd";
import User from "../entities/User"

import { createToken } from "../auth/jwt"

const client = new pg.Client(config);
console.log('config', config);
client.connect();

export class UserRepository{
    
    async verificarExistenciaUsuario(username, password)
    {
        let devolver = null;
        try {
                const query = {
                    
                    text: 'SELECT * FROM users WHERE username = $1 AND password = $2',
                    values: [username, password]
                }
                
                devolver = await client.query(query);
                devolver= devolver.rows[0];
                console.log(devolver.rows[0]);
            } catch (error) {
                console.log("error en repo event loc crear");
            }
            return devolver;
        
        //acá iría la query que debe verificar si existe o no el usuario que se manda
        //si existe, deberia retornar al usuario
        //si no, deberia retornar null
    }
    
    async crearUsuario(fName, lName, username, password){

        let devolver = null;
        try {
            let result = null;
            const verUsername= {
                text:'SELECT * FROM users WHERE username= $1',/*verifica si existe, si no existe se devuelve null */
                values:[username]
            } 
            if(verUsername===null){
                const query = {
                
                    text: 'INSERT INTO user VALUES ($1,$2, $3, $4) RETURNING * ',/*EL RETURNING ES PARA NO HACER UNA QUERY MAS PARA QUE ME DEVUELVA LO QUE ME ACABA DE CCREAR */
                    values: [fName,lName,username, password]
                }
                
                result= client.query(query);
                devolver = result.rows[0];/*esto es el usuario completo creado */
            }
            
        } catch (error) {
            console.log("error en repo regitro usuario");
        }
        return devolver;

        //acá iría la query que debe crear un usuario con los datos que se mandan
        //si se crea, deberia retornar true
        //si no, deberia retornar false
    }
}