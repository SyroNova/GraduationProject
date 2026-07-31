import { ResultSetHeader } from "mysql2"
import pool from "../../../config/Database.js"
import SkillsDB from "../types/SkillsDB..js"
import SkillsDTO from "../dto/create/SkillsDTO.js"
import { Pool, PoolConnection } from "mysql2/promise"

export default class SkillsModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(skills: SkillsDTO, idResume: number){
        const query = `
            INSERT INTO resume_skill (idResume, idSkill, level)
            VALUES (?, ?, ?)
        `

        const values = [
            idResume,
            skills.idSkill,
            skills.level
        ]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async update(setClause: string, values: string[]){
        const query = `
            UPDATE resume_skill 
            SET ${setClause}
            WHERE idResume = ? AND idSkill = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async getAll(id: number){
        const query = `
            SELECT 
                rs.idSkill,
                rs.idResume,
                s.name,
                rs.level
            FROM resume_skill rs
            INNER JOIN skills s ON rs.idSkill = s.idSkill
            WHERE rs.idResume = ?
        `

        const [result] = await this.db.execute<SkillsDB[]>(query, [id])

        return result
    }

    public async getOne(idResume: number, idSkill: string){
        const query = `
            SELECT 
                rs.idSkill,
                rs.idResume,
                s.name,
                rs.level
            FROM resume_skill rs
            INNER JOIN skills s ON rs.idSkill = s.idSkill
            WHERE rs.idResume = ? AND rs.idSkill = ?
        `

        const [result] = await this.db.execute<SkillsDB[]>(query, [idResume, idSkill])

        return result[0] ?? null
    }

    public async delete(idResume: number, idSkill: string){
        const query = `
            DELETE FROM resume_skill
            WHERE idResume = ? AND idSkill = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, [idResume, idSkill])

        return result
    }
}