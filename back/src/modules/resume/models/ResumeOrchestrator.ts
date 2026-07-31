import AcademicExperienceModel from "./AcademicExperienceModel.js";
import ProfessionalProfileModel from "./ProfessionalProfileModel.js";
import SkillsModel from "./SkillsModel.js";
import WorkExperienceModel from "./WorkExperienceModel.js";
import ResumeDTO from "../dto/create/ResumeDTO.js";
import TransactionManager from "../../../shared/TransactionManager.js";
import { PoolConnection } from "mysql2/promise";
import HttpError from "../../../shared/HttpError.js";
import ResumeModel from "./ResumeModel.js";
import SkillsDTO from "../dto/create/SkillsDTO.js";
import AcademicExperienceDTO from "../dto/create/AcademicExperienceDTO.js";
import ProfessionalProfileDTO from "../dto/create/ProfessionalProfileDTO.js";
import WorkExperienceDTO from "../dto/create/WorkExperienceDTO.js";

export default class ResumeOrchestrator{
    constructor(
        private readonly academicExModel: AcademicExperienceModel,
        private readonly professionalPModel: ProfessionalProfileModel,
        private readonly skillsModel: SkillsModel,
        private readonly workExModel: WorkExperienceModel,
        private readonly transactionManager: TransactionManager
    ){}

    public async createCompleteResume(idResume: number, data: ResumeDTO){
        return this.transactionManager.execute(
            async (conn) => {
                const { resume, academicExModel, professionalPModel, skillsModel, workExModel } = this.getModelsTransaction(conn)

                const resultResume = await resume.get(idResume)

                if(!resultResume){
                    throw new HttpError("Error getting resume", 500)
                }

                for(const academicEx of data.academicExperience){
                    const resultAcademic = await academicExModel.create(idResume, academicEx)

                    if(resultAcademic.affectedRows === 0){
                        throw new HttpError(`Error creating academic experience ${academicEx.institution}`, 500)
                    }
                }
                const resultProfessional = await professionalPModel.create(idResume, data.professionalProfile)

                if(resultProfessional.affectedRows === 0){
                    throw new HttpError("Error creating professional profile", 500)
                }

                for(const skill of data.skills){
                    const resultSkill = await skillsModel.create(skill, idResume)

                    if(resultSkill.affectedRows === 0){
                        throw new HttpError(`Error creating skill ${skill.idSkill}`, 500)
                    }
                }

                for(const workEx of data.workExperience){
                    const resultWork = await workExModel.create(idResume, workEx)

                    if(resultWork.affectedRows === 0){
                        throw new HttpError(`Error creating work experience for ${workEx.company}`, 500)
                    }
                }

                return { idResume, message: "Resume created successfully" }
            } 
        )
    }

    public async getCompleteResume(idResume: number){
        return this.transactionManager.execute(
            async (conn) => {
                const { academicExModel, professionalPModel, skillsModel, workExModel } = this.getModelsTransaction(conn)

                const resultAcademic = await academicExModel.getByResumeId(idResume)

                if(!resultAcademic){
                    throw new HttpError("Error getting academic experience", 500)
                }

                const resultProfessional = await professionalPModel.getByResumeId(idResume)

                if(!resultProfessional){
                    throw new HttpError("Error getting professional profile", 500)
                }

                const resultSkills = await skillsModel.getAll(idResume)

                if(!resultSkills){
                    throw new HttpError("Error getting skills", 500)
                }

                const resultWork = await workExModel.getByResumeId(idResume,)

                if(!resultWork){
                    throw new HttpError("Error getting work experience", 500)
                }

                return {
                    academicEx: resultAcademic,
                    professionalP: resultProfessional,
                    skills: resultSkills,
                    workEx: resultWork,
                }
            }
        )
    }

    public async addSkillToResume(idResume: number, data: SkillsDTO){
        return this.transactionManager.execute(
            async (conn) =>{
                const { skillsModel } = this.getModelsTransaction(conn)

                const resultSkill = await skillsModel.create(data, idResume)

                if(resultSkill.affectedRows === 0){
                    throw new HttpError("Error creating resume_skill", 500)
                }

                return "Skill added to resume successfully"
            }
        )
    }

    public async getSkillFromResume(idResume: number, idSkill: string){
        return await this.skillsModel.getOne(idResume, idSkill)
    }

    public async getSkillsFromResume(idResume: number){
        return await this.skillsModel.getAll(idResume)
    }

    public async deleteSkillFromResume(idResume: number, idSkill: string){
        return await this.skillsModel.delete(idResume, idSkill)
    }

    public async updateSkillFromResume(setClause: string, values: string[]){
        return await this.skillsModel.update(setClause, values)
    }

    public async addAcademicExperienceToResume(idResume: number, data: AcademicExperienceDTO){
        return await this.academicExModel.create(idResume, data)
    }

    public async getAcademicExperienceFromResume(idAcademicEx: number){
        return await this.academicExModel.get(idAcademicEx)
    }

    public async deleteAcademicExperienceFromResume(idAcademicEx: number){
        return await this.academicExModel.delete(idAcademicEx)
    }

    public async updateAcademicExperienceFromResume(setClause: string, values: string[]){
        return await this.academicExModel.update(setClause, values)
    }

    public async addProfessionalProfileToResume(idResume: number, data: ProfessionalProfileDTO){
        return await this.professionalPModel.create(idResume, data)
    }

    public async getProfessionalProfileFromResume(idProfessionalP: number){
        return await this.professionalPModel.get(idProfessionalP)
    }

    public async deleteProfessionalProfileFromResume(idProfessionalP: number){
        return await this.professionalPModel.delete(idProfessionalP)
    }

    public async updateProfessionalProfileFromResume(setClause: string, values: string[]){
        return await this.professionalPModel.update(setClause, values)
    }

    public async addWorkExperienceToResume(idResume: number, data: WorkExperienceDTO){
        return await this.workExModel.create(idResume, data)
    }

    public async getWorkExperienceFromResume(idWorkEx: number){
        return await this.workExModel.get(idWorkEx)
    }

    public async deleteWorkExperienceFromResume(idWorkEx: number){
        return await this.workExModel.delete(idWorkEx)
    }

    public async updateWorkExperienceFromResume(setClause: string, values: string[]){
        return await this.workExModel.update(setClause, values)
    }

    private getModelsTransaction(conn: PoolConnection){
        return {
            resume: new ResumeModel(conn),
            academicExModel: new AcademicExperienceModel(conn),
            professionalPModel: new ProfessionalProfileModel(conn),
            skillsModel: new SkillsModel(conn),
            workExModel: new WorkExperienceModel(conn)
        }
    }
}