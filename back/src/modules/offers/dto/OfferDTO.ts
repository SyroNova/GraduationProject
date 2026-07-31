import { TypeContract } from "../types/TypeContract.js"

export interface OfferDTO{
    idOffer: number
    company: CompanyOffer
    title: string
    salaryMin: number
    salaryMax?: number
    description: string
    location: string
    contractType: TypeContract
    expireDate?: Date
    createdAt: Date,
    isFavorite: boolean
}

interface CompanyOffer{
    idCompany: number
    companyName: string
    companyLocation: string
}