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
                const result = await client.query(query);
                let userNuevo = new User()
                userNuevo = result;
                if(result){
                    const token = createToken(userNuevo);
                    console.log(token);
                    return token;
                }
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
            const query = {
                text: 'SELECT * FROM user where username=$1 AND password=$2',
                values: [username, password]
            }
            const result = await client.query(query);
            devolver = result.rows[0];
        } catch (error) {
            console.log("error en repo event loc crear");
        }
        return devolver;

        //acá iría la query que debe crear un usuario con los datos que se mandan
        //si se crea, deberia retornar true
        //si no, deberia retornar false
    }
}