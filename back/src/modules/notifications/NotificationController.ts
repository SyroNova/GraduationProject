import { NextFunction, Request, Response } from "express";
import NotificationService from "./NotificationService.js";
import CreateNotificationDTO from "./dto/CreateNotificationDTO.js";
import HttpError from "../../shared/HttpError.js";
import { AuthRequest } from "../../middlewares/AuthMiddleware.js";
import { RecipientType } from "./types/RecipientType.js";

export default class NotificationController{
    constructor(private readonly notiService: NotificationService){}

    public async createNotification(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const data: CreateNotificationDTO = req.body

            const result = await this.notiService.createNotification(data)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async setReadNotification(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            //TODO: REMEMBER TO DELETE THE PARAMETERS FOR TESTING
            const idNoti = Number(req.params.id)

            const recipientId = req.user?.id ?? 5

            const recipientType = req.user?.role.toUpperCase() ?? RecipientType.USER

            if(Number.isNaN(idNoti)){
                throw new HttpError("IdNotification not valid", 400)
            }

            if(Number.isNaN(recipientId)){
                throw new HttpError("IdRecipient not valid", 400)
            }

            if(recipientType !== RecipientType.USER && recipientType !== RecipientType.COMPANY){
                throw new HttpError("RecipientType not valid", 400)
            }

            const result = await this.notiService.setReadNotification(idNoti, recipientId, recipientType)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async getAllNotifications(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const recipientId = req.user?.id ?? 5

            if(Number.isNaN(recipientId)){
                throw new HttpError("IdRecipient not valid", 400)
            }

            const result = await this.notiService.getAllNotifications(recipientId)
            
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    
    public async getNotificationCount(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const recipientId = req.user?.id ?? 5

            if(Number.isNaN(recipientId)){
                throw new HttpError("IdRecipient not valid", 400)
            }

            const result = await this.notiService.getNotificationCount(recipientId)
            
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    } 
}