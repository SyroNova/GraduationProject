import { RowDataPacket } from "mysql2"

export default interface DocumentResumeDB extends RowDataPacket{
    idDocument: number
    idResume: number
}