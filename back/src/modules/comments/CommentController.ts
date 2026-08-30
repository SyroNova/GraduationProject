import { NextFunction, Request, Response } from "express";
import CommentService from "./CommentService.js";
import { AuthRequest } from "../../middlewares/AuthMiddleware.js";
import CommentDTO from "./dto/CommentDTO.js";
import HttpError from "../../shared/HttpError.js";

export default class CommentController{

    constructor(private readonly commentService: CommentService){}

    public async createComment(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const { id, role } = req.user ?? { id: 5, role: "user" }

            const commentData: CommentDTO = req.body

            if(!id){
                throw new HttpError("Invalid user", 400)
            }

            const result = await this.commentService.createComment(id, role, commentData)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async getByOfferId(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const idOffer = Number(req.params.idOffer)

            if(Number.isNaN(idOffer)){
                throw new HttpError("Invalid offer id", 400)
            }

            const result = await this.commentService.getByOfferId(idOffer)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async deleteComment(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const { id, role } = req.user ?? { id: 5, role: "user" }

            const idComment = Number(req.params.idComment)

            if(!id){
                throw new HttpError("Invalid user", 400)
            }

            if(Number.isNaN(idComment)){
                throw new HttpError("Invalid idComment", 400)
            }

            const result = await this.commentService.deleteComment(idComment, id, role)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

}