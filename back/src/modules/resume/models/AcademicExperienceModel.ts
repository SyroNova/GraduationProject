import { ResultSetHeader } from "mysql2"
import pool from "../../../config/Database.js"
import AcademicExperienceDB from "../types/AcademicExperienceDB.js"
import AcademicExperienceDTO from "../dto/create/AcademicExperienceDTO.js"
import { Pool, PoolConnection } from "mysql2/promise"

export default class AcademicExperienceModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(idResume: number, academicExperience: AcademicExperienceDTO){
        const query = `
            INSERT INTO academic_experience (idResume, position, company, dateStart, dateEnd, description)
            VALUES (?, ?, ?, ?, ?, ?)
        `

        const values = [
            idResume,
            academicExperience.degree,
            academicExperience.institution,
            academicExperience.dateStart,
            academicExperience.dateEnd ?? null,
            academicExperience.description ?? null
        ]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async update(setClause: string, values: string[]){
        const query = `
            UPDATE academic_experience 
            SET ${setClause}
            WHERE idAcademicExperience = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async get(id: number){
        const query = `
            SELECT *
            FROM academic_experience
            WHERE idAcademicExperience = ?
        `

        const [result] = await this.db.execute<AcademicExperienceDB[]>(query, [id])

        return result[0] ?? null
    }

    public async getByResumeId(idResume: number){
        const query = `
            SELECT *
            FROM academic_experience
            WHERE idResume = ?
        `

        const [result] = await this.db.execute<AcademicExperienceDB[]>(query, [idResume])

        return result[0] ?? null
    }

    public async delete(id: number){
        const query = `
            DELETE FROM academic_experience
            WHERE idAcademicExperience = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, [id])

        return result
    }
}