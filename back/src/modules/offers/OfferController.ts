import { NextFunction, Request, Response } from "express";
import OfferService from "./OfferService.js";
import UpdateOfferDTO from "./dto/UpdateOfferDTO.js";
import HttpError from "../../shared/HttpError.js";

export default class OfferController{
    constructor(private readonly offerService: OfferService){}

    public async createOffer(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const { 
                idCompany, 
                title, 
                description, 
                location, 
                contractType, 
                salaryMin, 
                salaryMax, 
                expireDate, 
                documents 
            } = req.body

            const response = await this.offerService.create({ idCompany, title, description, location, contractType, salaryMin, salaryMax, expireDate, documents})

            return res.status(200).json(response)
        } catch (error: any) {
            if(error.code === "ER_CHECK_CONSTRAINT_VIOLATED"){
                return res.status(400).json({ message: "SalaryMin cannot be greater or equal than SalaryMax"})
            } 
            next(error)
        }
    }

    public async get(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const page = Number(req.query.page)
            const limit = Number(req.query.limit)
    
            if(Number.isNaN(page) || page === 0){
                throw new HttpError("Page invalid", 400)
            }
    
            if(Number.isNaN(limit)){
                throw new HttpError("Limit invalid", 400)
            }
    
            const response = await this.offerService.get(page, limit);
    
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async getOfferById(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const id = Number(req.params.id)

            if(Number.isNaN(id)){
                throw new HttpError("Id invalid", 400)
            }

            const response = await this.offerService.getOfferById(id)

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
        
    }

    public async update(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const data: UpdateOfferDTO = req.body
    
            const idOffer = Number(req.params.id)
    
            if(Number.isNaN(idOffer)){
                throw new HttpError("Id invalido", 400)
            }
    
            const response = await this.offerService.update(data, idOffer)
    
            return res.status(200).json(response)
        } catch (error: any) {
            if(error.code === "ER_CHECK_CONSTRAINT_VIOLATED"){
                return res.status(400).json({ message: "SalaryMin cannot be greater or equal than SalaryMax"})
            } 
            next(error)
        }
    }
}