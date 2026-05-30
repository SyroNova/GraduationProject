import { ResultSetHeader } from "mysql2"
import pool from "../../../config/Database.js"
import ProfessionalProfileDB from "../types/ProfessionalProfileDB.js"
import ProfessionalProfileDTO from "../dto/create/ProfessionalProfileDTO.js"
import { Pool, PoolConnection } from "mysql2/promise"

export default class ProfessionalProfileModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(idResume: number, professionalProfile: ProfessionalProfileDTO){
        const query = `
            INSERT INTO professional_profile (idResume, title, resume)
            VALUES (?, ?, ?)
        `

        const values = [
            idResume,
            professionalProfile.title,
            professionalProfile.resume
        ]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async update(setClause: string, values: string[]){
        const query = `
            UPDATE professional_profile 
            SET ${setClause}
            WHERE idProfessionalProfile = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async get(id: number){
        const query = `
            SELECT *
            FROM professional_profile
            WHERE idProfessionalProfile = ?
        `

        const [result] = await this.db.execute<ProfessionalProfileDB[]>(query, [id])

        return result[0] ?? null
    }

    public async getByResumeId(idResume: number){
        const query = `
            SELECT *
            FROM professional_profile
            WHERE idResume = ?
        `

        const [result] = await this.db.execute<ProfessionalProfileDB[]>(query, [idResume])

        return result[0] ?? null
    }

    public async delete(id: number){
        const query = `
            DELETE FROM professional_profile
            WHERE idProfessionalProfile = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, [id])

        return result
    }
} 