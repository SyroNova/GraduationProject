import { RowDataPacket } from "mysql2"

export default interface SkillsDB extends RowDataPacket{
    idSkill: number
    idResume: number
    name: string
    level: string
}