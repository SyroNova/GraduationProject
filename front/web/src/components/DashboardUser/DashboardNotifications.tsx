import { useEffect, useState } from "react"
import axios from "../../api/axios"
import { Alert, Col, Row, Spinner } from "react-bootstrap"
import { isAxiosError } from "axios"
import NotificationCard from "./components/NotificationCard"
import type NotificationDB from "../../types/Notification"

export default function DashboardNotifications(){

    const [notifications, setNotifications] = useState<NotificationDB[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    
    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await axios.get(`/notification/get-all`)

                setNotifications(response.data.result)
            } catch (error) {
                if(isAxiosError(error)){
                    console.log(error.response?.data)
                }
                setError("Error loading notifications")
            } finally{
                setLoading(false)
            }
        }
        void fetchNotifications()
    }, [])

    console.log(notifications)

    return(
        <>
            {error &&
                <Alert variant="warning">
                    {error}
                </Alert>
            }
            {loading ? 
                <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
                :
                <Row className="row-gap-2">
                    {notifications?.map((noti: NotificationDB) => {
                        return (
                            <Col key={noti.idNotification}>
                                <NotificationCard
                                    data={noti}
                                />
                            </Col>
                        )
                    })}
                </Row>
            }
        </>
    )
}