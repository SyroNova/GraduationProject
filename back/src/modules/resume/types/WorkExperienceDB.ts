import { RowDataPacket } from "mysql2"

export default interface WorkExperienceDB extends RowDataPacket {
    idWorkExperience: number
    idResume: number
    name: string
    dateStart: Date
    dateEnd: Date
    institution: string
}