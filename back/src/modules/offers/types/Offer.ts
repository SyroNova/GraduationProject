import { TypeContract } from "./TypeContract.js";
import { DocumentOffer } from "./DocumentOffer.js";

export interface Offer {
    Company_idCompany: number
    title: string
    salaryMin: number
    salaryMax?: number
    description: string
    location: string
    contractType: TypeContract
    expireDate?: Date
    documents?: DocumentOffer[]
}