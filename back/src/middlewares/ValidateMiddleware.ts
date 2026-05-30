import { Request, Response, NextFunction } from "express";

export const validateRequestBody = (
    requiredFields: string[]
) => (req: Request, res: Response, next: NextFunction) => {
    for (const field of requiredFields) {
        if (req.body[field] === undefined || req.body[field] === null || req.body[field] === "") {
            return res.status(400).json({ error: `${field} is required` });
        }
    }
    next();
};

export const validateRequestArrayBody = (
    arrayField: string,
    requiredFields: string[]
) => (req: Request, res: Response, next: NextFunction) => {
    const array = req.body[arrayField]

    if(!Array.isArray(array)){
        return res.status(400).json({ error: `${arrayField} must be an array` })
    }

    for(const [index, doc] of array.entries()){
        for(const field of requiredFields){
            if(doc[field] === undefined || doc[field] === null){
                return res.status(400).json({ error: `${arrayField}[${index}].${field} is required`})
            }
        }
    }
    next()
}

export const validateRequestObjectBody = (
    objectField: string,
    requiredFields: string[]
) => (req: Request, res: Response, next: NextFunction) => {
    const obj = req.body[objectField]

    if (typeof obj !== 'object' || obj === null) {
        return res.status(400).json({
            error: `${objectField} must be object`
        });
    }

    for(const field of requiredFields){
        if(obj[field] === undefined || obj[field] === null){
            return res.status(400).json({ error: `${objectField}.${field} is required`})
        }
    }
    next()
}


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

export const validateUpdateRequest = (
    allowedFields: string[]
) => (req: Request, res: Response, next: NextFunction) => {
    const updateFields = Object.keys(req.body);
    for(const field of updateFields) {
        if(!allowedFields.includes(field)) {
            return res.status(400).json({ error: `${field} is not allowed to be updated` });
        }
    }
    next();
}

export const validateFiles = () => (req: Request, res: Response, next: NextFunction) => {
    const files = req.files as Express.Multer.File[]
    if(!files || files.length === 0){
        return res.status(400).json({ error: "At least one file is required" })
    }
    next()
}