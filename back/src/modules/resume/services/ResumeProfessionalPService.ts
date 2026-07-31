import HttpError from "../../../shared/HttpError.js";
import TransactionManager from "../../../shared/TransactionManager.js";
import ProfessionalProfileDTO from "../dto/create/ProfessionalProfileDTO.js";
import UpdatePorfessionalPDTO from "../dto/update/UpdateProfessionalPDTO.js";
import ProfessionalProfileModel from "../models/ProfessionalProfileModel.js";
import ResumeOrchestrator from "../models/ResumeOrchestrator.js";

export default class ResumeProfessionalPService{
    constructor(
        private readonly resumeOrchestator: ResumeOrchestrator,
        private readonly transactionManager: TransactionManager
    ){}

    public async addProfessionalProfile(idResume: number, data: ProfessionalProfileDTO){
        const result = await this.resumeOrchestator.addProfessionalProfileToResume(idResume, data)

        if(result.affectedRows === 0){
            throw new HttpError("Error adding professional profile to resume", 500)
        }

        const professionalPAdded = await this.resumeOrchestator.getProfessionalProfileFromResume(result.insertId)

        return { message: "Professional profile added to resume successfully", professionalProfile: professionalPAdded }
    }

    public async getProfessionalProfile(idProfessionalP: number){
        const professionalP = await this.resumeOrchestator.getProfessionalProfileFromResume(idProfessionalP)

        if(!professionalP){
            throw new HttpError("Professional profile not found", 404)
        }

        return professionalP
    }

    public async deleteProfessionalProfile(idProfessionalP: number){
        const result = await this.resumeOrchestator.deleteProfessionalProfileFromResume(idProfessionalP)

        if(result.affectedRows === 0){
            throw new HttpError("Error deleting professional profile from resume", 500)
        }

        return { message: "Professional profile deleted from resume successfully" }
    }

    public async updateProfessionalProfile(idProfessionalP: number, dataUpt: UpdatePorfessionalPDTO){
        const fields = Object.keys(dataUpt);
        
        const setClause = fields.map((field: string) => `${field} = ?`).join(', ')

        const values = Object.values(dataUpt);
        
        values.push(idProfessionalP)

        return this.transactionManager.execute(
            async (conn) => {
                const professionalP  = new ProfessionalProfileModel(conn)

                const result = await professionalP.update(setClause, values)

                if(result.affectedRows === 0){
                    throw new HttpError("Error updating professional profile from resume", 500)
                }

                const professionalPUpdated = await professionalP.get(idProfessionalP)

                return { message: "Professional profile updated successfully", professionalProfile: professionalPUpdated }
            }
        )
    }
}