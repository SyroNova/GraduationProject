import { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
import pool from "../../../config/Database.js";
import ResumeSkillsDB from "../types/ResumeSkillsDB.js";

export default class ResumeSkillsModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(idResume: number, idSkills: number){
        const query = `
            INSERT INTO resume_skills (idResume, idSkills)
            VALUES (?, ?)
        `

        const values = [idResume, idSkills]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async getByResumeId(idResume: number){
        const query = `
            SELECT *
            FROM resume_skills
            WHERE idResume = ?
        `

        const [result] = await this.db.execute<ResumeSkillsDB[]>(query, [idResume])

        return result[0] ?? null
    }
}