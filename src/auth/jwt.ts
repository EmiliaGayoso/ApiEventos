import jwt from 'jsonwebtoken'
import User from '../entities/User'
const secretKey = 'kklovers';
export const createToken = (user: User) => 
{
    const payload = 
    {
        id: user.id
    };
    console.log(user.id);

    const options= 
    {
        expiresIn: '365d',
        issuer: 'localhost'
    }

    const token= jwt.sign(payload, secretKey, options);//genera el token con los datos que se los brindo 
    console.log('Token generado:', token); 
    return token;
}

export const descriptedToken = async (ptoken:string) =>
{
    let payloadOriginal=null;

    try{
        payloadOriginal = await jwt.verify(ptoken,secretKey);
    } catch(e){
        console.error(e);
    }
    console.log("Payload:", payloadOriginal);
    return payloadOriginal;
}
