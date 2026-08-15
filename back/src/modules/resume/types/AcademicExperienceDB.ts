import { RowDataPacket } from "mysql2"

export default interface AcademicExperienceDB extends RowDataPacket{
    idAcademicExperience: number
    idResume: number
    degree: string
    institution: string
    dateStart: Date
    dateEnd?: Date
    description?: string
}