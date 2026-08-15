import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "../../api/axios";
import type Offer from "../../types/Offer";
import type { PaginatedResponse } from "../../types/Pagination";
import CustomPagination from "./components/CustomPagination";
import OfferCard from "./components/OfferCard";

export default function DashboardHome(){
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("")
    const [page, setPage] = useState(1);
    const [responseOffers, setResponseOffers] = useState<PaginatedResponse<Offer> | null>(null)

    const handleSearchSubmit = (e: React.SubmitEvent) => {
        e.preventDefault()
        console.log("hola")
    }

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await axios.get<PaginatedResponse<Offer>>('/offers/get', {
                    params: {
                        page: page,
                        limit: 4
                    }
                })

                setResponseOffers(response.data)
            } catch (error) {
                console.log(error)
                setError("Error loading offers")
            } finally{
                setLoading(false)
            }
        }

        fetchOffers()
    }, [page])

    return(
        <div className="d-flex flex-column gap-5 m-5">
            <Form onSubmit={handleSearchSubmit}>
                <Form.Group controlId="formSearch">
                    <Form.Label className="fw-bold fs-5">Encuentra tu proxima oportunidad laboral...</Form.Label>
                    <InputGroup className="w-50">
                        <Form.Control
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button type="submit" variant="primary"><FaSearch color="white"/></Button>
                    </InputGroup>
                </Form.Group>
            </Form>
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
    )
}