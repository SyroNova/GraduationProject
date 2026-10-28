import { Alert, Button, Card, Form, Spinner } from "react-bootstrap"
import type { CommentNode } from "../../../../types/Comment"
import CommentCard from "./CommentCard"
import { useState } from "react"
import axios from "../../../../api/axios"
import type Comment from "../../../../types/Comment"
import UseAuth from "../../../../hooks/UseAuth"

type Props = {
    idOffer: string
}

export default function CommentSection({ idOffer }: Readonly<Props>){
    const [isReplying, setIsReplying] = useState<number | null>(null)
    const [showComments, setShowComments] = useState(false)
    const [comments, setComments] = useState<CommentNode[]>([])
    const [loadingComments, setLoadingComments] = useState(false)
    const [textarea, setTextarea] = useState("")
    const [error, setError] = useState("")
    const { auth } = UseAuth()

    const buildTree = (
        comments: Comment[],
        parentId: number | null = null
    ): CommentNode[] => {
        return comments
            .filter(comment => comment.idParentComment === parentId)
            .map(comment => ({
                ...comment,
                children: buildTree(comments, comment.idComment)
            }))
    }

    const addReply = (
        coments: CommentNode[],
        parentId: number,
        newComment: CommentNode
    ): CommentNode[] => {
        return coments.map(coment => {
            if(coment.idComment === parentId){
                return {
                    ...coment,
                    children: [...coment.children, newComment]
                }
            }

            return {
                ...coment,
                children: addReply(coment.children, parentId, newComment)
            }
        })
    }

    const handleShowComments = async (idOffer: string) => {
        try {
            setLoadingComments(true)

            const response = await axios.get<Comment[]>(`/comments/offer/${idOffer}`)
            
            const data = buildTree(response.data)

            setComments(data)
        } catch (error) {
            console.log(error)
            setError("Error cargando comentarios")

            setTimeout(() => {
                setError("")
            }, 3000)
        } finally{
            setLoadingComments(false)
        }
    }

    const handleSubmitComment = async () => {
        try {
            setLoadingComments(true)

            const response = await axios.post('/comments/create', {
                idOffer: idOffer,
                content: textarea,
            })

            const newComment: CommentNode = {
                ...response.data.data,
                children: []
            }

            setComments(prev => {
                return [
                    ...prev,
                    newComment
                ]
            })

            
        } catch (error) {
            console.log(error)
            setError("Error creando comentario")

            setTimeout(() => {
                setError("")
            }, 3000)
        } finally{
            setTextarea("")
            setLoadingComments(false)
        }
    }

    const handleSubmitReply = async (newComment: CommentNode) => {
        setComments(prev => addReply(prev, newComment.idParentComment!, newComment))
    }

    return (
        <div className="mt-5 ms-5">
            <h2>Comentarios</h2>
            {showComments && (
                <div className="d-flex flex-column gap-4">
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmitComment()
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Label>Ingrese su comentario</Form.Label>
                            <Form.Control
                                as="textarea"
                                value={textarea}
                                onChange={(e) => setTextarea(e.target.value)}
                                rows={4} 
                                style={{
                                    width: '65%', 
                                    resize: 'none'
                                }}
                            />
                        </Form.Group>
                        <Button type="submit" className="mb-2">Enviar</Button>
                    </Form>
                    {loadingComments ? (
                        <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner> 
                        ) : (
                            comments.map(comment => (
                                <Card className="mb-1" key={comment.idComment} style={{width: "65%"}}>
                                    <Card.Body>
                                        <CommentCard
                                            idUser={auth?.id ?? "5"}
                                            idOffer={idOffer}
                                            data={comment}
                                            replyingTo={isReplying}
                                            setReplyingTo={setIsReplying}
                                            onReplyCreated={handleSubmitReply}
                                        />
                                    </Card.Body>
                                </Card>
                            ))
                        )
                    }
                </div>
            )}
            <Button 
                className="btn-light mt-4" 
                onClick={() => {
                    setShowComments(true)
                    handleShowComments(idOffer)
                }} 
                hidden={showComments}
            >
                Cargar comentarios
            </Button>
            {error !== "" && (
                <Alert variant="danger" className="mt-3">
                    {error}
                </Alert>
            )}
        </div>
    )
}


