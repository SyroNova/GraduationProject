import { ResultSetHeader } from "mysql2"
import pool from "../../../config/Database.js"
import SkillsDB from "../types/SkillsDB..js"
import SkillsDTO from "../dto/create/SkillsDTO.js"
import { Pool, PoolConnection } from "mysql2/promise"

export default class SkillsModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(skills: SkillsDTO){
        const query = `
            INSERT INTO skills (name, level)
            VALUES (?, ?)
        `

        const values = [
            skills.name,
            skills.level
        ]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async update(setClause: string, values: string[]){
        const query = `
            UPDATE skills 
            SET ${setClause}
            WHERE idSkills = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async get(id: number){
        const query = `
            SELECT *
            FROM skills
            WHERE idSkills = ?
        `

        const [result] = await this.db.execute<SkillsDB[]>(query, [id])

        return result[0] ?? null
    }

    public async delete(id: number){
        const query = `
            DELETE FROM skills
            WHERE idSkills = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, [id])

        return result
    }
}