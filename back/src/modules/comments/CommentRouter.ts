import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import CommentController from "./CommentController.js";
import { validateRequestBody, validateRequestParams } from "../../middlewares/ValidateMiddleware.js";

export default class CommentRouter implements InterfaceRouter{
    public router: Router;
    public path: string;

    constructor(private readonly commentController: CommentController){
        this.router = Router();
        this.path = '/comments';
        this.routes();
    }

    private routes(): void{
        this.router.post(
            '/create',
            validateRequestBody(['idOffer', 'content']),
            this.commentController.createComment.bind(this.commentController)
        )

        this.router.get(
            '/offer/:idOffer',
            validateRequestParams(['idOffer']),
            this.commentController.getByOfferId.bind(this.commentController)
        )

        this.router.delete(
            '/delete/:idComment',
            validateRequestParams(['idComment']),
            this.commentController.deleteComment.bind(this.commentController)
        )
    }
}