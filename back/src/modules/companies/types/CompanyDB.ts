import { RowDataPacket } from "mysql2"
import RoleDB from "../../../shared/RoleDB.js"

export default interface CompanyDB extends RowDataPacket{
    idCompany: number
    NIT: string
    passwordHash: string
    name: string
    location: string
    description: string
    role: RoleDB | string;
}