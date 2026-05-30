import HttpError from "../../../shared/HttpError.js"
import TransactionManager from "../../../shared/TransactionManager.js"
import WorkExperienceDTO from "../dto/create/WorkExperienceDTO.js"
import UpdateWorkExDTO from "../dto/update/UpdateWorkExDTO.js"
import ResumeOrchestrator from "../models/ResumeOrchestrator.js"
import WorkExperienceModel from "../models/WorkExperienceModel.js"

export default class ResumeWorkExService{
    constructor(
        private readonly resumeOrchestator: ResumeOrchestrator,
        private readonly transactionManager: TransactionManager
    ){}

    public async addWorkExperience(idResume: number, data: WorkExperienceDTO){
        const result = await this.resumeOrchestator.addWorkExperienceToResume(idResume, data)

        if(result.affectedRows === 0){
            throw new HttpError("Error adding work experience to resume", 500)
        }

        const workExAdded = await this.resumeOrchestator.getWorkExperienceFromResume(result.insertId)

        return { message: "Work experience added to resume successfully", workExperience: workExAdded }
    }

    public async getWorkExperience(idWorkEx: number){
        const workEx = await this.resumeOrchestator.getWorkExperienceFromResume(idWorkEx)

        if(!workEx){
            throw new HttpError("Work experience not found", 404)
        }

        return workEx
    }

    public async deleteWorkExperience(idWorkEx: number){
        const result = await this.resumeOrchestator.deleteWorkExperienceFromResume(idWorkEx)

        if(result.affectedRows === 0){
            throw new HttpError("Error deleting work experience from resume", 500)
        }

        return { message: "Work experience deleted from resume successfully" }
    }

    public async updateWorkExperience(idWorkEx: number, dataUpt: UpdateWorkExDTO){
        const fields = Object.keys(dataUpt);
        
        const setClause = fields.map((field: string) => `${field} = ?`).join(', ')

        const values = Object.values(dataUpt);
        
        values.push(dataUpt)

        return this.transactionManager.execute(
            async (conn) => {
                const workEx  = new WorkExperienceModel(conn)

                const result = await workEx.update(setClause, values)

                if(result.affectedRows === 0){
                    throw new HttpError("Error updating work experience from resume", 500)
                }

                const workExUpdated = await workEx.get(idWorkEx)

                return { message: "Work experience updated successfully", workExperience: workExUpdated }
            }
        )
    }
}