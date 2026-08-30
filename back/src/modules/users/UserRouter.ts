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
            validateRequestBody(['document', 'documentType', 'name', 'phone', 'password', 'role']),
            this.userController.register.bind(this.userController)
        );

        this.router.get(
            '/get/document/:document',
            validateRequestParams(['document']),
            this.userController.getByDocument.bind(this.userController)
        )

        this.router.get(
            '/get/id/:idUser',
            validateRequestParams(['idUser']),
            this.userController.getById.bind(this.userController)
        )

        this.router.patch(
            '/change-password',
            validateRequestBody(['document', 'password', 'newPassword']),
            this.userController.changePassword.bind(this.userController)
        )

        this.router.patch(
            '/patch/:id',
            validateUpdateRequest(['email', 'name', 'phone', 'birthDate', 'actualCity', 'gender', 'document', 'documentType']),
            this.userController.update.bind(this.userController)
        )

        this.router.post(
            '/favorite/:idOffer',
            validateRequestParams(['idOffer']),
            this.userController.addFavoriteOffer.bind(this.userController)
        )

        this.router.get(
            '/favorites',
            this.userController.getFavorites.bind(this.userController)
        )

        this.router.delete(
            '/favorite/:idOffer',
            validateRequestParams(['idOffer']),
            this.userController.deleteFavoriteOffer.bind(this.userController)
        )
    }
}