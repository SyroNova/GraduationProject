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
            const { document, password } = req.body;

            const response = await this.authService.login({document, password});
            
            res.status(200).cookie("refreshToken", response.refreshToken, { httpOnly: true, secure: true, sameSite: true }).json({ accessToken: response.accessToken, role: response.role, idUser: response.idUser});
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

    public async sendCode(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const { document } = req.body

            const code = await this.authService.sendCode(document);

            res.status(200).json({ code: code })
        } catch (error) {
            next(error)
        }
        
    }

    public async verifyCode(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const { document, code } = req.body

            const response = await this.authService.verifyCode(document, code)

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
            const { document, newPassword } = req.body;

            const response = await this.authService.changePassword({ document, newPassword });

            res.status(200).json({ message: response })
        } catch (error) {
            next(error);
        }
    }
}