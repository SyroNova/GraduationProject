import { TypeContract } from "../types/TypeContract.js"

export default interface UpdateOfferDTO{
    title?: string
    salaryMin?: number
    salaryMax?: number
    description?: string
    location?: string
    contractType?: TypeContract
    expireDate?: Date
}