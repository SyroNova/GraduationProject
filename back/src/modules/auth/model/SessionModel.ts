import { ResultSetHeader } from "mysql2";
import pool from "../../../config/Database.js";
import { SessionDTO } from "../dto/SessionDTO.js";
import { RefreshDTO } from "../dto/RefreshDTO.js";
import { Session } from "../types/Session.js";
import { Pool, PoolConnection } from "mysql2/promise";

export default class SessionModel{

    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(session: SessionDTO) {

        const query = `
            INSERT INTO session (idUser, refreshToken, createdAt, expiresAt, role)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [session.idUser, session.refreshToken, session.createdAt, session.expiresAt, session.role];
        const [result] = await this.db.execute<ResultSetHeader>(query, values);

        console.log(result.affectedRows)
        

        return result;
    }

    public async getByRefreshToken(refresh: RefreshDTO){

        const query = `
            SELECT *
            FROM session
            WHERE refreshToken = ?
            AND expiresAt > NOW()
        `
        const [result] = await this.db.execute<Session[]>(query, [refresh.refreshToken]);

        return result[0] ?? null;
    }
}