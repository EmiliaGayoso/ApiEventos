import jwt from 'jsonwebtoken'

export const createToken = (user) => 
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

    const token= jwt.sign(payload, secretKey, options);
    console.log(token); 

}

export const descriptedToken = async () =>
{
    const secretKey = 'kklovers'
    let token= 'ey....';
    let payloadOriginal=null;

    try{
        payloadOriginal = await jwt.verify(token,secretKey);
    } catch(e){

    }
}