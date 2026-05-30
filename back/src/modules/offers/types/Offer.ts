import { TypeContract } from "./TypeContract.js";

export interface Offer {
    idCompany: number
    title: string
    salaryMin: number
    salaryMax?: number
    description: string
    location: string
    contractType: TypeContract
    expireDate?: Date
}