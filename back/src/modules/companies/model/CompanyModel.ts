import { Pool, PoolConnection } from "mysql2/promise";
import pool from "../../../config/Database.js";
import CompanyDB from "../types/CompanyDB.js";

export default class CompanyModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ){}

    public async getById(idCompany: number){
        const query = `
            SELECT 
                *
            FROM company
            WHERE idCompany = ?
        `

        const [rows] = await this.db.execute<CompanyDB[]>(query, [idCompany])

        return rows[0] ?? null
    }
}