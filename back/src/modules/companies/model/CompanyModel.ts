import { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
import pool from "../../../config/Database.js";
import CompanyDB from "../types/CompanyDB.js";
import RegisterCompanyDTO from "../dto/RegisterCompanyDTO.js";
import RoleDB from "../../../shared/RoleDB.js";

export default class CompanyModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ){}

    public async register(data: RegisterCompanyDTO){
        const query = `
            INSERT INTO company (NIT, name, passwordHash, location, description)
            VALUES (?, ?, ?, ?, ?)
        `

        const values = [data.NIT, data.name, data.password, data.location, data.description]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async getById(idCompany: number){
        const query = `
            SELECT 
                c.NIT,
                c.idCompany,
                c.location,
                c.description,
                c.name,
                r.name role
            FROM company c
            INNER JOIN role r on r.idRole = c.role
            WHERE idCompany = ?
        `

        const [result] = await this.db.execute<CompanyDB[]>(query, [idCompany])

        return result[0] ?? null
    }

    public async getByNit(nit: string){
        const query = `
            SELECT
                c.NIT,
                c.idCompany,
                c.location,
                c.description,
                c.name,
                r.name role
            FROM company c
            INNER JOIN role r on r.idRole = c.role
            WHERE NIT = ?
        `

        const [result] = await this.db.execute<CompanyDB[]>(query, [nit])

        return result[0] ?? null
    }

    public async getRole(role: number){
        const query = `
            SELECT name 
            FROM role
            WHERE idRole = ?
        `

        const [result] = await this.db.execute<RoleDB[]>(query, [role])

        return result[0] ?? null;
    }
    
}