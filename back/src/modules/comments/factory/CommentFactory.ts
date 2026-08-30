import CommentController from "../CommentController.js";
import CommentRouter from "../CommentRouter.js";
import CommentService from "../CommentService.js";
import CommentModel from "../model/CommentModel.js";

export default class CommentFactory{
    static create(){
        const commentModel = new CommentModel()
        const commentService = new CommentService(commentModel)
        const commentController = new CommentController(commentService)
        return new CommentRouter(commentController)
    }
}