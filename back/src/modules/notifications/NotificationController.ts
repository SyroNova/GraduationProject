import { NextFunction, Request, Response } from "express";
import NotificationService from "./NotificationService.js";
import CreateNotificationDTO from "./dto/CreateNotificationDTO.js";

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
}