declare const config: {
    user: string;
    password: string;
    server: string;
    database: string;
    options: {
        trustServerCertificate: boolean;
        trustedConnection: boolean;
    };
};
export default config;
