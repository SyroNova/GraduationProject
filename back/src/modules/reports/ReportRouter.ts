import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";

export default class ReportRouter implements InterfaceRouter{
    public router: Router;
    public path: string;

    constructor(){
        this.router = Router();
        this.path = '/reports';
        this.routes();
    }

    private routes(): void{
        this.router.get('/', (_req, res) => {
            res.send('Get all reports');
        });
    }
}