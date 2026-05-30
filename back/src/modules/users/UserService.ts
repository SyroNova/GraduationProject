import { RegisterUserDTO } from "./dto/RegisterUserDTO.js";
import UserModel from "./models/UserModel.js";
import bcrypt from "bcrypt";
import { ChangePasswordProfileDTO } from "./dto/ChangePasswordProfileDTO.js";
import UserDB from "./types/UserDB.js";
import { TypeCC } from "./types/TypeCC.js";
import HttpError from "../../shared/HttpError.js";
import RoleDB from "./types/RoleDB.js";
import UpdateUserDTO from "./dto/UpdateUserDTO.js";
import ResumeModel from "../resume/models/ResumeModel.js";
import { PoolConnection } from "mysql2/promise";
import TransactionManager from "../../shared/TransactionManager.js";
import AuditContext from "../../shared/interfaces/AuditContext.js";

export default class UserService{

    constructor(
        private readonly userModel: UserModel,
        private readonly transactionManager: TransactionManager
    ) {}

    public async register(userData: RegisterUserDTO, auditContext: AuditContext) {
        return this.transactionManager.execute(
            async (conn) => {
                const { userModel, resumeModel } = this.getAuditModel(conn)
                if(!this.isTypeCC(userData.typeCC)){
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

                const roleDb = await this.getRole(userData.rol, userModel)

                user.role = roleDb

                return { user, idResume: resume.insertId};
            },
            auditContext
        )
    }

    public async getByCC(cc: string){
        const response = await this.userModel.findByCC(cc)

        if(!response) {
            throw new HttpError("User not found", 400)
        }

        const {passwordHash, ...safeUser} = response

        return safeUser
    }

    public async changePassword(changePasswordDTO: ChangePasswordProfileDTO, conn: PoolConnection){
        const { userModel } = this.getAuditModel(conn)
        const user = await this.userModel.findByCC(changePasswordDTO.cc);
    
        if(!user){
            throw new Error("User not found");
        }
    
        const isMatch = await this.verifyPassword(changePasswordDTO.password, user.passwordHash);
    
        if(!isMatch){
            throw new Error("Invalid password")
        }
    
        const result = await userModel.updatePassword(user.CC.toString(), changePasswordDTO.newPassword);
    
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

    private async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
        const validPassword = await bcrypt.compare(password, hashedPassword);
        return validPassword;
    }

    private async hashPassword(password: string): Promise<string> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    }

    private isTypeCC(value: string): value is TypeCC{
        return Object.values(TypeCC).includes(value as TypeCC)
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
        return {
            userModel: new UserModel(conn),
            resumeModel: new ResumeModel(conn)
        }
    }
}