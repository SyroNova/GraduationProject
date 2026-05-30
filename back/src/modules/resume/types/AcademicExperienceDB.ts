import { RowDataPacket } from "mysql2"

export default interface AcademicExperienceDB extends RowDataPacket{
    idAcademicExperience: number
    idResume: number
    position: string
    company: string
    dateStart: Date
    dateEnd?: Date
    resume?: string
}