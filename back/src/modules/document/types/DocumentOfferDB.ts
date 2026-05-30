import { RowDataPacket } from "mysql2"

export default interface DocumentOfferDB extends RowDataPacket{
    idOffer: number
    idDocument: number
}