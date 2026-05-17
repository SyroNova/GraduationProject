import { RegisterUserDTO } from "./dto/RegisterUserDTO.js";
import UserModel from "./models/UserModel.js";
import bcrypt from "bcrypt";
import { ChangePasswordProfileDTO } from "./dto/ChangePasswordProfileDTO.js";
import UserDB from "./types/UserDB.js";
import { TypeCC } from "./types/TypeCC.js";
import HttpError from "../../shared/HttpError.js";
import ResumeModel from "../resume/models/ResumeModel.js";

export default class UserService{

    constructor(
        private readonly userModel: UserModel
    ) {}

    public async register(userData: RegisterUserDTO) {
        if(!this.isTypeCC(userData.typeCC)){
            throw new HttpError("TypeCC is not a correct type", 400)
        }
        const hashedPassword = await this.hashPassword(userData.password);

        const result = await this.userModel.create({
            ...userData,
            password: hashedPassword
        });

        if(result.affectedRows === 0){
            throw new Error("Error creating user")
        }

        const id = result.insertId

        const user: UserDB = await this.userModel.findById(id);

        if(!user){
            throw new Error("User created but not found")
        }

        return user;
    }

    public async getByCC(cc: string){
        const response = await this.userModel.findByCC(cc)

        if(!response) {
            throw new HttpError("User not found", 400)
        }

        const {passwordHash, ...safeUser} = response

        return safeUser
    }

    public async changePassword(changePasswordDTO: ChangePasswordProfileDTO){
        const user = await this.userModel.findByCC(changePasswordDTO.cc);
    
        if(!user){
            throw new Error("User not found");
        }
    
        const isMatch = await this.verifyPassword(changePasswordDTO.password, user.passwordHash);
    
        if(!isMatch){
            throw new Error("Invalid password")
        }
    
        const result = await this.userModel.updatePassword(user.CC.toString(), changePasswordDTO.newPassword);
    
        if(!result){
            throw new Error("Server error")
        }
    
        return result;
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
}