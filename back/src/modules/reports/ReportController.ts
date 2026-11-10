import { NextFunction, Request, Response } from "express";
import ReportService from "./ReportService.js";
import CreateReportDTO from "./dto/CreateReportDTO.js";
import HttpError from "../../shared/HttpError.js";
import { AuthRequest } from "../../middlewares/AuthMiddleware.js";
import { ReporterType } from "./types/ReporterType.js";

export default class ReportController{
    constructor(private readonly reportService: ReportService){}

    public createReport(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            //TODO: REMEMBER TO DELETE THE PARAMETERS FOR TESTING
            const { targetType, targetId, reason } = req.body

            const reporterType = req.user?.role.toUpperCase() ?? ReporterType.USER
            const reporterId = req.user?.id ?? 5

            if(Number.isNaN(reporterId)){
                throw new HttpError("Invalid reporter ID", 400);
            }

            if(reporterType !== ReporterType.USER && reporterType !== ReporterType.COMPANY){
                throw new HttpError("Invalid reporter type", 400);
            }

            const data: CreateReportDTO = {
                reporterType,
                reporterId,
                targetType,
                targetId,
                reason
            }

            const response = this.reportService.createReport(data)

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public getReport(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const idReport = Number(req.params.id)

            if(Number.isNaN(idReport)){
                throw new HttpError("Invalid report ID", 400);
            }

            const response = this.reportService.getReport(idReport)

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}