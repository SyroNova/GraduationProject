import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import NotificationController from "./NotificationController.js";

export default class NotificationRouter implements InterfaceRouter{
    path: string;
    router: Router;

    constructor(private readonly notiController: NotificationController){
        this.router = Router()
        this.path = '/notification'
        this.routes()
    }
    

    private routes(){
        this.router.post(
            '/create',
            this.notiController.createNotification.bind(this.notiController)
        )

        this.router.patch(
            '/read/:id',
            this.notiController.setReadNotification.bind(this.notiController)
        )

        this.router.get(
            '/get-all',
            this.notiController.getAllNotifications.bind(this.notiController)
        )

        this.router.get(
            '/get-count',
            this.notiController.getNotificationCount.bind(this.notiController)
        )
    }
}