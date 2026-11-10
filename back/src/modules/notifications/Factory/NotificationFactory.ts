import CommentModel from "../../comments/model/CommentModel.js";
import CompanyModel from "../../companies/model/CompanyModel.js";
import OfferModel from "../../offers/models/OfferModel.js";
import UserModel from "../../users/models/UserModel.js";
import NotificationModel from "../model/NotificationModel.js";
import NotificationController from "../NotificationController.js";
import NotificationRouter from "../NotificationRouter.js";
import NotificationService from "../NotificationService.js";

export default class NotificationFactory{
    static create(){
        const notiModel = new NotificationModel()
        const offerModel = new OfferModel()
        const commentModel = new CommentModel()
        const companyModel = new CompanyModel()
        const userModel = new UserModel()
        const notiService = new NotificationService(notiModel, userModel, companyModel, commentModel, offerModel)
        const notiController = new NotificationController(notiService)
        return new NotificationRouter(notiController)
    }
}