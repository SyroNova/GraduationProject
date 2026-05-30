import { PoolConnection } from "mysql2/promise";
import pool from "../config/Database.js";
import AuditContext from "./interfaces/AuditContext.js";

export default class TransactionManager{

    public async execute<T>(
        callback: (
            conn: PoolConnection
        ) => Promise<T>,

        audit?: AuditContext
    ): Promise<T>{
        const conn = await pool.getConnection()

        try {
            
            await conn.beginTransaction()

            if(audit){
                await conn.query(
                    `
                    SET
                    @audit_actor_id=?,
                    @audit_actor_type=?,
                    @audit_ip=?,
                    @audit_user_agent=?
                    `,
                    [
                    audit.actorId,
                    audit.actorType,
                    audit.ip,
                    audit.userAgent
                    ]
                );
            }

            const result = await callback(conn)

            await conn.commit()

            return result

        } catch (error) {
            await conn.rollback()

            throw error
        } finally{
            conn.release()
        }
    }
}

