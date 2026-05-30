import { RowDataPacket } from "mysql2"

export default interface ProfessionalProfileDB extends RowDataPacket{
    idProfessionalProfile: number
    idResume: number
    title: string
    resume: string
}