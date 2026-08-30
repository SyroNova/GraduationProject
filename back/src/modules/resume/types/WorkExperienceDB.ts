import { RowDataPacket } from "mysql2"

export default interface WorkExperienceDB extends RowDataPacket {
    idWorkExperience: number
    idResume: number
    position: string
    dateStart: Date
    dateEnd?: Date
    company: string,
    description?: string
}