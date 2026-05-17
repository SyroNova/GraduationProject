import HttpError from "../../shared/HttpError.js";
import CreateOfferDTO from "./dto/CreateOfferDTO.js"
import DocumentsDTO from "./dto/DocumentsDTO.js";
import ResponseGetDTO from "./dto/ResponseGetDTO.js";
import UpdateOfferDTO from "./dto/UpdateOfferDTO.js";
import OfferModel from "./models/OfferModel.js";
import { DocumentOffer } from "./types/DocumentOffer.js";
import { TypeContract } from "./types/TypeContract.js";

export default class OfferService{
    constructor(
        private readonly offerModel: OfferModel
    ){}

    public async create(offerDTO: CreateOfferDTO){
        if(!this.isTypeContract(offerDTO.contractType)){
            throw new HttpError("Contract type is not valid", 400)
        }

        if(offerDTO.salaryMax){
            this.verifySalary(offerDTO.salaryMin, offerDTO.salaryMax)
        }

        const response = await this.offerModel.create({
            Company_idCompany: offerDTO.idCompany,
            title: offerDTO.title,
            description: offerDTO.description,
            location: offerDTO.location,
            salaryMin: offerDTO.salaryMin,
            contractType: offerDTO.contractType,
            expireDate: offerDTO.expireDate ? this.convertDate(offerDTO.expireDate) : undefined,
            salaryMax: offerDTO.salaryMax ?? undefined,
            documents: offerDTO.documents ? this.convertDocuments(offerDTO.documents) : undefined
        })

        if(response.affectedRows === 0){
            throw new HttpError("Error creating offer", 500)
        }

        const offer = await this.getOfferById(response.insertId);

        return {message: "Offer created succesfully", offer: offer}
    }

    public async get(page: number, limit: number){
        const offset = (page - 1) * limit

        const response = await this.offerModel.get(offset, limit);

        const totalPages = Math.ceil(response.total / limit)

        const responseDTO: ResponseGetDTO = {
            page: page,
            limit: limit,
            total: response.total,
            totalPages: totalPages,
            data: response.result
        }

        return responseDTO
    }

    public async getOfferById(id: number){
        const result = await this.offerModel.getById(id);

        if(!result){
            throw new Error("Error getting offer")
        }

        return result;
    }

    public async update(updateDTO: UpdateOfferDTO, idOffer: number){
        if(updateDTO.salaryMax && updateDTO.salaryMin){
            this.verifySalary(updateDTO.salaryMin, updateDTO.salaryMin)
        }

        if(updateDTO.contractType){
            if(!this.isTypeContract(updateDTO.contractType)){
                throw new HttpError("Contract type is not valid", 400)
            }
        }

        const fields = Object.keys(updateDTO);
        
        const setClause = fields.map((field: string) => `${field} = ?`).join(', ')

        const values = Object.values(updateDTO);
        
        values.push(idOffer)

        const response = await this.offerModel.update(setClause, values)

        if(response.affectedRows === 0){
            throw new HttpError("Error updating offer", 500)
        }

        const offer = await this.offerModel.getById(idOffer)

        return {message: "Updated offer succesfully", offer: offer}

    }

    private convertDate(stringDate: string): Date{
        return new Date(stringDate)
    }

    private convertDocuments(documentsDTO: DocumentsDTO): DocumentOffer[]{
        return []
    }

    private isTypeContract(value: string): value is TypeContract{
        return Object.values(TypeContract).includes(value as TypeContract)
    }
    
    private verifySalary(salaryMin: number, salaryMax: number){
        if(salaryMin >= salaryMax){
            throw new HttpError("Salary Min cannot be greater or equal to Salary Max", 400)
        }
    }
}