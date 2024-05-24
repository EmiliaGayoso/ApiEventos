import { descriptedToken } from "./jwt.js";

export function AuthMiddleware(req, res, next) {
    if(!req.headers.authorization){
        return res.status(401).json("Forbidden");
    } else{
        const token = req.headers.authorization.split(" ")[1];
        const decryptToken = descriptedToken(token);
        req.user = decryptToken;
    }
    next();
}