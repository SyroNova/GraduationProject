import { NextFunction, Request, Response } from "express";
import CompanyService from "./CompanyService.js";
import HttpError from "../../shared/HttpError.js";

export default class CompanyController{
    constructor(private readonly companyService: CompanyService){}

    public async getCompany(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const idCompany = Number(req.params.id);

            if(Number.isNaN(idCompany)){
                throw new HttpError("Invalid company ID", 401);
            }

            const result = await this.companyService.getCompany(idCompany)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}