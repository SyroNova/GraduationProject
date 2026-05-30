import { RegisterUserDTO } from "../dto/RegisterUserDTO.js";
import pool from "../../../config/Database.js";
import UserDB from "../types/UserDB.js";
import { ResultSetHeader } from "mysql2";
import RoleDB from "../types/RoleDB.js";
import { Pool, PoolConnection } from "mysql2/promise";

export default class UserModel{

    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(user: RegisterUserDTO) {
        
        const query = `
            INSERT INTO user (cc, typeCC, name, phone, passwordHash, idRole)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        const values = [user.cc, user.typeCC, user.name, user.phone, user.password, user.rol];
        const [result] = await this.db.execute<ResultSetHeader>(query, values);

        return result;
    }

    public async findById(id: number) {
        const query = `
            SELECT * FROM user WHERE idUser = ?
        `;
        const [result] = await pool.execute<UserDB[]>(query, [id]);

        return result[0] ?? null;
    }

    public async findByCC(cc: string) {
        const query = `
            SELECT 
                u.idUser,
                u.name,
                u.cc,
                u.typeCC,
                u.passwordHash,
                u.phone,
                r.name role
            FROM user u
            INNER JOIN role r on r.idRole = u.idRole
            WHERE cc = ?
        `;
        const [result] = await pool.execute<UserDB[]>(query, [cc]);

        return result[0] ?? null;
    }

    public async updatePassword(ccUser: string, newPasswordHash: string){
        const query = `
            UPDATE 
                USER
            SET passwordHash = ?
            WHERE cc = ?
        `;
        const [result] = await this.db.execute<ResultSetHeader>(query, [newPasswordHash, ccUser]);

        return result.affectedRows > 0;
    }

    public async getRole(role: number){

        const query = `
            SELECT name 
            FROM role
            WHERE idRole = ?
        `

        const [result] = await pool.execute<RoleDB[]>(query, [role])

        return result[0] ?? null;
    }

    public async update(setClause: string, values: string[]){
        const query = `
            UPDATE user
            SET ${setClause}
            WHERE idUser = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result;
    }
}