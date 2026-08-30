import { ResultSetHeader } from "mysql2"
import pool from "../../../config/Database.js"
import { DocumentDB } from "../types/DocumentDB.js"
import DocumentDTO from "../dto/DocumentDTO.js"
import { PoolConnection } from "mysql2/promise"
import MetadataResponseDTO from "../dto/MetadataResponseDTO.js"

export default class DocumentModel{
    public async create(document: DocumentDTO, conn?: PoolConnection){
        const db = conn || pool

        const query = `
            INSERT INTO documents (file, fileName, mimeType, fileSize)
            VALUES (?, ?, ?, ?)
        `

        const values = [document.file, document.fileName, document.mimeType, document.fileSize]

        const [result] = await db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async update(setClause: string, values: string[]){
        const query = `
            UPDATE documents 
            SET ${setClause}
            WHERE idDocument = ?
        `

        const [result] = await pool.execute<ResultSetHeader>(query, values)

        return result
    }

    public async getMetadata(id: number){
        const query = `
            SELECT idDocument, fileName, mimeType, fileSize, createdAt
            FROM documents
            WHERE idDocument = ?
        `

        const [result] = await pool.execute<MetadataResponseDTO[]>(query, [id])

        return result[0] ?? null
    }

    public async getMetadataByIds(ids: number[], placeholders: string, conn?: PoolConnection){
        const db = conn || pool

        const query = `
            SELECT idDocument, fileName, mimeType, fileSize, createdAt
            FROM documents
            WHERE idDocument IN (${placeholders}) 
        `

        const [result] = await db.execute<MetadataResponseDTO[]>(query, ids)

        return result
    }

    public async get(id: number){
        const query = `
            SELECT *
            FROM documents
            WHERE idDocument = ?
        `

        const [result] = await pool.execute<DocumentDB[]>(query, [id])

        return result[0] ?? null
    }

    public async deleteDocument(idDocument: number){
        const query = `
            DELETE FROM documents
            WHERE idDocument = ?
        `

        const [result] = await pool.execute<ResultSetHeader>(query, [idDocument])

        return result
    }
}