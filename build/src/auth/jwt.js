"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.descriptedToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = 'kklovers';
const createToken = (user) => {
    const payload = {
        id: user.id
    };
    console.log(user.id);
    const options = {
        expiresIn: '365d',
        issuer: 'localhost'
    };
    const token = jsonwebtoken_1.default.sign(payload, secretKey, options);
    console.log('Token generado:', token);
    return token;
};
exports.createToken = createToken;
const descriptedToken = async (ptoken) => {
    let payloadOriginal = null;
    try {
        payloadOriginal = await jsonwebtoken_1.default.verify(ptoken, secretKey);
    }
    catch (e) {
        console.error(e);
    }
    console.log("Payload:", payloadOriginal);
    return payloadOriginal;
};
exports.descriptedToken = descriptedToken;
//# sourceMappingURL=jwt.js.map