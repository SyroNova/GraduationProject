import CommentModel from "../comments/model/CommentModel.js";
import CompanyModel from "../companies/model/CompanyModel.js";
import OfferModel from "../offers/models/OfferModel.js";
import UserModel from "../users/models/UserModel.js";
import CreateNotificationDTO from "./dto/CreateNotificationDTO.js";
import NotificationModel from "./model/NotificationModel.js";
import { RecipientType } from "./types/RecipientType.js";
import { ReferenceType } from "./types/ReferenceType.js";

export default class NotificationService{
    constructor(
        private readonly notiModel: NotificationModel,
        private readonly userModel: UserModel,
        private readonly companyModel: CompanyModel,
        private readonly commentModel: CommentModel,
        private readonly offerModel: OfferModel
    ){}

    public async createNotification(data: CreateNotificationDTO){

    }

    private async validateTarget(
        referenceType: ReferenceType,
        referenceId: number
    ){
        switch (referenceType) {
            case ReferenceType.USER:
                return !!(await this.userModel.findById(referenceId))
            
            case ReferenceType.COMPANY:
                return !!(await this.companyModel.getById(referenceId))
            
            case ReferenceType.OFFER:
                return !!(await this.offerModel.getById(referenceId))
            case ReferenceType.COMMENT:
                return !!(await this.commentModel.getById(referenceId))
        }
    }

    private async validateReporter(
        recipientType: RecipientType,
        recipientId: number
    ){
        switch (recipientType) {
            case RecipientType.USER:
                return !!(await this.userModel.findById(recipientId))
            
            case RecipientType.COMPANY:
                return !!(await this.companyModel.getById(recipientId))
            
        }
    }
}