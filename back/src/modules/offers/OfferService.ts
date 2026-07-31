import { PoolConnection } from "mysql2/promise";
import HttpError from "../../shared/HttpError.js";
import CreateOfferDTO from "./dto/CreateOfferDTO.js"
import ResponseGetDTO from "./dto/ResponseGetDTO.js";
import UpdateOfferDTO from "./dto/UpdateOfferDTO.js";
import OfferModel from "./models/OfferModel.js";
import { TypeContract } from "./types/TypeContract.js";
import TransactionManager from "../../shared/TransactionManager.js";
import AuditContext  from "../../shared/interfaces/AuditContext.js";
import { OfferDTO } from "./dto/OfferDTO.js";
import { OfferDB } from "./types/OfferDB.js";

export default class OfferService{
    constructor(
        private readonly offerModel: OfferModel,
        private readonly transactionManager: TransactionManager
    ){}

    public async create(offerDTO: CreateOfferDTO, auditContext: AuditContext){
        return this.transactionManager.execute(
            async (conn) => {
                if(!this.isTypeContract(offerDTO.contractType)){
                    throw new HttpError("Contract type is not valid", 400)
                }
                if(offerDTO.salaryMax){
                    this.verifySalary(offerDTO.salaryMin, offerDTO.salaryMax)
                }

                const { offerModel } = this.getOfferModel(conn)
                const response = await offerModel.create({
                    idCompany: offerDTO.idCompany,
                    title: offerDTO.title,
                    description: offerDTO.description,
                    location: offerDTO.location,
                    salaryMin: offerDTO.salaryMin,
                    contractType: offerDTO.contractType,
                    expireDate: offerDTO.expireDate ? this.convertDate(offerDTO.expireDate) : undefined,
                    salaryMax: offerDTO.salaryMax ?? undefined
                })

                if(response.affectedRows === 0){
                    throw new HttpError("Error creating offer", 500)
                }

                const offer = await this.getOfferById(response.insertId, offerModel);

                return {message: "Offer created succesfully", offer: offer}
            },
            auditContext
        )
    }

    public async get(page: number, limit: number, idUser: number){
        const offset = (page - 1) * limit

        const response = await this.offerModel.get(offset, limit, idUser);

        const totalPages = Math.ceil(response.total / limit)

        const resultMapped: OfferDTO[] = response.result.map((offer: OfferDB) => {
            return {
                idOffer: offer.idOffer,
                company: {
                    idCompany: offer.idCompany,
                    companyName: offer.companyName,
                    companyLocation: offer.companyLocation
                },
                title: offer.title,
                salaryMin: offer.salaryMin,
                salaryMax: offer.salaryMax,
                description: offer.description,
                location: offer.location,
                contractType: offer.contractType,
                expireDate: offer.expireDate,
                createdAt: offer.createdAt,
                isFavorite: !!offer.isFavorite
            }
        })

        const responseDTO: ResponseGetDTO = {
            page: page,
            limit: limit,
            total: response.total,
            totalPages: totalPages,
            data: resultMapped
        }

        return responseDTO
    }

    public async getOfferById(id: number, newModel?: OfferModel){
        const db = newModel ?? this.offerModel
        const result = await db.getById(id);

        if(!result){
            throw new Error("Error getting offer")
        }

        const resultMapped: OfferDTO = {
            idOffer: result.idOffer,
            company: {
                idCompany: result.idCompany,
                companyName: result.companyName,
                companyLocation: result.companyLocation
            },
            title: result.title,
            salaryMin: result.salaryMin,
            salaryMax: result.salaryMax,
            description: result.description,
            location: result.location,
            contractType: result.contractType,
            expireDate: result.expireDate,
            createdAt: result.createdAt,
            isFavorite: !!result.isFavorite

        }

        return resultMapped;
    }

    public async update(updateDTO: UpdateOfferDTO, idOffer: number, auditContext: AuditContext){
        if(updateDTO.salaryMax && updateDTO.salaryMin){
            this.verifySalary(updateDTO.salaryMin, updateDTO.salaryMax)
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

        return this.transactionManager.execute(
            async (conn) => {
                const { offerModel } = this.getOfferModel(conn)

                const response = await offerModel.update(setClause, values)

                if(response.affectedRows === 0){
                    throw new HttpError("Error updating offer", 500)
                }

                const offer = await offerModel.getById(idOffer)

                return { message: "Updated offer succesfully", offer: offer } 
            },
            auditContext
        )

        

    }

    private convertDate(stringDate: string): Date{
        return new Date(stringDate)
    }

    private isTypeContract(value: string): value is TypeContract{
        return Object.values(TypeContract).includes(value as TypeContract)
    }
    
    private verifySalary(salaryMin: number, salaryMax: number){
        if(salaryMin >= salaryMax){
            throw new HttpError("Salary Min cannot be greater or equal to Salary Max", 400)
        }
    }

    private getOfferModel(
        conn: PoolConnection
    ){
        return {
            offerModel: new OfferModel(conn)
        }
    }
}