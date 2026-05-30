import TransactionManager from "../../../shared/TransactionManager.js";
import OfferModel from "../models/OfferModel.js";
import OfferController from "../OfferController.js";
import OfferRouter from "../OfferRouter.js";
import OfferService from "../OfferService.js";

export default class OfferFactory{
    static create(){
        const tm = new TransactionManager()
        const offerModel = new OfferModel()
        const offerService = new OfferService(offerModel, tm)
        const offerController = new OfferController(offerService)
        const offerRouter = new OfferRouter(offerController)
        return offerRouter
    }
}