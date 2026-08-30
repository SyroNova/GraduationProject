import HttpError from "../../shared/HttpError.js";
import CommentDTO from "./dto/CommentDTO.js";
import CommentModel from "./model/CommentModel.js";

export default class CommentService{
    constructor(private readonly commentModel: CommentModel){}

    public async createComment(id: number, role: string, commentData: CommentDTO){
        if(commentData.idParentComment != null){
            await this.verifyParent(commentData.idParentComment, commentData.idOffer)
        }

        if(role === "user"){
            const response = await this.commentModel.createCommentUser(id, commentData)

            if(response.affectedRows === 0){
                throw new HttpError("Error creating comment", 500)
            }

            const comment = await this.commentModel.getById(response.insertId)

            if(!comment){
                throw new HttpError("Comment created but not found", 400)
            }

            return { message: "Comment created succesfully", data: comment}
        }

        if(role === "company"){
            const response = await this.commentModel.createCommentCompany(id, commentData)

            if(response.affectedRows === 0){
                throw new HttpError("Error creating comment", 500)
            }

            return { message: "Comment created succesfully", data: response.insertId}
        }

        throw new HttpError("Invalid role", 400)
    }

    public async getByOfferId(idOffer: number){
        const comments = await this.commentModel.getByOfferId(idOffer)

        return comments 
    }

    public async deleteComment(idComment: number, id: number, role: string){
        if(role === "user"){
            const response = await this.commentModel.deleteComment(idComment, id, null)

            if(response.affectedRows === 0){
                throw new HttpError("Comment not found", 404)
            }

            return { message: "Comment deleted succesfully" }
        }
        
        if(role === "company"){
            const response = await this.commentModel.deleteComment(idComment, null, id)

            if(response.affectedRows === 0){
                throw new HttpError("Comment not found", 404)
            }

            return { message: "Comment deleted succesfully" }
        }

        throw new HttpError("Invalid role", 400)
    }

    private async verifyParent(idParent: number, idOffer: number){
        const response = await this.commentModel.getByIdAndOffer(idParent, idOffer)

        if(!response){
            throw new HttpError("Id of Parent comment does not exists in the offer", 500)
        }
    }
}