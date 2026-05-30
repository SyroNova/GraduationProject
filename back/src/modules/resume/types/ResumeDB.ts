import { RowDataPacket } from "mysql2";

export default interface ResumeDB extends RowDataPacket{
    idResume: number
    idUser: number
}