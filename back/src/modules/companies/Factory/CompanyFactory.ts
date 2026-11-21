import CompanyController from "../CompanyController.js";
import CompanyRouter from "../CompanyRouter.js";
import CompanyService from "../CompanyService.js";
import CompanyModel from "../model/CompanyModel.js";

export default class CompanyFactory{
    static create(){
        const companyModel = new CompanyModel()
        const companyService = new CompanyService(companyModel)
        const companyController = new CompanyController(companyService)
        return new CompanyRouter(companyController)
    }
}