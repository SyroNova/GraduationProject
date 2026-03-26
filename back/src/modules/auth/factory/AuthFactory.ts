import UserModel from "../../users/models/UserModel.js"
import AuthController from "../AuthController.js"
import AuthRouter from "../AuthRouter.js"
import AuthService from "../AuthService.js"
import SessionModel from "../model/SessionModel.js"
import SmsModel from "../model/SmsModel.js"
import TokenService from "../TokenService.js"

export default class AuthFactory{
    static create(){
        const sessionModel = new SessionModel()
        const smsModel = new SmsModel()
        const userModel = new UserModel()
        const tokenService = new TokenService()
        const authService = new AuthService(tokenService, userModel, sessionModel, smsModel)
        const authController = new AuthController(authService)
        const authRouter = new AuthRouter(authController)
        return authRouter;
    }
}