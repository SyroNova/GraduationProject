import EscoSkillModel from "./model/EscoSkillModel.js";
import EscoOccupationModel from "./model/EscoOccupationModel.js";
import HttpError from "../../shared/HttpError.js";

export default class EscoService{
    constructor(
        private readonly escoSkillModel: EscoSkillModel,
        private readonly escoOccupationModel: EscoOccupationModel
    ){}

    public async getEscoSkills(){
        const response = await this.escoSkillModel.get()

        return response
    }

    public async getEscoOccupations(){
        const response = await this.escoOccupationModel.getAll()

        return response
    }

    public async getOccupationSkills(idOccupation: string){
        const occupation = await this.escoOccupationModel.getOne(idOccupation)

        if(!occupation){
            throw new HttpError("Occupation not found", 404)
        }
        const response = await this.escoOccupationModel.getRelatedSkills(idOccupation)

        return response
    }
}