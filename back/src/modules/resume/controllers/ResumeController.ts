import { NextFunction, Request, Response } from "express";
import ResumeService from "../services/ResumeService.js";
import ResumeDTO from "../dto/create/ResumeDTO.js";
import HttpError from "../../../shared/HttpError.js";

export default class ResumeController{
    constructor(private readonly resumeService: ResumeService){}

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

}