import { RowDataPacket } from "mysql2";

export default interface RoleDB extends RowDataPacket{
    idRole: number
    name: string
}