import { RowDataPacket } from "mysql2"
import { TargetType } from "./TargetType.js"
import { ReporterType } from "./ReporterType.js"

export default interface ReportDB extends RowDataPacket{
    idReport: number
    reporterType: ReporterType
    reporterId: number
    targetType: TargetType
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