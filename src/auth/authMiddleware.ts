import { descriptedToken } from "./jwt.js";

export async function AuthMiddleware (req, res, next) {
    let token = req.headers.authorization;

    console.log('AuthMiddleware: ', token);
    if(!token){
        
        return res.status(401).json("Unauthorized");
    } else{
        token = token.replace('Bearer ', '');
        console.log('AuthMiddleware xxx: ', token);

        token = req.headers.authorization.split(" ")[1];
        const decryptToken = await descriptedToken(token);
        req.user = decryptToken;
    }
    next();
}