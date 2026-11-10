import CommentModel from "../../comments/model/CommentModel.js";
import CompanyModel from "../../companies/model/CompanyModel.js";
import OfferModel from "../../offers/models/OfferModel.js";
import UserModel from "../../users/models/UserModel.js";
import ReportModel from "../model/ReportModel.js";
import ReportController from "../ReportController.js";
import ReportRouter from "../ReportRouter.js";
import ReportService from "../ReportService.js";

export default class ReportFactory{
    static create(){
        const reportModel = new ReportModel()
        const offerModel = new OfferModel()
        const commentModel = new CommentModel()
        const companyModel = new CompanyModel()
        const userModel = new UserModel()
        const reportService = new ReportService(reportModel, userModel, companyModel, commentModel, offerModel)
        const reportController = new ReportController(reportService)
        return new ReportRouter(reportController)
    }
}