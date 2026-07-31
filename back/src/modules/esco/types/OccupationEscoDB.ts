import { RowDataPacket } from "mysql2"

export default interface OccupationEscoDB extends RowDataPacket{
    idOccupation: string
    name: string
}