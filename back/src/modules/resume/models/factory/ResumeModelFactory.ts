import TransactionManager from "../../../../shared/TransactionManager.js"
import AcademicExperienceModel from "../AcademicExperienceModel.js"
import ProfessionalProfileModel from "../ProfessionalProfileModel.js"
import ResumeOrchestrator from "../ResumeOrchestrator.js"
import SkillsModel from "../SkillsModel.js"
import WorkExperienceModel from "../WorkExperienceModel.js"

export default class ResumeOrquesterFactory{
    static readonly create = () => {
        const tm = new TransactionManager()
        const academicModel = new AcademicExperienceModel()
        const professionalModel = new ProfessionalProfileModel()
        const skillsModel = new SkillsModel()
        const workExModel = new WorkExperienceModel()
        return new ResumeOrchestrator(academicModel, professionalModel, skillsModel, workExModel, tm);
    }
}