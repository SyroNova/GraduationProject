import { Button, Card } from "react-bootstrap"
import type NotificationDB from "../../../types/Notification"
import { useNavigate } from "react-router-dom"

type Props = {
    data: NotificationDB
}

export default function NotificationCard(props: Readonly<Props>){
    const data = props.data
    const navigator = useNavigate() 

    return (
        <Card className="ms-5 mt-5" style={{ width: '100%', maxWidth: "45rem", height: "100%", maxHeight: "10rem"}}>
            <Card.Body>
                <Card.Title className="mb-3" style={{ color: 'var(--color-text-primary)'}}>Tienes una nueva notificacion</Card.Title>
                <Card.Subtitle className="mb-4 text-muted">{data.message}</Card.Subtitle>
                <div className="d-flex justify-content-end">
                    <Button onClick={() => navigator(`/dashboard/offer/${data.referenceId}`)}>
                        Ver
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}