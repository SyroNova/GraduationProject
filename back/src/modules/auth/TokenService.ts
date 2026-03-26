import jwt from "jsonwebtoken";
import { Payload } from "./interfaces/Payload.js";
import { env } from "../../config/Env.js";
import crypto from "node:crypto";


export default class TokenService{
    public generateAccessToken(payload: Payload){
        return jwt.sign(payload, env.jwtSecret, {
            expiresIn: "2h"
        });
    }

    public generateRefreshToken(){
        return crypto.randomBytes(64).toString("hex");
    }
}