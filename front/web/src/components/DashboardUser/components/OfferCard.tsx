import { Card, Col, Row } from "react-bootstrap";
import type Offer from "../../../types/Offer";
import { FaDollarSign } from "react-icons/fa6";
import { PiSuitcase } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { Link } from "react-router";
import { getDaysSince } from "../../../utils/dateUtils";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useState } from "react";
import axios from "../../../api/axios";

type Props = {
    data: Offer,
    isFavorite?: boolean
}

export default function OfferCard(props: Readonly<Props>){
    const favorite = props.isFavorite ?? false

    const [isBookmarked, setIsBookmarked] = useState(favorite)

    const offer = props.data

    const days = getDaysSince(offer.createdAt)

    const handleBookmarkAdd = async () => {
        try {
            await axios.post(`/users/favorite/${offer.idOffer}`)

            //window.alert(response.data.message)

            setIsBookmarked(true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleBookmarkRemove = async () => {
        try {
            await axios.delete(`/users/favorite/${offer.idOffer}`)

            //window.alert(response.data.message)

            setIsBookmarked(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className="mb-5" style={{ width: '100%', maxWidth: "45rem", height: "100%", maxHeight: "15rem", position:"relative" }}>
            <Card.Body className="ms-3 mt-2">
                <Card.Title className="d-flex justify-content-between mb-3" style={{color: "var(--color-text-primary)"}}>
                    <Link to={`/dashboard/offer/${offer.idOffer}`} style={{ color: 'inherit' }}>
                        {offer.title}
                    </Link>
                    {isBookmarked ? <FaBookmark size={25} onClick={handleBookmarkRemove}/> : <FaRegBookmark size={25} color="gray" onClick={handleBookmarkAdd}/>}
                </Card.Title>
                <Card.Subtitle className="mb-3 text-muted">{offer.company.companyName}</Card.Subtitle>
                <Row>
                    <Col className="text-center">
                        <CiLocationOn size={25} />
                        <p className="text-muted">{offer.location}</p>
                    </Col>
                    <Col className="text-center">
                        <FaDollarSign color="black" size={20}/>
                        <p className="text-success m-0">
                            {offer.salaryMin}
                        </p>
                        {offer.salaryMax ?
                            <>
                                <p className="m-0 p-0">-</p>
                                <p className="text-success">
                                    {offer.salaryMax}
                                </p>
                            </>
                            : <></>
                        }
                    </Col>
                    <Col className="text-center">
                        <PiSuitcase size={25}/> 
                        <p className="text-muted">
                            {offer.contractType.charAt(0) + offer.contractType.slice(1).toLowerCase()}
                        </p>
                    </Col>
                </Row>
                <Card.Text className="text-end" style={{position: "absolute", bottom: "10px", right: "10px"}}>
                    {days}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}