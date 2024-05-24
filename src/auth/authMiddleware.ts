import {descriptedToken} from './jwt'

/*export function AuthMiddleware(req,res,next){
    if(!requestAnimationFrame.headers.authorization){
        res.status(401).send('Forbidden');
    }else{
        const token = req.headers.authorization.split('')[1];
        const decryptedToken= descriptedToken(token);
        req.user= decryptedToken.payload;
    }
    next();
}*/
export function AuthMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send('Forbidden');
    } else {
        const token = req.headers.authorization.split(' ')[1];
        const decryptedToken = descriptedToken(token);
        req.user = decryptedToken.payload;
    }
    next();
}