import path from "node:path";
import fs from "node:fs";
import Handlebars from "handlebars"
import UserModel from "../../users/models/UserModel.js";
import UserDB from "../../users/types/UserDB.js";
import ResumeResponse from "../dto/select/ResumeResponse.js";
import ResumeOrchestrator from "../models/ResumeOrchestrator.js";

export default class ResumePreviewService{
    constructor(
        private readonly resumeOrchestrator: ResumeOrchestrator,
        private readonly userModel: UserModel
    ){}

    public async getPdfResume(idResume: number, idUser: number){
        const resumeData = await this.resumeOrchestrator.getCompleteResume(idResume)

        const userData = await this.userModel.findById(idUser)

        const resume: PreviewData = this.constructData(resumeData, userData)

        const templatePath = path.join(
            process.cwd(),
            'templates',
            'ResumeTemplate.hbs'
        )

        const html = fs.readFileSync(templatePath, 'utf-8')

        const template = Handlebars.compile(html)

        return template(resume)
    }

    private constructData(resumeData: ResumeResponse, userData: UserDB){
        return {
            name: userData.name,
            profession: resumeData.professionalProfile?.title,
            email: userData.email,
            phone: userData.phone,
            city: userData.actualCity,
            summary: resumeData.professionalProfile?.resume,
            experiences: resumeData.workExperience.map((work) => {
                return {
                    position: work.position,
                    company: work.company,
                    startDate: this.formatDate(work.dateStart),
                    endDate: this.formatDate(work.dateEnd),
                    description: work.description
                }
            }),
            education: resumeData.academicExperience.map((education) => {
                return {
                    title: education.degree,
                    institution: education.institution,
                    startDate: this.formatDate(education.dateStart),
                    endDate: this.formatDate(education.dateEnd),
                    description: education.description
                }
            }),
            skills: resumeData.skills.map((skill) => {
                return {
                    name: skill.name,
                    level: skill.level
                }
            })
        }
    }

    private formatDate(date: Date | string | undefined): string {
        if(date === undefined){
            return ""
        }
        return new Intl.DateTimeFormat('es-CO', {
            timeZone: 'America/Bogota',
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(new Date(date))
    }
}

interface PreviewData{
    name: string
    profession?: string
    email?: string
    phone: string
    city?: string
    summary?: string
    experiences: {
        company: string
        position: string
        startDate: string
        endDate?: string
        description?: string
    }[]
    education: {
        institution: string
        title: string
        startDate: string
        endDate?: string
        description?: string
    }[]
    skills:{
        name: string
        level: string
    }[]
}

