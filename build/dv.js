"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        trustServerCertificate: true,
        trustedConnection: true,
    },
};
exports.default = config;
//# sourceMappingURL=dv.js.map