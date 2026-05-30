import { ResultSetHeader } from "mysql2"
import pool from "../../../config/Database.js"
import WorkExperienceDB from "../types/WorkExperienceDB.js"
import WorkExperienceDTO from "../dto/create/WorkExperienceDTO.js"
import { Pool, PoolConnection } from "mysql2/promise"

export default class WorkExperienceModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(idResume: number, workExperience: WorkExperienceDTO){
        const query = `
            INSERT INTO work_experience (idResume, name, dateStart, dateEnd, institution)
            VALUES (?, ?, ?, ?, ?)
        `

        const values = [
            idResume,
            workExperience.name,
            workExperience.dateStart,
            workExperience.dateEnd ?? null,
            workExperience.institution
        ]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async update(setClause: string, values: string[]){
        const query = `
            UPDATE work_experience 
            SET ${setClause}
            WHERE idWorkExperience = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async get(id: number){
        const query = `
            SELECT *
            FROM work_experience
            WHERE idWorkExperience = ?
        `

        const [result] = await this.db.execute<WorkExperienceDB[]>(query, [id])

        return result[0] ?? null
    }

    public async getByResumeId(idResume: number){
        const query = `
            SELECT *
            FROM work_experience
            WHERE idResume = ?
        `

        const [result] = await this.db.execute<WorkExperienceDB[]>(query, [idResume])

        return result[0] ?? null
    }

    public async delete(id: number){
        const query = `
            DELETE FROM work_experience
            WHERE idWorkExperience = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, [id])

        return result
    }
}