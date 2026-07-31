import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import EscoController from "./EscoController.js";

export default class EscoRouter implements InterfaceRouter{
    public path: string = '/esco';
    public router: Router;
    
    constructor(
        private readonly escoController: EscoController
    ){
        this.router = Router()
        this.routes()
    }

    private routes(){
        this.router.get(
            '/skills',
            this.escoController.getEscoSkills.bind(this.escoController)
        )

        this.router.get(
            '/occupations',
            this.escoController.getEscoOccupations.bind(this.escoController)
        )

        this.router.get(
            '/occupations/:id/recommended-skills',
            this.escoController.getOccupationSkills.bind(this.escoController)
        )
    }
}