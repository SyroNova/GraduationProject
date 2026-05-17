import OfferModel from "../models/OfferModel.js";
import OfferController from "../OfferController.js";
import OfferRouter from "../OfferRouter.js";
import OfferService from "../OfferService.js";

export default class OfferFactory{
    static create(){
        const offerModel = new OfferModel()
        const offerService = new OfferService(offerModel)
        const offerController = new OfferController(offerService)
        const offerRouter = new OfferRouter(offerController)
        return offerRouter
    }
}