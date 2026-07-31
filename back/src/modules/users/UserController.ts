import { NextFunction, Request, Response } from "express";
import UserService from "./UserService.js";
import UpdateUserDTO from "./dto/UpdateUserDTO.js";
import HttpError from "../../shared/HttpError.js";
import AuditConnection from "../../shared/AuditConnection.js";
import { AuthRequest } from "../../middlewares/AuthMiddleware.js";
import AuditContextConstructor from "../../shared/AuditContextConstructor.js";

export default class UserController {

    constructor(private readonly userService: UserService) {}

    public async register(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { document, documentType, name, phone, password, rol } = req.body;

            const auditContext = AuditContextConstructor.get(req)

            const response = await this.userService.register({
                document,
                documentType,
                name,
                phone,
                password,
                rol
            }, auditContext);

            res.status(201)
                .cookie("refreshToken", response.refreshToken, {httpOnly: true, secure: true, sameSite: true})
                .json({ 
                    accessToken: response.accessToken, 
                    role: response.role, 
                    idUser: response.idUser, 
                    idResume: response.idResume 
                });
        } catch (error) {
            next(error);
        }
    }

    public async getByDocument(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const document = req.params.document as string
    
            const result = await this.userService.getByDocument(document)
    
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async getById(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const idUser = Number(req.params.idUser)

            if(Number.isNaN(idUser)){
                throw new HttpError("Invalid idUser", 400)
            }
    
            const result = await this.userService.getById(idUser)
    
            return res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async changePassword(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const conn = await AuditConnection.get(req)
        try {
            const { document, password, newPassword } = req.body;

            const response = await this.userService.changePassword({ document, password, newPassword }, conn);

            res.status(200).json({ message: response })
        } catch (error) {
            next(error);
        } finally{
            conn.release()
        }
    }

    public async update(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const data: UpdateUserDTO = req.body

            const id = Number(req.params.id)

            if(Number.isNaN(id)){
                throw new HttpError("Id invalido", 400)
            }

            const auditContext = AuditContextConstructor.get(req)

            const response = await this.userService.update(
                id, 
                data,
                auditContext
            )

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    public async addFavoriteOffer(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const idUser = req.user?.id ?? 5

            const idOffer = Number(req.params.idOffer)

            if(Number.isNaN(idOffer)){
                throw new HttpError("Invalid idOffer", 400)
            }

            if(!idUser){
                throw new HttpError("Invalid user", 400)
            }

            const response = await this.userService.addFavoriteOffer(idUser, idOffer)

            res.status(200).json(response)
        } catch (error: any) {
            next(error)
        }
    }

    public async getFavorites(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const idUser = req.user?.id ?? 5
            const page = Number(req.query.page)
            const limit = Number(req.query.limit)
    
            if(Number.isNaN(page) || page === 0){
                throw new HttpError("Page invalid", 400)
            }
    
            if(Number.isNaN(limit)){
                throw new HttpError("Limit invalid", 400)
            }
    
            const response = await this.userService.getFavorites(page, limit, idUser);
    
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
    

    public async deleteFavoriteOffer(
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ){
        try {
            const idUser = req.user?.id ?? 5

            const idOffer = Number(req.params.idOffer)

            if(Number.isNaN(idOffer)){
                throw new HttpError("Invalid idOffer", 400)
            }

            if(!idUser){
                throw new HttpError("Invalid user", 400)
            }

            const response = await this.userService.deleteFavoriteOffer(idUser, idOffer)

            res.status(200).json(response)
        } catch (error: any) {
            next(error)
        }
    }
}