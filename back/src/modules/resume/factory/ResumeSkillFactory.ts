import TransactionManager from "../../../shared/TransactionManager.js"
import ResumeSkillController from "../controllers/ResumeSkillController.js"
import ResumeOrquesterFactory from "../models/factory/ResumeModelFactory.js"
import ResumeSkillService from "../services/ResumeSkillService.js"

export default class ResumeSkillFactory{
    static readonly create = () => {
        const resumeOrchestrator = ResumeOrquesterFactory.create()
        const tm = new TransactionManager()
        const skillService = new ResumeSkillService(resumeOrchestrator, tm)
        return new ResumeSkillController(skillService)
    }
}