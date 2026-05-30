import HttpError from "../../../shared/HttpError.js";
import TransactionManager from "../../../shared/TransactionManager.js";
import SkillsDTO from "../dto/create/SkillsDTO.js";
import UpdateSkillDTO from "../dto/update/UpdateSkillDTO.js";
import ResumeOrchestrator from "../models/ResumeOrchestrator.js";
import SkillsModel from "../models/SkillsModel.js";

export default class ResumeSkillService{
    constructor(
        private readonly resumeOrchestator: ResumeOrchestrator,
        private readonly transactionManager: TransactionManager
    ) {}
    
    public async addSkill(idResume: number, data: SkillsDTO){
        const idSkill = await this.resumeOrchestator.addSkillToResume(idResume, data)
    
        const skillAdded = await this.resumeOrchestator.getSkillFromResume(idSkill)
    
        return { message: "Skill added to resume successfully", skill: skillAdded }
    }
    
    public async getSkill(idSkill: number){
        const skill = await this.resumeOrchestator.getSkillFromResume(idSkill)

        if(!skill){
            throw new HttpError("Skill not found", 404)
        }

        return skill
    }

    public async deleteSkill(idSkill: number){
        const result = await this.resumeOrchestator.deleteSkillFromResume(idSkill)

        if(result.affectedRows === 0){
            throw new HttpError("Error deleting skill from resume", 500)
        }

        return { message: "Skill deleted from resume successfully" }
    }

    public async updateSkill(idSkill: number, dataUpt: UpdateSkillDTO){
        const fields = Object.keys(dataUpt);
        
        const setClause = fields.map((field: string) => `${field} = ?`).join(', ')

        const values = Object.values(dataUpt);
        
        values.push(dataUpt)

        return this.transactionManager.execute(
            async (conn) => {
                const skill = new SkillsModel(conn)

                const result = await skill.update(setClause, values)

                if(result.affectedRows === 0){
                    throw new HttpError("Error updating skill from resume", 500)
                }

                const skillUpdated = await skill.get(idSkill)

                return { message: "Skill updated successfully", skill: skillUpdated }
            }
        )

    }
}