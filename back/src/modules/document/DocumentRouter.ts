import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import DocumentController from "./DocumentController.js";
import { validateFiles, validateRequestBody, validateRequestParams } from "../../middlewares/ValidateMiddleware.js";
import { upload } from "../../middlewares/MulterMIddleware.js";

export default class DocumentRouter implements InterfaceRouter{
    router: Router
    path: string

    constructor(private readonly documentController: DocumentController){
        this.router = Router();
        this.path = '/document'
        this.routes()
    }

    private routes(){
        this.router.post(
            '/create/offer',
            upload.array('files'),
            validateRequestBody(['idOffer']),
            validateFiles(),
            this.documentController.createOfferDocument.bind(this.documentController)
        )

        this.router.post(
            '/create/resume',
            upload.array('files'),
            validateRequestBody(['idResume']),
            validateFiles(),
            this.documentController.createResumeDocument.bind(this.documentController)
        )

        this.router.get(
            '/get/:id',
            validateRequestParams(['id']),
            this.documentController.getDocument.bind(this.documentController)
        )

        this.router.get(
            '/get/offer/:id',
            validateRequestParams(['id']),
            this.documentController.getOfferDocument.bind(this.documentController)
        )

        this.router.get(
            '/get/resume/:id',
            validateRequestParams(['id']),
            this.documentController.getResumeDocument.bind(this.documentController)
        )

        this.router.delete(
            '/delete/:idDocument',
            validateRequestParams(['idDocument']),
            this.documentController.deleteDocumentResume.bind(this.documentController)
        )
    }
}