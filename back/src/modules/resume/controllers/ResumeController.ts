import { NextFunction, Request, Response } from "express";
import ResumeService from "../services/ResumeService.js";
import ResumeDTO from "../dto/create/ResumeDTO.js";
import HttpError from "../../../shared/HttpError.js";
import ResumePreviewService from "../services/ResumePreviewService.js";
import { AuthRequest } from "../../../middlewares/AuthMiddleware.js";

export default class ResumeController{
    constructor(
        private readonly resumeService: ResumeService,
        private readonly resumePreviewService: ResumePreviewService
    ){}

    public async createResume(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idResume = Number(req.params.id)

            const data: ResumeDTO = req.body

            if(Number.isNaN(idResume)){
                throw new HttpError("Invalid resume ID", 400)
            }

            const result = await this.resumeService.createCompleteResume(idResume, data)

            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async getResume(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idResume = Number(req.params.id)

            if(Number.isNaN(idResume)){
                throw new HttpError("Invalid resume ID", 400)
            }

            const result = await this.resumeService.getCompleteResume(idResume)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async getPdfResume(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idResume = Number(req.params.id)
            const idUser = req.user?.id ?? 5

            if(Number.isNaN(idResume)){
                throw new HttpError("Invalid resume ID", 400)
            }

            const result = await this.resumePreviewService.getPdfResume(idResume, idUser)

            res.status(200).send(result)
        } catch (error) {
            next(error)
        }
    }

}