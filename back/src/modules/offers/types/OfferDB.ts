import { RowDataPacket } from "mysql2";
import { TypeContract } from "./TypeContract.js";

export interface OfferDB extends RowDataPacket{
    idOffer: number
    idCompany: CompanyOffer
    title: string
    salaryMin: number
    salaryMax?: number
    description: string
    location: string
    contractType: TypeContract
    expireDate?: Date
    createdAt: Date
}

interface CompanyOffer{
    companyName: string
    companyLocation: string
}
