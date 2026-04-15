import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";

export default class OfferRouter implements InterfaceRouter{
    path: string;
    router: Router;

    constructor(){
        this.router = Router();
        this.path= "/offers";
        this.routes();
    }

    private routes(): void{
        this.router.post(
            '/create'
        )

        this.router.get(
            '/get'
        )

        this.router.patch(
            '/update'
        )
    }

}