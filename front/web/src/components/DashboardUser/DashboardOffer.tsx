import { useEffect, useState } from "react";
import { Alert, Badge, Button, Col, Row, Spinner } from "react-bootstrap";
import axios from "../../api/axios";
import { Link, useParams } from "react-router-dom";
import type Offer from "../../types/Offer";
import { IoMdTime } from "react-icons/io";
import { getDaysSince } from "../../utils/dateUtils";
import { BsBuildings } from "react-icons/bs";
import { MdArrowBackIosNew } from "react-icons/md";
import type MetadataResponse from "../../types/Curriculum/Document";
import DocumentCard from "./components/DocumentCard";
import { isAxiosError } from "axios";
import CommentSection from "./components/Offer/CommentSection";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoFlagOutline } from "react-icons/io5";


export default function DashboardOffer(){
    const { id } = useParams()

    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [offer, setOffer] = useState<Offer | null>(null)
    const [documents, setDocuments] = useState<MetadataResponse[]>([])
    const [isBookmarked, setIsBookmarked] = useState(offer?.isFavorite ?? false)

    const fetchOffer = async (idOffer: string) => {
        const response = await axios.get(`/offers/get/${idOffer}`)

        const data = response.data

        setIsBookmarked(data.isFavorite)

        return data
    }

    const fetchDocuments = async (idOffer: string) => {
        const response = await axios.get(`/document/get/offer/${idOffer}`)

        const data = response.data

        return data
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError("")

                if(id == null){
                    throw new Error("Id offer not valid")
                }

                const [responseOffer, responseDoc] = await Promise.all([
                    fetchOffer(id),
                    fetchDocuments(id)
                ])

                setOffer(responseOffer)
                setDocuments(responseDoc)
            } catch (error) {
                if(isAxiosError(error)){
                    console.log(error.response?.data)
                }
                setError("Error cargando oferta")
            }finally{
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    if(error || !offer){
        return (
            <Alert variant="danger" className="m-5">
                {error}
            </Alert>
        )
    }

    const days = getDaysSince(offer?.createdAt)

    const handleBookmark = async () => {
        try {
            if(isBookmarked){
                await axios.delete(`/users/favorite/${offer.idOffer}`)
                setIsBookmarked(false)
            } else {
                await axios.post(`/users/favorite/${offer.idOffer}`);
                setIsBookmarked(true);
            }
        } catch (error) {
            console.log("Error al actualizar favoritos", error)
        }
    }

    return (
        <>
            {loading ? 
                <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
                :
                <>  
                    <div>
                        <Row className="">
                            <Col xs="auto" className="mt-2">
                                <Link className="text-decoration-none text-reset" to="/dashboard/home">
                                    <MdArrowBackIosNew size={40}/>
                                </Link>
                            </Col>
                            <Col >
                                <Alert variant="warning" className="mt-5 me-5 fs-5">
                                    <b>Importante:</b>
                                    <br />
                                    Esta plataforma NO intermedia procesos de contratación. 
                                    Aplica directamente con la empresa según las instrucciones.
                                </Alert>
                            </Col>
                        </Row>
                    </div>
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
                        <div className="mt-2">
                            {documents?.length > 0 && 
                                documents.map(document => (
                                    <DocumentCard 
                                        key={document.idDocument}
                                        document={document}
                                        isOffer={true}
                                    />
                                ))
                            }
                        </div>
                        <Row>
                            <Col sm="auto">
                                <Button className="fw-semibold" variant="light" onClick={handleBookmark}>
                                    {isBookmarked 
                                        ? <FaBookmark className="me-4"/> 
                                        : <FaRegBookmark className="me-4"/>
                                    }
                                    {isBookmarked ? "Oferta guardada" : "Guardar oferta"}
                                </Button>
                            </Col>
                            <Col sm="auto">
                                <Button className="fw-semibold" variant="danger"><IoFlagOutline size={20} className="me-3"/>Reportar oferta</Button>
                            </Col>
                        </Row>
                    </div>
                    <hr />
                    <CommentSection idOffer={id!}/>
                </>
            }
        </>
    )
}