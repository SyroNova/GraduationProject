import HttpError from "../../shared/HttpError.js";
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
        const checkReference = await this.validateReference(data.referenceType, data.referenceId)
        
        const checkRecipient = await this.validateRecipient(data.recipientType, data.recipientId)

        if(!checkReference){
            throw new HttpError("The reference was not found on the database", 401)
        }

        if(!checkRecipient){
            throw new HttpError("The recipient was not found on the database", 401)
        }

        const result = await this.notiModel.createNotification(data)

        if(result.affectedRows === 0){
            throw new HttpError("The notification could not be created", 500)
        }

        return {
            message: "Notification created successfully",
            notificationId: result.insertId
        }
    }

    public async setReadNotification(idNoti: number, recipientId: number, recipientType: string){
        const result = await this.notiModel.setReadNotification(idNoti, recipientId, recipientType)

        if(result.affectedRows === 0){
            throw new HttpError("The notification could not be marked as read", 500)
        }

        return {
            message: "Notification marked as read successfully"
        }
    }

    public async getAllNotifications(recipientId: number){
        const result = await this.notiModel.getAll(recipientId)

        return {
            message: "Succesfully got notifications",
            result: result
        }
    }

    public async getNotificationCount(recipientId: number){
        const result = await this.notiModel.getNotificationCount(recipientId)
        
        return {
            message: "Succesfully got notification count",
            result: result
        }
    }

    private async validateReference(
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

    private async validateRecipient(
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