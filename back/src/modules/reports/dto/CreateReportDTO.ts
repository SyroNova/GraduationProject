import { ReporterType } from "../types/ReporterType.js"
import { TargetType } from "../types/TargetType.js"

export default interface CreateReportDTO{
    reporterType: ReporterType
    reporterId: number
    targetType: TargetType
    targetId: number
    reason: string
}