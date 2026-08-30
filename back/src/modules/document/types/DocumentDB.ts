import { RowDataPacket } from "mysql2"

export interface DocumentDB extends RowDataPacket{
    idDocument: number
    file: Buffer
    fileName: string
    mimeType: string
    fileSize: number
    createdAt: string
}