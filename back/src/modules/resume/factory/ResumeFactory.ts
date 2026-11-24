import ResumeModelFactory from "../models/factory/ResumeModelFactory.js"
import ResumeController from "../controllers/ResumeController.js"
import ResumeRouter from "../ResumeRouter.js"
import ResumeService from "../services/ResumeService.js"
import ResumeSkillFactory from "./ResumeSkillFactory.js"
import ResumeAcademicExFactory from "./ResumeAcademicExFactory.js"
import ResumeProfessionalPFactory from "./ResumeProfessionalPFactory.js"
import ResumeWorkExFactory from "./ResumeWorkExFactory.js"
import ResumePreviewService from "../services/ResumePreviewService.js"
import UserModel from "../../users/models/UserModel.js"

export default class ResumeFactory{
    static readonly create = () => {
        const resumeModel = ResumeModelFactory.create()
        const resumeService = new ResumeService(resumeModel)
        const userModel = new UserModel()
        const resumePreviewService = new ResumePreviewService(resumeModel, userModel)
        const resumeController = new ResumeController(resumeService, resumePreviewService)

        const skillController = ResumeSkillFactory.create()
        const academicController = ResumeAcademicExFactory.create()
        const professionalController = ResumeProfessionalPFactory.create()
        const workController = ResumeWorkExFactory.create()

        return new ResumeRouter(resumeController, professionalController, skillController, academicController, workController);
    }
}