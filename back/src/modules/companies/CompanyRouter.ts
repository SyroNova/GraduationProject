import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";

export default class CompanyRouter implements InterfaceRouter{
    public router: Router;
    public path: string;
    
    constructor(){
        this.router = Router();
        this.path = '/company';
        this.routes();
    }

    private routes(){
        this.router.post(
            '/register'

        )

        this.router.get(
            '/get/:id'
        )
    }
}