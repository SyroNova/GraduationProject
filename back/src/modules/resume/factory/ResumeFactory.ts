import ResumeModelFactory from "../models/factory/ResumeModelFactory.js"
import ResumeController from "../ResumeController.js"
import ResumeRouter from "../ResumeRouter.js"
import ResumeService from "../ResumeService.js"

export default class ResumeFactory{
    static readonly create = () => {
        const resumeModel = ResumeModelFactory.create()
        const resumeService = new ResumeService(resumeModel)
        const resumeController = new ResumeController(resumeService)
        return new ResumeRouter(resumeController);
    }
}