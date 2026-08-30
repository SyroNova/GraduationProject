import TransactionManager from "../../../shared/TransactionManager.js"
import DocumentController from "../DocumentController.js"
import DocumentRouter from "../DocumentRouter.js"
import DocumentService from "../DocumentService.js"
import DocumentModel from "../model/DocumentModel.js"
import DocumentOfferModel from "../model/DocumentOfferModel.js"
import DocumentResumeModel from "../model/DocumentResumeModel.js"

export default class DocumentFactory{
    public static readonly create = () => {
        const documentModel = new DocumentModel()
        const docOfferModel = new DocumentOfferModel()
        const docResumeModel = new DocumentResumeModel()
        const transactionManager = new TransactionManager()
        const documentService = new DocumentService(documentModel, docOfferModel, docResumeModel, transactionManager)
        const documentController = new DocumentController(documentService)
        return new DocumentRouter(documentController)
    }
}