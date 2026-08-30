import { RowDataPacket } from "mysql2"

export default interface MetadataResponseDTO extends RowDataPacket{
    idDocument: number
    fileName: string
    mimeType: string
    fileSize: number
    createdAt: string
}