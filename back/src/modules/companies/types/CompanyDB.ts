import { RowDataPacket } from "mysql2"

export default interface CompanyDB extends RowDataPacket{
    idCompany: number
    name: string
    location: string
    description: string
}