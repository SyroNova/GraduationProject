import { NextFunction, Request, Response } from "express";
import ResumeWorkExService from "../services/ResumeWorkExService.js";
import WorkExperienceDTO from "../dto/create/WorkExperienceDTO.js";
import HttpError from "../../../shared/HttpError.js";
import UpdateWorkExDTO from "../dto/update/UpdateWorkExDTO.js";

export default class ResumeWorkExController{
    constructor(private readonly workExService: ResumeWorkExService) {}

    public async addWorkExperience(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idResume = Number(req.params.id)
            const data: WorkExperienceDTO = req.body

            if(Number.isNaN(idResume)) {
                throw new HttpError("Invalid resume ID", 400)
            }

            const result = await this.workExService.addWorkExperience(idResume, data)

            res.status(201).json(result)

            return;
        } catch (error) {
            next(error)
        }
    }

    public async getWorkExperience(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idWorkExperience = Number(req.params.id)

            if(Number.isNaN(idWorkExperience)) {
                throw new HttpError("Invalid work experience ID", 400)
            }

            const result = await this.workExService.getWorkExperience(idWorkExperience)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }

    public async updateWorkExperience(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idWorkExperience = Number(req.params.id)
            const data: UpdateWorkExDTO = req.body

            if(Number.isNaN(idWorkExperience)) {
                throw new HttpError("Invalid work experience ID", 400)
            }

            const result = await this.workExService.updateWorkExperience(idWorkExperience, data)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }

    public async deleteWorkExperience(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idWorkExperience = Number(req.params.id)
            
            if(Number.isNaN(idWorkExperience)) {
                throw new HttpError("Invalid work experience ID", 400)
            }

            const result = await this.workExService.deleteWorkExperience(idWorkExperience)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }
}