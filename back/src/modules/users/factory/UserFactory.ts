import UserModel from "../models/UserModel.js";
import UserController from "../UserController.js";
import UserRouter from "../UserRouter.js";
import UserService from "../UserService.js";

export default class UserFactory{
    static create(){
        const userModel = new UserModel()
        const userService = new UserService(userModel)
        const userController = new UserController(userService)
        const userRouter = new UserRouter(userController)
        return userRouter;
    }
}