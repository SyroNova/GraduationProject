import TokenService from "../../../shared/TokenService.js";
import TransactionManager from "../../../shared/TransactionManager.js";
import SessionModel from "../../auth/model/SessionModel.js";
import UserModel from "../models/UserModel.js";
import UserOfferFav from "../models/UserOfferFav.js";
import UserProfileImage from "../models/UserProfileImage.js";
import UserController from "../UserController.js";
import UserRouter from "../UserRouter.js";
import UserService from "../UserService.js";

export default class UserFactory{
    static create(){
        const sessionModel = new SessionModel()
        const tokenService = new TokenService(sessionModel)
        const tm = new TransactionManager()
        const userModel = new UserModel()
        const favModel = new UserOfferFav()
        const userProfile = new UserProfileImage()
        const userService = new UserService(userModel, favModel, tm, tokenService, userProfile)
        const userController = new UserController(userService)
        const userRouter = new UserRouter(userController)
        return userRouter;
    }
}