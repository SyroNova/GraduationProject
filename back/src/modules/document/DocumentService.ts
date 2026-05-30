import HttpError from "../../shared/HttpError.js";
import TransactionManager from "../../shared/TransactionManager.js";
import CreateResumeDocumentDTO from "./dto/CreateResumeDocumentDTO.js";
import CreateOfferDocumentDTO from "./dto/CreateOfferDocumentDTO.js";
import MetadataResponseDTO from "./dto/MetadataResponseDTO.js";
import DocumentResumeModel from "./model/DocumentResumeModel.js";
import DocumentModel from "./model/DocumentModel.js";
import DocumentOfferModel from "./model/DocumentOfferModel.js";

export default class DocumentService{
    constructor(
        private readonly docModel: DocumentModel,
        private readonly docOfferModel: DocumentOfferModel,
        private readonly docResumeModel: DocumentResumeModel,
        private readonly transactionManager: TransactionManager
    ){}

    public async createOfferDocument(data: CreateOfferDocumentDTO){
        return this.transactionManager.execute(
            async (conn) => {
                const ids: number[] = []

                for(const doc of data.documents){
                    
                    const resultDoc = await this.docModel.create(doc, conn)

                    if(resultDoc.affectedRows === 0){
                        throw new HttpError("Error creating document", 500)
                    }

                    const result = await this.docOfferModel.create(data.idOffer, resultDoc.insertId, conn)

                    if(result.affectedRows === 0){
                        throw new HttpError(`Error creating relation for ${doc.fileName}`, 500)
                    }

                    ids.push(resultDoc.insertId)
                }
                return ids
            }
        )
    }

    public async createResumeDocument(data: CreateResumeDocumentDTO){
        return this.transactionManager.execute(
            async (conn) => {
                const ids: number[] = []

                for(const doc of data.documents){
                    
                    const resultDoc = await this.docModel.create(doc, conn)

                    if(resultDoc.affectedRows === 0){
                        throw new HttpError("Error creating document", 500)
                    }

                    const result = await this.docResumeModel.create(data.idResume, resultDoc.insertId, conn)

                    if(result.affectedRows === 0){
                        throw new HttpError(`Error creating relation for ${doc.fileName}`, 500)
                    }

                    ids.push(resultDoc.insertId)
                }
                return ids
            }
        )
    }

    public async getOfferDocument(idOffer: number){
        const ids = await this.docOfferModel.getDocumentsOffer(idOffer)

        if(ids.length === 0){
            throw new HttpError("No documents found for this offer", 404)
        }

        const docs: MetadataResponseDTO[] = []

        for(const id of ids){
            const result = await this.docModel.getMetadata(id.idDocument)

            if(!result){
                throw new HttpError("Document not found", 404)
            }

            docs.push(result)
        }

        return docs
    }

    public async getResumeDocument(idAttachment: number){
        const ids = await this.docResumeModel.getDocumentsResume(idAttachment)

        if(ids.length === 0){
            throw new HttpError("No documents found for this attachment", 404)
        }

        const docs: MetadataResponseDTO[] = []

        for(const id of ids){
            const result = await this.docModel.getMetadata(id.idDocument)

            if(!result){
                throw new HttpError("Document not found", 404)
            }

            docs.push(result)
        }

        return docs
    }

    public async getDocument(id: number){
        const result = await this.docModel.get(id)
        if(!result){
            throw new HttpError("Document not found", 404)
        }
        return result
    }
}