import "dotenv/config";

export const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT)
    //hay que dejarlo en Number porque todos los demás son string
}