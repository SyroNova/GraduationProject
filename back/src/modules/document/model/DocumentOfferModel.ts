import { ResultSetHeader } from "mysql2"
import pool from "../../../config/Database.js"
import DocumentOfferDB from "../types/DocumentOfferDB.js"
import { PoolConnection } from "mysql2/promise"

export default class DocumentOfferModel{
    public async create(idOffer: number, idDocument: number, conn?: PoolConnection){
        const db = conn || pool

        const query = `
            INSERT INTO offers_documents (idOffer, idDocument)
            VALUES (?, ?)
        `

        const values = [idOffer, idDocument]

        const [result] = await db.execute<ResultSetHeader>(query, values)

        return result
    }


    public async getDocumentsOffer(idOffer: number){
        const query = `
            SELECT *
            FROM offers_documents
            WHERE idOffer = ?
        `

        const [result] = await pool.execute<DocumentOfferDB[]>(query, [idOffer])

        return result
    }
}