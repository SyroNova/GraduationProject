import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import ReportController from "./ReportController.js";
import { validateRequestBody, validateRequestParams } from "../../middlewares/ValidateMiddleware.js";

export default class ReportRouter implements InterfaceRouter{
    public router: Router;
    public path: string;

    constructor(private readonly reportController: ReportController){
        this.router = Router();
        this.path = '/reports';
        this.routes();
    }

    private routes(): void{
        this.router.get(
            '/get/:id',
            validateRequestParams(['id']),
            this.reportController.getReport.bind(this.reportController)
        );

        this.router.post(
            '/create',
            validateRequestBody(['reporterType', 'reporterId', 'targetType', 'targetId', 'reason']),
            this.reportController.createReport.bind(this.reportController)
        )
    }
}