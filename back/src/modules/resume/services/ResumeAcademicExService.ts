import HttpError from "../../../shared/HttpError.js"
import TransactionManager from "../../../shared/TransactionManager.js"
import AcademicExperienceDTO from "../dto/create/AcademicExperienceDTO.js"
import UpdateAcademicExDTO from "../dto/update/UpdateAcademicExDTO.js"
import AcademicExperienceModel from "../models/AcademicExperienceModel.js"
import ResumeOrchestrator from "../models/ResumeOrchestrator.js"

export default class ResumeAcademicExService{
    constructor(
        private readonly resumeOrchestator: ResumeOrchestrator,
        private readonly transactionManager: TransactionManager
    ){}

    public async addAcademicExperience(idResume: number, data: AcademicExperienceDTO){
        const result = await this.resumeOrchestator.addAcademicExperienceToResume(idResume, data)

        if(result.affectedRows === 0){
            throw new HttpError("Error adding academic experience to resume", 500)
        }

        const academicExAdded = await this.resumeOrchestator.getAcademicExperienceFromResume(result.insertId)

        return { message: "Academic experience added to resume successfully", academicExperience: academicExAdded }
    }

    public async getAcademicExperience(idAcademicEx: number){
        const academicEx = await this.resumeOrchestator.getAcademicExperienceFromResume(idAcademicEx)

        if(!academicEx){
            throw new HttpError("Academic experience not found", 404)
        }

        return academicEx
    }

    public async deleteAcademicExperience(idAcademicEx: number){
        const result = await this.resumeOrchestator.deleteAcademicExperienceFromResume(idAcademicEx)

        if(result.affectedRows === 0){
            throw new HttpError("Error deleting academic experience from resume", 500)
        }

        return { message: "Academic experience deleted from resume successfully" }
    }

    public async updateAcademicExperience(idAcademicEx: number, dataUpt: UpdateAcademicExDTO){
        const fields = Object.keys(dataUpt);
        
        const setClause = fields.map((field: string) => `${field} = ?`).join(', ')

        const values = Object.values(dataUpt);
        
        values.push(idAcademicEx)

        return this.transactionManager.execute(
            async (conn) => {
                const academicEx = new AcademicExperienceModel(conn)

                const result = await academicEx.update(setClause, values)

                if(result.affectedRows === 0){
                    throw new HttpError("Error updating academic experience from resume", 500)
                }

                const academicExUpdated = await academicEx.get(idAcademicEx)

                return { message: "Academic experience updated successfully", academicExperience: academicExUpdated }
            }
        )
    }
}