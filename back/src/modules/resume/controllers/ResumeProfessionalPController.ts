import { NextFunction, Request, Response } from "express";
import ResumeProfessionalPService from "../services/ResumeProfessionalPService.js";
import ProfessionalProfileDTO from "../dto/create/ProfessionalProfileDTO.js";
import HttpError from "../../../shared/HttpError.js";
import UpdateProfessionalPDTO from "../dto/update/UpdateProfessionalPDTO.js";

export default class ResumeProfesssionalPController{
    constructor(private readonly professionalPService: ResumeProfessionalPService) {}

    public async addProfessionalProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idResume = Number(req.params.id)
            const data: ProfessionalProfileDTO = req.body

            if(Number.isNaN(idResume)) {
                throw new HttpError("Invalid resume ID", 400)
            }

            const result = await this.professionalPService.addProfessionalProfile(idResume, data)

            res.status(201).json(result)

            return;
        } catch (error) {
            next(error)
        }
    }

    public async getProfessionalProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idProfessionalProfile = Number(req.params.id)

            if(Number.isNaN(idProfessionalProfile)) {
                throw new HttpError("Invalid professional profile ID", 400)
            }

            const result = await this.professionalPService.getProfessionalProfile(idProfessionalProfile)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }

    public async updateProfessionalProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idProfessionalProfile = Number(req.params.id)
            const data: UpdateProfessionalPDTO = req.body

            if(Number.isNaN(idProfessionalProfile)) {
                throw new HttpError("Invalid professional profile ID", 400)
            }

            const result = await this.professionalPService.updateProfessionalProfile(idProfessionalProfile, data)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }

    public async deleteProfessionalProfile(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idProfessionalProfile = Number(req.params.id)

            if(Number.isNaN(idProfessionalProfile)) {
                throw new HttpError("Invalid professional profile ID", 400)
            }

            const result = await this.professionalPService.deleteProfessionalProfile(idProfessionalProfile)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }
}