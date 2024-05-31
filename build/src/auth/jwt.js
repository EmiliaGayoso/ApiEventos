"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptedToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createToken = (user) => {
    const payload = {
        id: user[0].id
    };
    const secretKey = 'kkLovers';
    const options = {
        expiresIn: '365d',
        issuer: 'localhost'
    };
    const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
    console.log(token);
    return token;
};
exports.createToken = createToken;
const descriptedToken = async (ptoken) => {
    const secretKey = 'kklovers';
    let token = ptoken;
    let payloadOriginal = null;
    try {
        payloadOriginal = await jsonwebtoken_1.default.verify(token, secretKey);
    }
    catch (e) {
        console.error(e);
    }
    return payloadOriginal;
};
exports.descriptedToken = descriptedToken;
//# sourceMappingURL=jwt.js.map