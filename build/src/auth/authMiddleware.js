"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jwt_js_1 = require("./jwt.js");
function AuthMiddleware(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).json("Unauthorized");
    }
    else {
        const token = req.headers.authorization.split(" ")[1];
        const decryptToken = (0, jwt_js_1.descriptedToken)(token);
        req.user = decryptToken;
    }
    next();
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map