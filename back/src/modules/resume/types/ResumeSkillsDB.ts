import { RowDataPacket } from "mysql2";

export default interface ResumeSkillsDB extends RowDataPacket{
    idResume: number,
    idSkills: number
}