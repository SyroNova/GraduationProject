import { useEffect, useState } from "react";
import type { PaginatedResponse } from "../../types/Pagination";
import type Offer from "../../types/Offer";
import axios from "../../api/axios";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import OfferCard from "./components/OfferCard";
import CustomPagination from "./components/CustomPagination";

export default function DashboardSaves(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [page, setPage] = useState(1);
    const [responseOffers, setResponseOffers] = useState<PaginatedResponse<Offer> | null>(null)

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await axios.get<PaginatedResponse<Offer>>('/users/favorites', {
                    params: {
                        page: page,
                        limit: 4
                    }
                })

                setResponseOffers(response.data)
            } catch (error) {
                console.log(error)
                setError("Error loading favorites")
            } finally{
                setLoading(false)
            }
        }

        fetchOffers()
    }, [page])

    return(
        <>
            <div className="d-flex flex-column align-items-center mt-2">
                <h2 style={{color: "var(--color-text-primary)"}}>Ofertas guardadas</h2>
                <p className="text-muted" style={{color: "var(--color-text-secondary)"}}>Tienes {responseOffers?.total ?? 0} ofertas guardadas</p>
            </div>
            <hr className="mt-0"/>
            <div className="d-flex flex-column gap-5 m-5">
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
                    <Row>
                        {responseOffers?.data.map((offer: Offer) => {
                            return (
                                <Col key={offer.idOffer} xs={12} md={6}>
                                    <OfferCard data={offer} isFavorite={offer.isFavorite}/>
                                </Col>
                            )
                        })}
                    </Row>
                }
                
                <CustomPagination page={page} totalPages={responseOffers?.totalPages} onChange={setPage}></CustomPagination>
            </div>
        </>
    )
}