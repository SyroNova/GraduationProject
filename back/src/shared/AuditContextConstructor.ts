import { AuthRequest } from "../middlewares/AuthMiddleware.js";
import AuditContext from "./interfaces/AuditContext.js";

export default class AuditContextConstructor{

    static get(req: AuthRequest): AuditContext{
        return {
            actorId: req.user?.id,
            actorType: req.user?.role,
            ip: req.ip,
            userAgent: req.headers['user-agent']
        }
    }
}