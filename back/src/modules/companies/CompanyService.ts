import HttpError from "../../shared/HttpError.js";
import RoleDB from "../../shared/RoleDB.js";
import RegisterCompanyDTO from "./dto/RegisterCompanyDTO.js";
import CompanyModel from "./model/CompanyModel.js";
import bcrypt from "bcrypt";

export default class CompanyService{
    constructor(private readonly companyModel: CompanyModel){}

    public async register(data: RegisterCompanyDTO){
        const hashedPassword = await this.hashPassword(data.password)

        const result = await this.companyModel.register({
            ...data,
            password: hashedPassword
        })

        if(result.affectedRows === 0){
            throw new HttpError("Error creating company", 400)
        }

        const id = result.insertId 

        const company = await this.companyModel.getById(id)

        if(!company){
            throw new HttpError("Company created but not found", 404)
        }

        const roleDb = await this.getRole(data.role)

        company.role = roleDb

        const {passwordHash, ...safeCompany} = company 

        return {
            message: "Company created succesfully",
            result: safeCompany
        }
    }

    public async getCompany(idCompany: number){
        const result = await this.companyModel.getById(idCompany)

        if(!result){
            throw new HttpError("The company was not found", 404)
        }

        const {passwordHash, ...safeCompany} = result

        return {
            message: "Company retrieved successfully",
            company: safeCompany
        }
    }

    public async getByNit(nit: string){
        const result = await this.companyModel.getByNit(nit)

        if(!result){
            throw new HttpError("This company was not found", 404)
        }

        const {passwordHash, ...safeCompany} = result

        return {
            message: "Company retrieved succesfully",
            company: safeCompany
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    private async getRole(role: number){
        const roleName: RoleDB = await this.companyModel.getRole(role)

        if(!roleName){
            throw new HttpError('Role not found', 400)
        }

        return roleName
    }
}