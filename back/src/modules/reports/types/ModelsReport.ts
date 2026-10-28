import CommentModel from "../../comments/model/CommentModel.js";
import CompanyModel from "../../companies/model/CompanyModel.js";
import OfferModel from "../../offers/models/OfferModel.js";
import UserModel from "../../users/models/UserModel.js";
import ReportModel from "../model/ReportModel.js";

export default interface ModelsReport{
    reportModel: ReportModel
    userModel: UserModel
    companyModel: CompanyModel
    offerModel: OfferModel
    commentModel: CommentModel
}