import { RowDataPacket } from "mysql2";
import { TypeContract } from "./TypeContract.js";
import { DocumentOffer } from "./DocumentOffer.js";

export interface OfferDB extends RowDataPacket{
    idOffer: number
    Company_idCompany: CompanyOffer
    title: string
    salaryMin: number
    salaryMax?: number
    description: string
    location: string
    contractType: TypeContract
    expireDate?: Date
    documents?: DocumentOffer[]
    createdAt: Date
}

interface CompanyOffer{
    companyName: string
    companyLocation: string
}
