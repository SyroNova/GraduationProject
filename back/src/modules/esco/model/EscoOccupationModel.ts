import { Pool, PoolConnection } from "mysql2/promise";
import pool from "../../../config/Database.js";
import OccupationEscoDB from "../types/OccupationEscoDB.js";
import SkillOccupationDB from "../types/SkillOccupationDB.js";

export default class EscoOccupationModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ){}

    public async getOne(idOccupation: string){
        const query = `
            SELECT *
            FROM occupations
            WHERE idOccupation = ?
        `

        const [result] = await this.db.execute<OccupationEscoDB[]>(query, [idOccupation])

        return result[0] ?? null
    }

    public async getAll(){
        const query = `
            SELECT *
            FROM occupations
        `

        const [result] = await this.db.execute<OccupationEscoDB[]>(query)

        return result
    }

    public async getRelatedSkills(idOccupation: string){
        const query = `
            SELECT
                idSkill,
                relationType
            FROM skills_occupations
            WHERE idOccupation = ?
        `

        const [result] = await this.db.execute<SkillOccupationDB[]>(query, [idOccupation])

        return result
    }
}