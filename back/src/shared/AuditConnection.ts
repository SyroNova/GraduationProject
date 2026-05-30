import pool from "../config/Database.js";
import { AuthRequest } from "../middlewares/AuthMiddleware.js";

export default class AuditConnection{

    static async get(
        req: AuthRequest
    ){
        const conn = await pool.getConnection();

        await conn.query(`
            SET
                @audit_actor_id = ?,
                @audit_actor_type = ?,
                @audit_ip = ?,
                @audit_user_agent = ?
            `,
            [
                req.user?.id,
                req.user?.role,
                req.ip,
                req.headers[
                    'user-agent'
                ]
        ])

        return conn;
    }
}