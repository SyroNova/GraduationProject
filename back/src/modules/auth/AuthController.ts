import { NextFunction, Request, Response } from "express";
import AuthService from "./AuthService.js";

export default class AuthController{
    constructor(private readonly authService: AuthService){}

    public async login(
        req: Request, 
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try {
            const { cc, password } = req.body;

            const response = await this.authService.login({cc, password});
            
            res.status(200).cookie("refreshToken", response.refreshToken, { httpOnly: true, secure: true, sameSite: true }).json({ accessToken: response.accessToken, role: response.role});
        } catch (error) {
            next(error);
        }
    }

    public async refresh(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void>{
        try {
            const { refreshToken } = req.cookies;

            const response = await this.authService.refreshToken({ refreshToken });

            res.status(200).json({ accessToken: response.accessToken });
        } catch (error) {
            next(error);
        }

    }

    public async sendCodeRegistration(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const { phone } = req.body

            const code = await this.authService.sendCode(phone);

            res.status(200).json({ code: code })
        } catch (error) {
            next(error)
        }
        
    }

    public async verifyCodeRegistration(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const { phone, code } = req.body

            const response = await this.authService.verifyCode(phone, code)

            res.status(200).json({ message: response })
        } catch (error) {
            next(error)
        }
    }

    public async changePassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { cc, newPassword } = req.body;

            const response = await this.authService.changePassword({ cc, newPassword });

            res.status(200).json({ message: response })
        } catch (error) {
            next(error);
        }
    }
}