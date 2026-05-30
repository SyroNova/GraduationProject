import pool from "../../../config/Database.js";
import { ResultSetHeader } from "mysql2"
import ResumeDB from "../types/ResumeDB.js";
import { Pool, PoolConnection } from "mysql2/promise"

export default class ResumeModel {
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(idUser: number){
        const query = `
            INSERT INTO resume (idUser)
            VALUES (?)
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, [idUser])

        return result
    }

    public async get(idResume: number){
        const query = `
            SELECT * 
            FROM resume
            WHERE idResume = ?
        `

        const [result] = await pool.execute<ResumeDB[]>(query, [idResume])

        return result[0] ?? null
    }

}