import AcademicExperienceModel from "./AcademicExperienceModel.js";
import AttachmentsModel from "./AttachmentsModel.js";
import ProfessionalProfileModel from "./ProfessionalProfileModel.js";
import SkillsModel from "./SkillsModel.js";
import WorkExperienceModel from "./WorkExperienceModel.js";

export default class ResumeModel{
    constructor(
        private readonly academicExModel: AcademicExperienceModel,
        private readonly professionalPModel: ProfessionalProfileModel,
        private readonly skillsModel: SkillsModel,
        private readonly workExModel: WorkExperienceModel,
        private readonly attachmentsModel: AttachmentsModel
    ){}
}