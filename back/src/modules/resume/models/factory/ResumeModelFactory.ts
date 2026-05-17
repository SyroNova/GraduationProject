import AcademicExperienceModel from "../AcademicExperienceModel.js"
import AttachmentsModel from "../AttachmentsModel.js"
import ProfessionalProfileModel from "../ProfessionalProfileModel.js"
import ResumeModel from "../ResumeModel.js"
import SkillsModel from "../SkillsModel.js"
import WorkExperienceModel from "../WorkExperienceModel.js"

export default class ResumeModelFactory{
    static readonly create = () => {
        const academicModel = new AcademicExperienceModel()
        const professionalModel = new ProfessionalProfileModel()
        const skillsModel = new SkillsModel()
        const workExModel = new WorkExperienceModel()
        const attachModel = new AttachmentsModel()
        return new ResumeModel(academicModel, professionalModel, skillsModel, workExModel, attachModel);
    }
}