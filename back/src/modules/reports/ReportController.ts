import { NextFunction, Request, Response } from "express";
import ReportService from "./ReportService.js";
import CreateReportDTO from "./dto/CreateReportDTO.js";
import HttpError from "../../shared/HttpError.js";

export default class ReportController{
    constructor(private readonly reportService: ReportService){}

    public createReport(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const data: CreateReportDTO = req.body

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