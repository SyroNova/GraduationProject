import CompanyModel from "../companies/model/CompanyModel.js";
import UserModel from "../users/models/UserModel.js";
import CreateReportDTO from "./dto/CreateReportDTO.js";
import ReportModel from "./model/ReportModel.js";
import CommentModel from "../comments/model/CommentModel.js";
import OfferModel from "../offers/models/OfferModel.js";
import { ReporterType } from "./types/ReporterType.js";
import { TargetType } from "./types/TargetType.js";
import HttpError from "../../shared/HttpError.js";

export default class ReportService{
    constructor(
        private readonly reportModel: ReportModel,
        private readonly userModel: UserModel,
        private readonly companyModel: CompanyModel,
        private readonly commentModel: CommentModel,
        private readonly offerModel: OfferModel,
    ){}

    public async createReport(data: CreateReportDTO){
        const checkReporter = await this.validateReporter(data.reporterType, data.reporterId)

        const checkTarget = await this.validateTarget(data.targetType, data.targetId)

        if(!checkReporter){
            throw new HttpError("The reporter was not found on the database", 401)
        }

        if(!checkTarget){
            throw new HttpError("The target was not found on the database", 401)
        }

        const result = await this.reportModel.createReport(data)

        if(result.affectedRows === 0){
            throw new HttpError("The report could not be created", 500)
        }

        return {
            message: "Report created successfully",
            reportId: result.insertId
        }
    }

    public async getReport(reportId: number){
        const result = await this.reportModel.getReportById(reportId)

        if(!result){
            throw new HttpError("The report was not found", 404)
        }

        return {
            message: "Report retrieved successfully",
            report: result
        }
    }

    private async validateTarget(
        targetType: TargetType,
        targetId: number
    ){
        switch (targetType) {
            case TargetType.USER:
                return !!(await this.userModel.findById(targetId))
            
            case TargetType.COMPANY:
                return !!(await this.companyModel.getById(targetId))
            
            case TargetType.OFFER:
                return !!(await this.offerModel.getById(targetId))
            case TargetType.COMMENT:
                return !!(await this.commentModel.getById(targetId))
        }
    }

    private async validateReporter(
        reporterType: ReporterType,
        reporterId: number
    ){
        switch (reporterType) {
            case ReporterType.USER:
                return !!(await this.userModel.findById(reporterId))
            
            case ReporterType.COMPANY:
                return !!(await this.companyModel.getById(reporterId))
            
        }
    }

}