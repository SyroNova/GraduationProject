import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import UserController from "./UserController.js";
import { validateRequest } from "../../middlewares/ValidateMiddleware.js";

export default class UserRouter implements InterfaceRouter{
    public router: Router;
    public path: string;

    constructor(private readonly userController: UserController){
        this.router = Router();
        this.path = '/users';
        this.routes();
    }

    private routes(): void{
        this.router.post(
            '/register',
            validateRequest(['cc', 'typeCC', 'name', 'phone', 'password', 'rol']),
            this.userController.register.bind(this.userController)
        );

        
    }
}