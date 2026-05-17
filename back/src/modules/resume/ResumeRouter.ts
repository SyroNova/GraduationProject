import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import ResumeController from "./ResumeController.js";

export default class ResumeRouter implements InterfaceRouter{
    path: string;
    router: Router;

    constructor(private readonly resumeController: ResumeController) {
        this.router = Router()
        this.path = '/resume'
        this.routes()
    }

    private routes(){

    }
}