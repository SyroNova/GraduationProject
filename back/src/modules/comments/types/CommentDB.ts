import { RowDataPacket } from "mysql2"

export default interface CommentDB extends RowDataPacket{
    idUser: number
    idComment: number
    content: string
    createdAt: string
    idParentComment: number | null
    authorName: string
    authorType: "company" | "user"
}