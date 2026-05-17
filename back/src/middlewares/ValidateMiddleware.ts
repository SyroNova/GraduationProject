import { Request, Response, NextFunction } from "express";

export const validateRequest = (
    requiredFields: string[]
) => (req: Request, res: Response, next: NextFunction) => {
    for (const field of requiredFields) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
            return res.status(400).json({ error: `${field} is required` });
        }
    }
    next();
};


export const validateRequestParams = (
    requiredParams: string[]
) => (req: Request, res: Response, next: NextFunction) => {
    for(const param of requiredParams){
        if(req.params[param] === undefined || req.params[param] === null || req.params[param] === ""){
            return res.status(400).json({ error: `${param} is required`})
        }
    }
    next()
}

export const validateRequestQuery = (
    requiredQuery: string[]
) => (req: Request, res: Response, next: NextFunction) => {
    for(const query of requiredQuery){
        if(req.query[query] === undefined || req.query[query] === null || req.query[query] === ""){
            return res.status(400).json({ error: `${query} is required`})
        }
    }
    next()
}