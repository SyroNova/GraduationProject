import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../../config/Database.js";
import CommentDTO from "../dto/CommentDTO.js";
import CommentDB from "../types/CommentDB.js";

export default class CommentModel{
    public async createCommentUser(idUser: number, commentData: CommentDTO){
        const query = `
            INSERT INTO comments (idOffer, idUser, idParentComment, content)
            VALUES (?, ?, ?, ?)
        `

        const values = [commentData.idOffer, idUser, commentData.idParentComment ?? null, commentData.content]

        const [result] = await pool.execute<ResultSetHeader>(query, values)

        return result
    }

    public async createCommentCompany(idCompany: number, commentData: CommentDTO){
        const query = `
            INSERT INTO comments (idOffer, idCompany, idParentComment, content)
            VALUES (?, ?, ?, ?)
        `

        const values = [commentData.idOffer, idCompany, commentData.content]

        const [result] = await pool.execute<ResultSetHeader>(query, values)

        return result
    }

    public async getByIdAndOffer(idCommnet: number, idOffer: number){
        const query = `
            SELECT
                idComment
            FROM comments
            WHERE idComment = ? AND idOffer = ?
        `

        const [result] = await pool.execute<RowDataPacket[]>(query, [idCommnet, idOffer])

        return result[0] ?? null
    }

    public async getById(idComment: number){
        const query = `
            SELECT 
                cmm.idComment,
                cmm.content,
                cmm.createdAt,
                cmm.idParentComment,
                COALESCE(c.name, u.name) AS authorName,
                CASE 
                    WHEN cmm.idCompany IS NOT NULL THEN 'company'
                    ELSE 'user'
                END AS authorType
            FROM thesis.comments cmm
            LEFT JOIN thesis.company c ON c.idCompany = cmm.idCompany
            LEFT JOIN thesis.user u ON u.idUser = cmm.idUser
            WHERE cmm.idComment = ?;
        `

        const [result] = await pool.execute<CommentDB[]>(query, [idComment])

        return result[0] ?? null
    }

    public async getByOfferId(idOffer: number){
        const query = `
            SELECT 
                cmm.idComment,
                cmm.content,
                cmm.createdAt,
                cmm.idParentComment,
                COALESCE(c.name, u.name) AS authorName,
                CASE 
                    WHEN cmm.idCompany IS NOT NULL THEN 'company'
                    ELSE 'user'
                END AS authorType
            FROM thesis.comments cmm
            LEFT JOIN thesis.company c ON c.idCompany = cmm.idCompany
            LEFT JOIN thesis.user u ON u.idUser = cmm.idUser
            WHERE cmm.idOffer = ?;
        `

        const [result] = await pool.execute<CommentDB[]>(query, [idOffer])

        return result
    }

    public async deleteComment(idComment: number, idUser: number | null, idCompany: number | null){
        const query = `
            DELETE FROM comments
            WHERE idComment = ?
            AMD (
                idUser = ?
                OR idCompany = ?
            )
        `

        const [result] = await pool.execute<ResultSetHeader>(query, [idComment, idUser, idCompany])

        return result
    }
}