import { RegisterUserDTO } from "./dto/RegisterUserDTO.js";
import UserModel from "./models/UserModel.js";
import bcrypt from "bcrypt";
import { ChangePasswordProfileDTO } from "./dto/ChangePasswordProfileDTO.js";
import UserDB from "./types/UserDB.js";
import { DocumentType } from "./types/DocumentType.js";
import HttpError from "../../shared/HttpError.js";
import RoleDB from "./types/RoleDB.js";
import UpdateUserDTO from "./dto/UpdateUserDTO.js";
import ResumeModel from "../resume/models/ResumeModel.js";
import { PoolConnection } from "mysql2/promise";
import TransactionManager from "../../shared/TransactionManager.js";
import AuditContext from "../../shared/interfaces/AuditContext.js";
import TokenService from "../../shared/TokenService.js";
import UserOfferFav from "./models/UserOfferFav.js";
import { OfferDB } from "../offers/types/OfferDB.js";
import { OfferDTO } from "../offers/dto/OfferDTO.js";
import ResponseGetDTO from "../offers/dto/ResponseGetDTO.js";
import SessionModel from "../auth/model/SessionModel.js";

export default class UserService{

    constructor(
        private readonly userModel: UserModel,
        private readonly favoriteModel: UserOfferFav,
        private readonly transactionManager: TransactionManager,
        private readonly tokenService: TokenService
    ) {}

    public async register(userData: RegisterUserDTO, auditContext: AuditContext) {
        return this.transactionManager.execute(
            async (conn) => {
                const { userModel, resumeModel, tokenService } = this.getAuditModel(conn)
                if(!this.IsDocumentType(userData.documentType)){
                    throw new HttpError("TypeCC is not a correct type", 400)
                }
                const hashedPassword = await this.hashPassword(userData.password);

                const result = await userModel.create({
                    ...userData,
                    password: hashedPassword
                });

                if(result.affectedRows === 0){
                    throw new Error("Error creating user")
                }

                const id = result.insertId

                const user: UserDB = await userModel.findById(id);

                if(!user){
                    throw new Error("User created but not found")
                }

                const resume = await resumeModel.create(user.idUser)

                if(resume.affectedRows === 0){
                    throw new HttpError("Resume table could not be created", 500)
                }

                const roleDb = await this.getRole(userData.role, userModel)

                user.role = roleDb

                const accessToken = tokenService.generateAccessToken({ id: user.idUser, role: user.role.name });

                const refreshToken = tokenService.generateRefreshToken();

                const expiresAt = new Date()
                expiresAt.setDate(expiresAt.getDate() + 7);

                await tokenService.saveRefreshToken({ idUser: user.idUser, refreshToken: refreshToken, createdAt: new Date(), expiresAt: expiresAt, role: user.role.name })

                return { accessToken, refreshToken, idResume: resume.insertId, idUser: user.idUser, role: user.role.name };
            },
            auditContext
        )
    }

    public async getByDocument(document: string){
        const response = await this.userModel.findByDocument(document)

        if(!response) {
            throw new HttpError("User not found", 400)
        }

        const {passwordHash, ...safeUser} = response

        return safeUser
    }

    public async getById(idUser: number){
        const response = await this.userModel.findById(idUser)

        if(!response){
            throw new HttpError("User not found", 400)
        }

        const {passwordHash, ...safeUser} = response

        return safeUser
    }

    public async changePassword(changePasswordDTO: ChangePasswordProfileDTO, conn: PoolConnection){
        const { userModel } = this.getAuditModel(conn)
        const user = await this.userModel.findByDocument(changePasswordDTO.document);
    
        if(!user){
            throw new Error("User not found");
        }
    
        const isMatch = await this.verifyPassword(changePasswordDTO.password, user.passwordHash);
    
        if(!isMatch){
            throw new Error("Invalid password")
        }
    
        const result = await userModel.updatePassword(user.document.toString(), changePasswordDTO.newPassword);
    
        if(!result){
            throw new Error("Server error")
        }
    
        return result;
    }

    public async update(idUser: number, data: UpdateUserDTO, auditContext: AuditContext){
        const fields = Object.keys(data);
        
        const setClause = fields.map((field: string) => `${field} = ?`).join(', ')

        const values = Object.values(data);
        
        values.push(idUser)

        return this.transactionManager.execute(
            async (conn) => {
                const { userModel } = this.getAuditModel(conn)
                const response = await userModel.update(setClause, values)

                if(response.affectedRows === 0){
                    throw new HttpError("Error updating user", 500)
                }

                const user = await userModel.findById(idUser)

                return { message: "Updated user succesfully", user: user }
            },
            auditContext
        )
    }

    public async addFavoriteOffer(idUser: number, idOffer: number){
        const response = await this.favoriteModel.addFavorite(idUser, idOffer)

        if(response.affectedRows === 0){
            throw new HttpError("Error inserting favorite offer", 500)
        }

        return { message: "Favorite added successfully"}
    }

    public async deleteFavoriteOffer(idUser: number, idOffer: number){
        const response = await this.favoriteModel.deleteFavorite(idUser, idOffer)

        if(response.affectedRows === 0){
            throw new HttpError("Favorite not found", 404)
        }

        return { message: "Favorite removed successfully"}
    }

    public async getFavorites(page: number, limit: number, idUser: number) {
        const offset = (page - 1) * limit

        const response = await this.favoriteModel.get(offset, limit, idUser);

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
                isFavorite: true
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

    private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const validPassword = await bcrypt.compare(password, hashedPassword);
        return validPassword;
    }

    private async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    private IsDocumentType(value: string): value is DocumentType{
        return Object.values(DocumentType).includes(value as DocumentType)
    }

    private async getRole(role: number, model?: UserModel){
        const db = model || this.userModel
        const roleName: RoleDB = await db.getRole(role)

        if(!roleName){
            throw new HttpError('Role not found', 400)
        }

        return roleName
    }

    private getAuditModel(conn: PoolConnection){
        const sessionModel = new SessionModel(conn)
        return {
            userModel: new UserModel(conn),
            resumeModel: new ResumeModel(conn),
            tokenService: new TokenService(sessionModel)
        }
    }
}