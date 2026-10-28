import HttpError from "../../shared/HttpError.js";
import CompanyModel from "./model/CompanyModel.js";

export default class CompanyService{
    constructor(private readonly companyModel: CompanyModel){}

    public async getCompany(idCompany: number){
        const result = await this.companyModel.getById(idCompany)

        if(!result){
            throw new HttpError("The company was not found", 404)
        }

        return {
            message: "Company retrieved successfully",
            company: result
        }
    }
}