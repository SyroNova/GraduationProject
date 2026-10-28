import { useEffect, useState } from "react";
import { Alert, Button, Col, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import axios from "../../api/axios";
import type Offer from "../../types/Offer";
import type { PaginatedResponse } from "../../types/Pagination";
import CustomPagination from "./components/CustomPagination";
import OfferCard from "./components/OfferCard";
import { CiFilter } from "react-icons/ci";
import type FilterOffer from "../../types/FilterOffer";
import DropdownFilters from "./components/DropdownFilters";
import type { FilterType } from "../../types/FilterOffer";

export default function DashboardHome(){
    const [filters, setFilters] = useState<FilterOffer | null>(null)
    const [appliedFilters, setAppliedFilters] = useState<FilterOffer | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const [page, setPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false)
    const [responseOffers, setResponseOffers] = useState<PaginatedResponse<Offer> | null>(null)

    const filterNames: {
        label: string,
        key: FilterType
    }[] = [
        { label: "Ubicación", key: "location" },
        { label: "Contrato", key: "contractType" },
        { label: "Salario", key: "salary" },
        { label: "Habilidades", key: "skills" }
    ]

    const handleSearchSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        console.log(filters)
        setAppliedFilters(filters)
        setPage(1)
    }

    useEffect(() => {
        const fetchOffers = async () => {
            try {
                setLoading(true)
                setError("")

                const response = await axios.get<PaginatedResponse<Offer>>('/offers/get', {
                    params: {
                        page: page,
                        limit: 4,
                        search: appliedFilters?.search,
                        location: appliedFilters?.location,
                        contractType: appliedFilters?.contractType,
                        salaryMin: appliedFilters?.salaryMin,
                        salaryMax: appliedFilters?.salaryMax,
                        skills: appliedFilters?.skills
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
    }, [page, appliedFilters])

    return(
        <div className="d-flex flex-column gap-5 m-5">
            <Form onSubmit={handleSearchSubmit}>
                <Row>
                    <Col className="d-flex align-items-end">
                        <Form.Group controlId="formSearch">
                            <Form.Label className="fw-bold fs-5">Encuentra tu proxima oportunidad laboral...</Form.Label>
                            <InputGroup style={{width: "80%"}}>
                                <Form.Control
                                    type="text"
                                    value={filters?.search}
                                    onChange={(e) => {
                                        const value = e.target.value
                                        setFilters(prev => ({
                                            ...prev,
                                            search: value
                                        }))
                                    }}
                                />
                                <Button type="submit" variant="primary"><FaSearch color="white"/></Button>
                            </InputGroup>
                        </Form.Group>
                        <Button 
                            type="button" 
                            className="d-flex align-items-center me-4" 
                            style={{borderRadius: "10px"}} 
                            onClick={() => {
                                setShowFilters(!showFilters)
                                setFilters(null)
                            }} 
                            variant="light"
                        >
                            Filtros
                            <CiFilter className="ms-3"/>
                        </Button>
                    </Col>
                </Row>
                {showFilters && (
                    <Row className="mt-3">
                        <Col className="d-flex justify-content-between">
                            {filterNames.map(filter => (
                                <DropdownFilters 
                                    key={filter.key} 
                                    variant={filter.label}
                                    filterKey={filter.key}
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            ))}
                        </Col>
                    </Row>
                )}
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
                <Row className="row-gap-2">
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