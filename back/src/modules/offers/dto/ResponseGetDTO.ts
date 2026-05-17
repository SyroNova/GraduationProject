import { OfferDB } from "../types/OfferDB.js"

export default interface ResponseGetDTO{
    page: number
    limit: number
    total: number
    totalPages: number
    data: OfferDB[]
}