export default interface Comment{
    idComment: number
    content: string
    createdAt: string
    idParentComment: number | null
    authorName: string
    authorType: "company" | "user"
}

export interface CommentNode extends Comment{
    children: CommentNode[]
}