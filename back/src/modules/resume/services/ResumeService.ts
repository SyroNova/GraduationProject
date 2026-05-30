import ResumeDTO from "../dto/create/ResumeDTO.js";
import ResumeOrchestrator from "../models/ResumeOrchestrator.js";

export default class ResumeService{
    constructor(
        private readonly resumeOrchestator: ResumeOrchestrator,
    ){}

    public async createCompleteResume(idResume: number, data: ResumeDTO){
        return await this.resumeOrchestator.createCompleteResume(idResume, data)
    }

    public async getCompleteResume(idResume: number){
        return await this.resumeOrchestator.getCompleteResume(idResume)
    }

}