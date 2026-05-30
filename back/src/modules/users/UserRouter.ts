import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import UserController from "./UserController.js";
import { validateRequestBody, validateRequestParams, validateUpdateRequest } from "../../middlewares/ValidateMiddleware.js";

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
            validateRequestBody(['cc', 'typeCC', 'name', 'phone', 'password', 'rol']),
            this.userController.register.bind(this.userController)
        );

        this.router.get(
            '/get/:cc',
            validateRequestParams(['cc']),
            this.userController.getByCC.bind(this.userController)
        )

        this.router.patch(
            '/change-password',
            validateRequestBody(['cc', 'password', 'newPassword']),
            this.userController.changePassword.bind(this.userController)
        )

        this.router.patch(
            '/update/:id',
            validateUpdateRequest(['email', 'name', 'phone', 'birthDate', 'actualCity', 'gender']),
            this.userController.update.bind(this.userController)
        )
    }
}