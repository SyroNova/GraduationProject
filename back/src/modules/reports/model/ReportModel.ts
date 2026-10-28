import { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
import pool from "../../../config/Database.js";
import CreateReportDTO from "../dto/CreateReportDTO.js";
import ReportDB from "../types/ReportDB.js";

export default class ReportModel{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ){}

    public async createReport(data: CreateReportDTO){
        const query = `
            INSERT INTO reports (reporterType, reporterId, targetType, targetId, reason)
            VALUES (?, ?, ?, ?, ?)
        `

        const values = [
            data.reporterType,
            data.reporterId,
            data.targetType,
            data.targetId,
            data.reason
        ]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async getReportById(reportId: number){
        const query = `
            SELECT 
                r.*,
                u.name userName,
                c.name companyName,
                o.title targetOfferTitle,
                cm.content targetCommentContent,
                targetUser.username AS targetUserName,
                targetCompany.name AS targetCompanyName
            FROM reports r
            LEFT JOIN user u
                ON r.reporterType = 'USER'
                AND r.reporterId = u.idUser
            LEFT JOIN company c
                ON r.reporterType = 'COMPANY'
                AND r.reporterId = c.idCompany
            LEFT JOIN offer o
                ON r.targetType = 'OFFER'
                AND r.targetId = c.idOffer
            LEFT JOIN comments o
                ON r.targetType = 'COMMENT'
                AND r.targetId = c.idComment
            LEFT JOIN user targetUser
                ON r.targetType = 'USER'
                AND r.targetId = targetUser.idUser
            LEFT JOIN company targetCompany
                ON r.targetType = 'COMPANY'
                AND r.targetId = targetCompany.idCompany
            WHERE r.idReport = ?
        `

        const [result] = await this.db.execute<ReportDB[]>(query, [reportId])

        return result[0] ?? null
    }
}