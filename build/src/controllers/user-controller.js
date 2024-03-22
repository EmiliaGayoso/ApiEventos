"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post("/user/login", (req, res) => {
    const body = req.body;
    console.log(body);
    res.json({
        id: 0,
        username: body.username,
        password: body.password,
    });
});
router.post("/user/register", (req, res) => {
    const body = req.body;
    console.log(body);
    res.json({
        id: 0,
        firstname: body.firstname,
        lastname: body.lastname,
        username: body.username,
        password: body.password,
    });
});
//# sourceMappingURL=user-controller.js.map