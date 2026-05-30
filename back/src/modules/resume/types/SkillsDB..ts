import { RowDataPacket } from "mysql2"

export default interface SkillsDB extends RowDataPacket{
    idSkills: number
    idResume: number
    name: string
    level: string
}