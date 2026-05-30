import { NextFunction, Request, Response } from "express";
import ResumeSkillService from "../services/ResumeSkillService.js";
import SkillsDTO from "../dto/create/SkillsDTO.js";
import HttpError from "../../../shared/HttpError.js";
import UpdateSkillDTO from "../dto/update/UpdateSkillDTO.js";

export default class ResumeSkillController{
    constructor(private readonly skillService: ResumeSkillService){}

    public async addSkill(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idResume = Number(req.params.id)
            const data: SkillsDTO = req.body

            if(Number.isNaN(idResume)) {
                throw new HttpError("Invalid resume ID", 400)
            }

            const result = await this.skillService.addSkill(idResume, data)

            res.status(201).json(result)

            return;
        } catch (error) {
            next(error)
        }
    }

    public async getSkill(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idSkill = Number(req.params.id)

            if(Number.isNaN(idSkill)) {
                throw new HttpError("Invalid skill ID", 400)
            }

            const result = await this.skillService.getSkill(idSkill)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }

    public async updateSkill(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idSkill = Number(req.params.id)
            const data: UpdateSkillDTO = req.body

            if(Number.isNaN(idSkill)) {
                throw new HttpError("Invalid skill ID", 400)
            }

            const result = await this.skillService.updateSkill(idSkill, data)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }

    public async deleteSkill(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idSkill = Number(req.params.id)

            if(Number.isNaN(idSkill)) {
                throw new HttpError("Invalid skill ID", 400)
            }

            const result = await this.skillService.deleteSkill(idSkill)

            res.status(200).json(result)
            return;
        } catch (error) {
            next(error)
        }
    }
}