import { ResultSetHeader } from "mysql2"
import pool from "../../../config/Database.js"
import DocumentResumeDB from "../types/DocumentResumeDB.js"
import { PoolConnection } from "mysql2/promise"

export default class DocumentResumeModel{
    public async create(idResume: number, idDocument: number, conn?: PoolConnection){
        const db = conn || pool

        const query = `
            INSERT INTO resume_documents (idResume, idDocument)
            VALUES (?, ?)
        `

        const values = [idResume, idDocument]

        const [result] = await db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async getDocumentsResume(idResume: number){
        const query = `
            SELECT *
            FROM resume_documents
            WHERE idResume = ?
        `

        const [result] = await pool.execute<DocumentResumeDB[]>(query, [idResume])

        return result
    }
}