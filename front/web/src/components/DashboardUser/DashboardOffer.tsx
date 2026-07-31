import { useEffect, useState } from "react";
import { Alert, Badge, Spinner } from "react-bootstrap";
import axios from "../../api/axios";
import { useParams } from "react-router-dom";
import type Offer from "../../types/Offer";
import { IoMdTime } from "react-icons/io";
import { getDaysSince } from "../../utils/dateUtils";
import { BsBuildings } from "react-icons/bs";

export default function DashboardOffer(){
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [offer, setOffer] = useState<Offer | null>(null)

    useEffect(() => {
        const fetchOffer = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await axios.get(`/offers/get/${id}`)

                const data = response.data

                setOffer(data)
            } catch (error) {
                console.log(error)
                setError("Error loading offer")
            } finally{
                setLoading(false)
            }
        }

        fetchOffer()
    }, [id])

    if(error || !offer){
        return (
            <Alert variant="danger" className="m-5">
                {error}
            </Alert>
        )
    }

    const days = getDaysSince(offer?.createdAt)

    return (
        <>
            {loading ? 
                <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
                :
                <>
                    <Alert variant="warning" className="m-5 fs-5">
                        <b>Importante:</b>
                        <br />
                        Esta plataforma NO intermedia procesos de contratación. 
                        Aplica directamente con la empresa según las instrucciones.
                    </Alert>
                    <div className="d-flex m-5 flex-column gap-4">
                        <div className="d-flex align-items-center gap-2">
                            <h1>{offer?.title}</h1>
                            <IoMdTime size={25} />
                            <div className="m-0 text-muted fs-5">{days}</div>
                        </div>
                        <div className="d-flex align-items-center gap-2" style={{color: "rgb(30, 64, 175)"}}>
                            <BsBuildings size={30} />
                            <div className="fs-3">{offer.company.companyName}</div>
                        </div>
                        <div className="d-flex gap-2 align-items-center">
                            <Badge pill className="fs-5 fw-medium" bg="" style={{backgroundColor: "rgb(232, 235, 247)", color: "rgb(52, 84, 181)"}}>
                                {offer.contractType}
                            </Badge>
                            <Badge pill className="fs-5 fw-medium" bg="" text="muted" style={{backgroundColor: "rgb(241, 245, 249)"}}>
                                {offer.location}
                            </Badge>
                            <Badge pill className="fs-5 fw-medium" bg="" text="success" style={{backgroundColor: "rgb(230, 244, 239)"}}>
                                {offer.salaryMin}
                            </Badge>
                        </div>
                        <h2>
                            Descripcion de la oferta
                        </h2>
                        <div className="fs-3 fw-medium text-muted">
                            {offer.description}
                        </div>
                    </div>
                </>
            }
        </>
    )
}