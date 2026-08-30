import { NextFunction, Request, Response } from "express";
import DocumentService from "./DocumentService.js";
import CreateOfferDocumentDTO from "./dto/CreateOfferDocumentDTO.js";
import CreateAttachmentDocumentDTO from "./dto/CreateResumeDocumentDTO.js";
import HttpError from "../../shared/HttpError.js";

export default class DocumentController{
    constructor(private readonly documentService: DocumentService){}

    public async createOfferDocument(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const { idOffer } = req.body
            const files = req.files as Express.Multer.File[]
            
            const data: CreateOfferDocumentDTO = {
                idOffer,
                documents: files.map(file => ({
                    file: file.buffer,
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    fileSize: file.size
                }))
            }
            
            const result = await this.documentService.createOfferDocument(data)

            res.status(200).json({ message: "Documents created succesfully", documents: result })
        } catch (error) {
            next(error)
        }
    }

    public async createResumeDocument(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const { idResume } = req.body
            const files = req.files as Express.Multer.File[]

            const data: CreateAttachmentDocumentDTO = {
                idResume: idResume,
                documents: files.map(file => ({
                    file: file.buffer,
                    fileName: file.originalname,
                    mimeType: file.mimetype,
                    fileSize: file.size
                }))
            }

            const result = await this.documentService.createResumeDocument(data)

            res.status(200).json({ message: "Documents created succesfully", documents: result })
        } catch (error) {
            next(error)
        }
    }

    public async getDocument(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const idDoc = Number(req.params.id)

            if(Number.isNaN(idDoc)){
                throw new HttpError("IdDocument not valid", 400)
            }

            const doc = await this.documentService.getDocument(idDoc)

            res.setHeader(
                "Content-Type",
                doc.mimeType
            )

            res.setHeader(
                "Content-Disposition",
                `inline; filename="${doc.fileName}"`
            )

            res.status(200).send(doc.file)
        } catch (error) {
            next(error)
        }
    }

    public async getOfferDocument(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const idOffer = Number(req.params.id)

            if(Number.isNaN(idOffer)){
                throw new HttpError("IdOffer not valid", 400)
            }

            const result = await this.documentService.getOfferDocument(idOffer)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async getResumeDocument(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const idResume = Number(req.params.id)

            if(Number.isNaN(idResume)){
                throw new HttpError("IdAttachment not valid", 400)
            }

            const result = await this.documentService.getResumeDocument(idResume)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    public async deleteDocumentResume(
        req: Request,
        res: Response,
        next: NextFunction
    ){
        try {
            const idDocument = Number(req.params.idDocument)

            if(Number.isNaN(idDocument)){
                throw new HttpError("idDocument not valid", 400)
            }

            const result = await this.documentService.deleteDocumentResume(idDocument)

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
}