import { RowDataPacket } from "mysql2";
import { TypeCC } from "./TypeCC.js";

export default interface UserDB extends RowDataPacket{
    idUser: number;
    email?: string;
    name: string;
    CC: number;
    typeCC: TypeCC;
    passwordHash: string;
    phone: string;
    birthDate?: Date;
    actualCity?: string;
    gender?: string;
    role: string;
}