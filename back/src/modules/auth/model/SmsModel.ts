import { ResultSetHeader } from "mysql2";
import pool from "../../../config/Database.js";
import { Sms } from "../types/Sms.js";

export default class SmsModel{
    
    public async sendCode(phone: string, code: string){

        const query = `
            INSERT INTO sms_codes (phone, code, expiresAt)
            VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 5 MINUTE))
        `

        const values = [phone, code]
        const [result] = await pool.execute<ResultSetHeader>(query, values)

        return result;
    }

    public async getSms(phone: string, code: string){

        const query = `
            SELECT * 
            FROM sms_codes
            WHERE phone = ?
            ORDER BY createdAt DESC
            LIMIT 1
        `

        const values = [phone, code]
        const [result] = await pool.execute<Sms[]>(query, values)

        return result[0] ?? null;
    }

    public async increaseAttempts(id: number){

        const query = `
            UPDATE sms_codes
            SET attempts = attempts + 1
            WHERE idSms = ?
        `

        const value = [id]
        const [result] = await pool.execute(query, value)

        return result;
    }

    public async deleteSms(id: number){

        const query = `
            DELETE FROM sms_codes
            WHERE idSms = ?
        `

        const value = [id]
        const [result] = await pool.execute(query, value)

        return result;
    }

}