import UserModel from "../users/models/UserModel.js";
import TokenService from "./TokenService.js";
import { LoginUserDTO } from "./dto/LoginUserDTO.js";
import bcrypt from "bcrypt";
import { LoginResponseDTO } from "./dto/LoginResponseDTO.js";
import { SessionDTO } from "./dto/SessionDTO.js";
import SessionModel from "./model/SessionModel.js";
import { RefreshDTO } from "./dto/RefreshDTO.js";
import { Session } from "./types/Session.js";
import SmsModel from "./model/SmsModel.js";
import { ChangePasswordDTO } from "./dto/ChangePasswordDTO.js";

export default class AuthService{

    constructor(
        private readonly tokenService: TokenService,
        private readonly userModel: UserModel,
        private readonly sessionModel: SessionModel,
        private readonly smsModel: SmsModel
    ) {}

    public async login(loginDTO: LoginUserDTO){
        const userDB = await this.userModel.findByCC(loginDTO.cc);

        if(!userDB){
            throw new Error('User not found');
        }

        const user: LoginResponseDTO = {
            idUser: userDB.idUser,
            passwordHash: userDB.passwordHash,
            role: userDB.role.name.toUpperCase()
        }

        const isMatch = await this.verifyPassword(loginDTO.password, user.passwordHash);

        if(!isMatch){
            throw new Error('Invalid credentials');
        }

        const accessToken = this.tokenService.generateAccessToken({ id: user.idUser, role: user.role });

        const refreshToken = this.tokenService.generateRefreshToken();

        const expiresAt = new Date()
        expiresAt.setDate(expiresAt.getDate() + 7);

        await this.saveRefreshToken({ idUser: user.idUser, refreshToken: refreshToken, createdAt: new Date(), expiresAt: expiresAt, role: user.role })

        return { accessToken, refreshToken, role: user.role };

    }

    public async refreshToken(refresh: RefreshDTO){
        const response: Session | null = await this.sessionModel.getByRefreshToken(refresh);

        if(!response){
            throw new Error('Refresh token expired')
        }

        const accessToken = this.tokenService.generateAccessToken({ id: response.idUser, role: response.role })

        return { accessToken };
    }

    public async sendCode(phone: string): Promise<string> {
        const code = this.generateCode();

        const result = await this.smsModel.sendCode(phone, code);

        if(result.affectedRows === 0){
            throw new Error("Error creating the sms code")
        }

        return code;
    }

    public async verifyCode(phone: string, code: string){
        const result = await this.smsModel.getSms(phone, code);

        if(!result){
            throw new Error("Invalid phone");
        }

        if(result.attempts >= 3){
            await this.smsModel.deleteSms(result.idSms)
            throw new Error("Too many attempts")
        }

        if(new Date(result.expiresAt) < new Date()){
            await this.smsModel.deleteSms(result.idSms)
            throw new Error("Code expired")
        }

        if(result.code != code){
            await this.smsModel.increaseAttempts(result.idSms)
            throw new Error("Invalid code")
        }

        await this.smsModel.deleteSms(result.idSms)

        return true;
    }

    public async changePassword(changePasswordDTO: ChangePasswordDTO){
        const user = await this.userModel.findByCC(changePasswordDTO.cc);

        if(!user){
            throw new Error("User not found");
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

    private async saveRefreshToken(session: SessionDTO){
        const response = await this.sessionModel.create(session);

        if(response.affectedRows === 0){
            throw new Error("Error creating session")
        }
    }

    private generateCode(): string{
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

}