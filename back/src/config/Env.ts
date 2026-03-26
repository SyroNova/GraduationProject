import dotenv from "dotenv";

dotenv.config();

export const env = {
    port: process.env.PORT || 3000,

    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER ||  'root',
    dbPassword: process.env.DB_PASSWORD || 'admin@123',
    dbName: process.env.DB_NAME || 'thesis',
    dbPort: process.env.DB_PORT || 3306,

    jwtSecret: process.env.JWT_SECRET || 'secret'
};