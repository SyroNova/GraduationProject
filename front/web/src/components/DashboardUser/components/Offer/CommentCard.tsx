import { Button, Form } from "react-bootstrap"
import type { CommentNode } from "../../../../types/Comment"
import { getDaysSince } from "../../../../utils/dateUtils"
import { useState } from "react"
import axios from "../../../../api/axios"
import { isAxiosError } from "axios"

type Props = {
    idOffer: string
    data: CommentNode
    parentAuthorName?: string
    replyingTo: number | null
    setReplyingTo: React.Dispatch<React.SetStateAction<number | null>>
    onReplyCreated: (newComment: CommentNode) => void
}

export default function CommentCard({ idOffer, data, parentAuthorName, replyingTo, setReplyingTo, onReplyCreated }: Readonly<Props>){
    const [textarea, setTextarea] = useState("")
    
    const handleSubmitReply = async () => {
        try {
            console.log(idOffer)

            const response = await axios.post('/comments/create',{
                idOffer: idOffer,
                content: textarea,
                idParentComment: data.idComment
            })

            const newComment: CommentNode = {
                ...response.data.data,
                children: []
            }

            onReplyCreated(newComment)

            setTextarea("")
            setReplyingTo(null)
        } catch (error) {
            if(isAxiosError(error)){
                console.log(error.response?.data)
            }
            console.log(error)
        }
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <p className="fs-4 mb-1">{data.authorName}<small className="fs-6 text-muted">{parentAuthorName ? ` - En respuesta a ${parentAuthorName}`: ""}</small></p>
                <p className="mb-1" style={{fontSize: "0.7rem"}}>{getDaysSince(data.createdAt)}</p>
            </div>
            <p className="text-muted m-0 mb-1">{data.content}</p>
            <Button 
                className="btn-link bg-transparent mb-2 p-0" 
                onClick={() => {
                    if(replyingTo === data.idComment){
                        setReplyingTo(null)
                        return
                    }
                    setReplyingTo(data.idComment)
                }}
            >
                {replyingTo === data.idComment 
                    ? "Cancelar respuesta"
                    : `Responder a ${data.authorName}`
                }
            </Button>
            <div className="ms-4 border-start ps-3">
                {data.children.map(child => (
                    <CommentCard 
                        idOffer={idOffer}
                        key={child.idComment} 
                        data={child} 
                        parentAuthorName={data.authorName}
                        replyingTo={replyingTo}
                        setReplyingTo={setReplyingTo}
                        onReplyCreated={onReplyCreated}
                    />
                ))}
                {replyingTo === data.idComment && (
                    <Form onSubmit={(e) => {
                        e.preventDefault()
                        handleSubmitReply()
                    }}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                autoFocus
                                as="textarea" 
                                rows={4}
                                value={textarea}
                                onChange={(e) => setTextarea(e.target.value)}
                                style={{
                                    width: '65%', 
                                    resize: 'none'
                                }}
                            />
                        </Form.Group>
                        <Button 
                            type="submit"
                        >
                            Enviar
                        </Button>
                    </Form>
                )}
            </div>
        </>
    )
}