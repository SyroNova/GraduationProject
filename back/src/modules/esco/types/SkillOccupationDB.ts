import { RowDataPacket } from "mysql2";

export default interface SkillOccupationDB extends RowDataPacket{
    idSkill: string,
    relationType: string
}