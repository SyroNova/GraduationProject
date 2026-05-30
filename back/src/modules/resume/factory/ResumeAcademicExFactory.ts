import TransactionManager from "../../../shared/TransactionManager.js"
import ResumeAcademicExController from "../controllers/ResumeAcademicExController.js"
import ResumeOrquesterFactory from "../models/factory/ResumeModelFactory.js"
import ResumeAcademicExService from "../services/ResumeAcademicExService.js"

export default class ResumeAcademicExFactory{
    static readonly create = () => {
        const resumeOrchestrator = ResumeOrquesterFactory.create()
        const tm = new TransactionManager()
        const academicService = new ResumeAcademicExService(resumeOrchestrator, tm)
        return new ResumeAcademicExController(academicService)
    }
}