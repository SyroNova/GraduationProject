import { NextFunction, Request, Response } from "express";
import UserService from "./UserService.js";

export default class UserController {

    constructor(private readonly userService: UserService) {}

    public async register(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const { cc, typeCC, name, phone, password, rol } = req.body;

            const response = await this.userService.register({
                cc,
                typeCC,
                name,
                phone,
                password,
                rol
            });

            res.status(201).json({ id: response.id, name: response.name, cc: response.cc });
        } catch (error) {
            next(error);
        }
    }
}