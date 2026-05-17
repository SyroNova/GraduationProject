import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import { validateRequest, validateRequestParams, validateRequestQuery } from "../../middlewares/ValidateMiddleware.js";
import OfferController from "./OfferController.js";

export default class OfferRouter implements InterfaceRouter{
    path: string;
    router: Router;

    constructor(private readonly offerController: OfferController){
        this.router = Router();
        this.path= "/offers";
        this.routes();
    }

    private routes(): void{
        this.router.post(
            '/create',
            validateRequest(['idCompany', 'title', 'description', 'location', 'contractType', 'salaryMin']),
            this.offerController.createOffer.bind(this.offerController)
        )

        this.router.get(
            '/get',
            validateRequestQuery(['page', 'limit']),
            this.offerController.get.bind(this.offerController)
        )

        this.router.get(
            '/get/:id',
            validateRequestParams(['id']),
            this.offerController.getOfferById.bind(this.offerController)
        )
        
        this.router.patch(
            '/update/:id',
            this.offerController.update.bind(this.offerController)
        )
    }

}