import { NextFunction, Request, Response } from "express";
import ResumeAcademicExService from "../services/ResumeAcademicExService.js";
import AcademicExperienceDTO from "../dto/create/AcademicExperienceDTO.js";
import HttpError from "../../../shared/HttpError.js";
import UpdateAcademicExDTO from "../dto/update/UpdateAcademicExDTO.js";

export default class ResumeAcademicExController{
    constructor(private readonly academicExService: ResumeAcademicExService) {}

    public async addAcademicExperience(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idResume = Number(req.params.id)
            const data: AcademicExperienceDTO = req.body

            if(Number.isNaN(idResume)) {
                throw new HttpError("Invalid resume ID", 400)
            }

            const result = await this.academicExService.addAcademicExperience(idResume, data)

            res.status(201).json(result)

            return;
        } catch (error) {
            next(error)
        }
    }

    public async getAcademicExperience(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idAcademicExperience = Number(req.params.id)

            if(Number.isNaN(idAcademicExperience)) {
                throw new HttpError("Invalid academic experience ID", 400)
            }

            const result = await this.academicExService.getAcademicExperience(idAcademicExperience)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }

    public async updateAcademicExperience(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idAcademicExperience = Number(req.params.id)
            const data: UpdateAcademicExDTO = req.body

            if(Number.isNaN(idAcademicExperience)) {
                throw new HttpError("Invalid academic experience ID", 400)
            }

            const result = await this.academicExService.updateAcademicExperience(idAcademicExperience, data)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }

    public async deleteAcademicExperience(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idAcademicExperience = Number(req.params.id)

            if(Number.isNaN(idAcademicExperience)) {
                throw new HttpError("Invalid academic experience ID", 400)
            }

            const result = await this.academicExService.deleteAcademicExperience(idAcademicExperience)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }
}