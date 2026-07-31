import EscoController from "../EscoController.js";
import EscoRouter from "../EscoRouter.js";
import EscoService from "../EscoService.js";
import EscoOccupationModel from "../model/EscoOccupationModel.js";
import EscoSkillModel from "../model/EscoSkillModel.js";

export default class EscoFactory{
    static create(){
        const skillModel = new EscoSkillModel()
        const occupationModel = new EscoOccupationModel()
        const escoService = new EscoService(skillModel, occupationModel)
        const escoController = new EscoController(escoService)
        return new EscoRouter(escoController)
    }
}