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
            const { cc, typeCC, name, phone, password, rol } = req.body;

            const auditContext = AuditContextConstructor.get(req)

            const response = await this.userService.register({
                cc,
                typeCC,
                name,
                phone,
                password,
                rol
            }, auditContext);

            res.status(201).json({ response });
        } catch (error) {
            next(error);
        }
    }

    public async getByCC(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const cc = req.params.cc as string
    
            const result = await this.userService.getByCC(cc)
    
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
            const { cc, password, newPassword } = req.body;

            const response = await this.userService.changePassword({ cc, password, newPassword }, conn);

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
}