import jwt from "jsonwebtoken";
import { Payload } from "../modules/auth/interfaces/Payload.js";
import { env } from "../config/Env.js";
import crypto from "node:crypto";
import { SessionDTO } from "../modules/auth/dto/SessionDTO.js";
import SessionModel from "../modules/auth/model/SessionModel.js";


export default class TokenService{
    constructor(
        private readonly sessionModel: SessionModel
    ){}

    public generateAccessToken(payload: Payload){
        return jwt.sign(payload, env.jwtSecret, {
            expiresIn: "2h"
        });
    }

    public generateRefreshToken(){
        return crypto.randomBytes(64).toString("hex");
    }

    public async saveRefreshToken(session: SessionDTO){
        const response = await this.sessionModel.create(session);

        if(response.affectedRows === 0){
            throw new Error("Error creating session")
        }
    }
}