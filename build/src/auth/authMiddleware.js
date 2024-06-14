"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt_js_1 = require("./jwt.js");
async function AuthMiddleware(req, res, next) {
    let token = req.headers.authorization;
    console.log('AuthMiddleware: ', token);
    if (!token) {
        return res.status(401).json("Unauthorized");
    }
    else {
        token = token.replace('Bearer ', '');
        console.log('AuthMiddleware xxx: ', token);
        token = req.headers.authorization.split(" ")[1];
        const decryptToken = await (0, jwt_js_1.descriptedToken)(token);
        req.user = decryptToken;
    }
    next();
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map