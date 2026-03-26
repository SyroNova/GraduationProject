import { NextFunction, Response } from "express"
import { AuthRequest } from "./AuthMiddleware.js"

export const rolesMiddleware = (
    requiredRoles: string[]
) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        if (!requiredRoles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Insufficient permissions' });
        }

        next();
    };
}