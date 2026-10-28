import { RowDataPacket } from "mysql2"

export default interface ReportDB extends RowDataPacket{
    idReport: number
    reporterType: string
    reporterId: number
    targetType: string
    targetId: number
    reason: string
    status: string
    createdAt: Date
    priority: string
    userName?: string
    companyName?: string
    targetOfferTitle?: string
    targetCommentContent?: string
    targetUserName?: string
    targetCompanyName?: string
}