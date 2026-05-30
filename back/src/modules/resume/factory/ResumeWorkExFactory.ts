import TransactionManager from "../../../shared/TransactionManager.js"
import ResumeWorkExController from "../controllers/ResumeWorkExController.js"
import ResumeOrquesterFactory from "../models/factory/ResumeModelFactory.js"
import ResumeWorkExService from "../services/ResumeWorkExService.js"

export default class ResumeWorkExFactory{
    static readonly create = () => {
        const resumeOrchestrator = ResumeOrquesterFactory.create()
        const tm = new TransactionManager()
        const workExService = new ResumeWorkExService(resumeOrchestrator, tm)
        return new ResumeWorkExController(workExService)
    }
}