import { NextFunction, Request, Response } from "express";
import CompanyService from "./CompanyService.js";
import HttpError from "../../shared/HttpError.js";
import RegisterCompanyDTO from "./dto/RegisterCompanyDTO.js";
import { AuthRequest } from "../../middlewares/AuthMiddleware.js";

export default class CompanyController{
    constructor(private readonly companyService: CompanyService){}

    public async register(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const data: RegisterCompanyDTO = req.body

            const result = await this.companyService.register(data)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async getCompany(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const idCompany = req.user?.id ?? Number(req.params.id);

            if(Number.isNaN(idCompany)){
                throw new HttpError("Invalid company ID", 401);
            }

            const result = await this.companyService.getCompany(idCompany)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async getByNit(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const nitCompany = String(req.params.nit).trim();

            if(nitCompany.length === 0 ){
                throw new HttpError("Invalid company ID", 401);
            }

            const result = await this.companyService.getByNit(nitCompany)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}