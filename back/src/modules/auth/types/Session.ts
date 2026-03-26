import { RowDataPacket } from "mysql2";

export interface Session extends RowDataPacket{
    idSession: number;
    idUser: number;
    refreshToken: string;
    createdAt: Date;
    expiresAt: Date;
    role: string;
}