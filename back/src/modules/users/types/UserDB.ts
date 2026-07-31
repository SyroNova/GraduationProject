import { RowDataPacket } from "mysql2";
import { DocumentType } from "./DocumentType.js";
import RoleDB from "./RoleDB.js";

export default interface UserDB extends RowDataPacket{
    idUser: number;
    email?: string;
    name: string;
    document: string;
    documentType: DocumentType;
    passwordHash: string;
    phone: string;
    birthDate?: Date;
    actualCity?: string;
    gender?: string;
    role: RoleDB | string;
}

