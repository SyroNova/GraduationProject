import TransactionManager from "../../../shared/TransactionManager.js"
import ResumeProfesssionalPController from "../controllers/ResumeProfessionalPController.js"
import ResumeOrquesterFactory from "../models/factory/ResumeModelFactory.js"
import ResumeProfessionalPService from "../services/ResumeProfessionalPService.js"

export default class ResumeProfessionalPFactory{
    static readonly create = () => {
        const resumeOrchestrator = ResumeOrquesterFactory.create()
        const tm = new TransactionManager()
        const professionalService = new ResumeProfessionalPService(resumeOrchestrator, tm)
        return new ResumeProfesssionalPController(professionalService)
    }
}