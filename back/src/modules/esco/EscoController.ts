import { NextFunction, Request, Response } from "express";
import EscoService from "./EscoService.js";
import HttpError from "../../shared/HttpError.js";

export default class EscoController{
    constructor(private readonly escoService: EscoService){}

    public async getEscoSkills(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await this.escoService.getEscoSkills()

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }  

    public async getEscoOccupations(
        _req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await this.escoService.getEscoOccupations()

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async getOccupationSkills(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idOccupation = String(req.params.id)

            if(idOccupation.length !== 36){
                throw new HttpError("Invalid occupation id", 400)
            }

            const response = await this.escoService.getOccupationSkills(idOccupation)

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }  
}