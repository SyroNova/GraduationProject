import { NextFunction, Request, Response } from "express";
import OfferService from "./OfferService.js";
import UpdateOfferDTO from "./dto/UpdateOfferDTO.js";
import FilterOfferDTO from "./dto/FilterOfferDTO.js";
import HttpError from "../../shared/HttpError.js";
import { AuthRequest } from "../../middlewares/AuthMiddleware.js";
import AuditContextConstructor from "../../shared/AuditContextConstructor.js";

export default class OfferController {
    constructor(private readonly offerService: OfferService) {}

    public async createOffer(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
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
            } = req.body;

            const auditContext = AuditContextConstructor.get(req);

            const response = await this.offerService.create(
                { idCompany, title, description, location, contractType, salaryMin, salaryMax, expireDate },
                auditContext
            );

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    public async get(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idUser = req.user?.id ?? 5; // TODO: REMEMBER TO REMOVE THE DEFAULT VALUE WHEN THE AUTHENTICATION IS IMPLEMENTED
            const page = Number(req.query.page ?? req.body?.page ?? 1);
            const limit = Number(req.query.limit ?? req.body?.limit ?? 10);

            if (Number.isNaN(page) || page <= 0) {
                throw new HttpError("Page invalid", 400);
            }

            if (Number.isNaN(limit) || limit <= 0) {
                throw new HttpError("Limit invalid", 400);
            }

            const filterDTO: FilterOfferDTO = {
                search: (req.query.search as string) ?? req.body?.search,
                location: (req.query.location as string) ?? req.body?.location,
                contractType: (req.query.contractType as any) ?? req.body?.contractType,
                salaryMin: req.query.salaryMin !== undefined
                    ? Number(req.query.salaryMin)
                    : (req.body?.salaryMin !== undefined ? Number(req.body.salaryMin) : undefined),
                salaryMax: req.query.salaryMax !== undefined
                    ? Number(req.query.salaryMax)
                    : (req.body?.salaryMax !== undefined ? Number(req.body.salaryMax) : undefined),
                skills: (req.query.skills as any) ?? req.body?.skills,
            };

            const response = await this.offerService.get(page, limit, idUser, filterDTO);

            return res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    public async getOfferById(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            const id = Number(req.params.id);

            if (Number.isNaN(id)) {
                throw new HttpError("Id invalid", 400);
            }

            const response = await this.offerService.getOfferById(id);

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

    public async update(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const data: UpdateOfferDTO = req.body;
            const idOffer = Number(req.params.id);

            if (Number.isNaN(idOffer)) {
                throw new HttpError("Id invalido", 400);
            }

            const auditContext = AuditContextConstructor.get(req);
            
            const response = await this.offerService.update(
                data, 
                idOffer, 
                auditContext
            );

            return res.status(200).json(response);
        } catch (error: any) {
            if (error.code === "ER_CHECK_CONSTRAINT_VIOLATED") {
                return res.status(400).json({ message: "SalaryMin cannot be greater or equal than SalaryMax" });
            } 
            next(error);
        } 
    }
}