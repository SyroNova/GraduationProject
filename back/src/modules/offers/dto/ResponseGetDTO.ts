import { OfferDTO } from "./OfferDTO.js"

export default interface ResponseGetDTO{
    page: number
    limit: number
    total: number
    totalPages: number
    data: OfferDTO[]
}