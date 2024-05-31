import jwt from 'jsonwebtoken'
import User from '../entities/User'

export const createToken = (user: User) => 
{
    const payload = 
    {
        id: user[0].id
    };

    const secretKey= 'kkLovers';
    const options= 
    {
        expiresIn: '365d',
        issuer: 'localhost'
    }

    const token= jwt.sign(payload, secretKey, options);//genera el token con los datos que se los brindo 
    console.log(token); 
    return token;
}

export const descriptedToken = async (ptoken:string) =>
{
    const secretKey = 'kklovers'
    let token= ptoken;
    let payloadOriginal=null;

    try{
        payloadOriginal = await jwt.verify(token,secretKey);
    } catch(e){
        console.error(e);
    }

    return payloadOriginal;
}
