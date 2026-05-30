import TransactionManager from "../../../shared/TransactionManager.js";
import UserModel from "../models/UserModel.js";
import UserController from "../UserController.js";
import UserRouter from "../UserRouter.js";
import UserService from "../UserService.js";

export default class UserFactory{
    static create(){
        const tm = new TransactionManager()
        const userModel = new UserModel()
        const userService = new UserService(userModel, tm)
        const userController = new UserController(userService)
        const userRouter = new UserRouter(userController)
        return userRouter;
    }
}