import dotenv from "dotenv";

dotenv.config({ path: "./.env/.env" });

const requiredEnv = [
    "DB_USER",
    "DB_PASSWORD",
    "DB_NAME",
    "JWT_SECRET"
] 

for(const key of requiredEnv){
    if(!process.env[key]){
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

export const env = {
    port: process.env.PORT || 3000,

    dbHost: process.env.DB_HOST || 'localhost',
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD ,
    dbName: process.env.DB_NAME,
    dbPort: Number(process.env.DB_PORT ?? 3306),

    jwtSecret: process.env.JWT_SECRET
};