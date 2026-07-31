import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import { validateRequestBody } from "../../middlewares/ValidateMiddleware.js";
import AuthController from "./AuthController.js";

export default class AuthRouter implements InterfaceRouter{
    public router: Router;
    public path: string;

    constructor(private readonly authController: AuthController){
        this.router = Router();
        this.path = '/auth';
        this.routes();
    }

    private routes(): void{
        this.router.post(
            '/login/user',
            validateRequestBody(['document', 'password']),
            this.authController.login.bind(this.authController)
        );

        this.router.post(
            '/refresh',
            this.authController.refresh.bind(this.authController)
        );

        this.router.post(
            '/send-code/registration',
            validateRequestBody(['phone']),
            this.authController.sendCodeRegistration.bind(this.authController)
        );

        this.router.post(
            '/verify-code/registration',
            validateRequestBody(['phone', 'code']),
            this.authController.verifyCodeRegistration.bind(this.authController)
        )

        this.router.patch(
            '/change-password',
            validateRequestBody(['document', 'newPassword']),
            this.authController.changePassword.bind(this.authController)
        )
    }
}