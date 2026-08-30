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
        const result = await this.resumeOrchestator.addSkillToResume(idResume, data)

        if(result.affectedRows === 0){
            throw new HttpError("Error adding skill to resume", 500)
        }

        const skillAdded = await this.resumeOrchestator.getSkillFromResume(idResume, data.idSkill)
    
        return { message: "Skill added to resume successfully", skill: skillAdded }
    }
    
    public async getSkills(idResume: number){
        const skill = await this.resumeOrchestator.getSkillsFromResume(idResume)

        if(!skill){
            throw new HttpError("Skill not found", 404)
        }

        return skill
    }

    public async deleteSkill(idResume: number, idSkill: string){
        const result = await this.resumeOrchestator.deleteSkillFromResume(idResume, idSkill)

        if(result.affectedRows === 0){
            throw new HttpError("Error deleting skill from resume", 500)
        }

        return { message: "Skill deleted from resume successfully" }
    }

    public async updateSkill(idResume: number, idSkill: string, dataUpt: UpdateSkillDTO){
        const fields = Object.keys(dataUpt);
        
        const setClause = fields.map((field: string) => `${field} = ?`).join(', ')

        const values = Object.values(dataUpt);
        
        values.push(idResume, idSkill)

        return this.transactionManager.execute(
            async (conn) => {
                const skill = new SkillsModel(conn)

                const result = await skill.update(setClause, values)

                if(result.affectedRows === 0){
                    throw new HttpError("Error updating skill from resume", 500)
                }

                const skillUpdated = await skill.getOne(idResume, idSkill)

                return { message: "Skill updated successfully", skill: skillUpdated }
            }
        )

    }
}