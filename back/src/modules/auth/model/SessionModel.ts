import { ResultSetHeader } from "mysql2";
import pool from "../../../config/Database.js";
import { SessionDTO } from "../dto/SessionDTO.js";
import { RefreshDTO } from "../dto/RefreshDTO.js";
import { Session } from "../types/Session.js";

export default class SessionModel{

    public async create(session: SessionDTO) {
        
        const query = `
            INSERT INTO session (idUser, refreshToken, createdAt, expiresAt, role)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [session.idUser, session.refreshToken, session.createdAt, session.expiresAt, session.role];
        const [result] = await pool.execute<ResultSetHeader>(query, values);

        return result;
    }

    public async getByRefreshToken(refresh: RefreshDTO){

        const query = `
            SELECT *
            FROM session
            WHERE refreshToken = ?
            AND expiresAt > NOW()
        `
        const [result] = await pool.execute<Session[]>(query, [refresh.refreshToken]);

        return result[0] ?? null;
    }
}