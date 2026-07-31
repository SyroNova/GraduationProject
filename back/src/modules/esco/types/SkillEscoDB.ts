import { RowDataPacket } from "mysql2"

export default interface SkillEscoDB extends RowDataPacket{
    idSkill: string,
    name: string
}