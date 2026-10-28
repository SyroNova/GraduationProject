import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import CompanyController from "./CompanyController.js";
import { validateRequestParams } from "../../middlewares/ValidateMiddleware.js";

export default class CompanyRouter implements InterfaceRouter{
    public router: Router;
    public path: string;
    
    constructor(private readonly companyController: CompanyController){
        this.router = Router();
        this.path = '/company';
        this.routes();
    }

    private routes(){
        this.router.post(
            '/register'

        )

        this.router.get(
            '/get/:id',
            validateRequestParams(['id']),
            this.companyController.getCompany.bind(this.companyController)
        )
    }
}