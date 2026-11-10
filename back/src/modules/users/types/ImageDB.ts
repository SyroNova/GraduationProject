import { RowDataPacket } from "mysql2"

export default interface ImageDB extends RowDataPacket{
    idUser: number
    imageData: Buffer
    mimeType: string
}