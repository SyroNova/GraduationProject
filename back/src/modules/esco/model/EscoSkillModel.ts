import { Pool, PoolConnection } from "mysql2/promise";
import pool from "../../../config/Database.js";
import SkillEscoDB from "../types/SkillEscoDB.js";

export default class EscoSkillModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ){}

    public async get(){
        const query = `
            SELECT 
                idSkill,
                name
            FROM skills
        `

        const [result] = await this.db.execute<SkillEscoDB[]>(query)

        return result
    }
}