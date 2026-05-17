import { DocumentOffer } from "../types/DocumentOffer.js";

export default interface Offer{
    idCompany: number
    title: string
    salaryMin: number
    salaryMax?: number
    description: string
    location: string
    contractType: string
    expireDate?: string
    documents?: DocumentOffer[]
}