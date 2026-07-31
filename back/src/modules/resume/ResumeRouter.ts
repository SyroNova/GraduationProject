import { Router } from "express";
import InterfaceRouter from "../../shared/InterfaceRouter.js";
import ResumeController from "./controllers/ResumeController.js";
import ResumeProfessionalPController from "./controllers/ResumeProfessionalPController.js";
import ResumeSkillController from "./controllers/ResumeSkillController.js";
import ResumeAcademicExController from "./controllers/ResumeAcademicExController.js";
import ResumeWorkExController from "./controllers/ResumeWorkExController.js";
import { validateRequestArrayBody, validateRequestBody, validateRequestObjectBody, validateRequestParams, validateUpdateRequest } from "../../middlewares/ValidateMiddleware.js";
import { authMiddleware } from "../../middlewares/AuthMiddleware.js";

export default class ResumeRouter implements InterfaceRouter{
    path: string;
    router: Router;

    constructor(
        private readonly resumeController: ResumeController,
        private readonly professionalPController: ResumeProfessionalPController,
        private readonly skillsController: ResumeSkillController,
        private readonly academicExController: ResumeAcademicExController,
        private readonly workExController: ResumeWorkExController,
    ) {
        this.router = Router()
        this.path = '/resume'
        this.routesResume()
        this.routesSkill()
        this.routesAcademicEx()
        this.routesProfessionalP()
        this.routesWorkEx()
    }

    private routesResume(){
        this.router.post(
            '/create/:id',
            validateRequestParams(['id']),
            //validateRequestObjectBody('professionalProfile', ['title', 'resume']),
            //validateRequestObjectBody('workExperience', ['name', 'dateStart', 'dateEnd', 'institution']),
            //validateRequestObjectBody('academicExperience', ['position', 'company', 'dateStart']),
            //validateRequestArrayBody('skills', ['name', 'level']),
            this.resumeController.createResume.bind(this.resumeController)
        )

        this.router.get(
            '/get/:id',
            validateRequestParams(['id']),
            this.resumeController.getResume.bind(this.resumeController)
        )
    }

    private routesSkill(){
        this.router.post(
            '/add/:id/skill',
            validateRequestParams(['id']),
            validateRequestBody(['idSkill', 'level']),
            this.skillsController.addSkill.bind(this.skillsController)
        )

        this.router.get(
            '/get/:id/skills',
            validateRequestParams(['id']),
            this.skillsController.getSkills.bind(this.skillsController)
        )

        this.router.patch(
            '/patch/:id/skill/:idSkill',
            validateRequestParams(['id', 'idSkill']),
            validateUpdateRequest(['level']),
            this.skillsController.updateSkill.bind(this.skillsController)
        )

        this.router.delete(
            '/delete/:id/skill/:idSkill',
            validateRequestParams(['id', 'idSkill']),
            this.skillsController.deleteSkill.bind(this.skillsController)
        )
    }

    private routesAcademicEx(){
        this.router.post(
            '/add/:id/academicEx',
            validateRequestParams(['id']),
            validateRequestBody(['degree', 'institution', 'dateStart']),
            this.academicExController.addAcademicExperience.bind(this.academicExController)
        )

        this.router.get(
            '/get/:id/academicEx',
            validateRequestParams(['id']),
            this.academicExController.getAcademicExperience.bind(this.academicExController)
        )

        this.router.patch(
            '/patch/:id/academicEx',
            validateRequestParams(['id']),
            validateUpdateRequest(['degree', 'institution', 'dateStart', 'dateEnd', 'description']),
            this.academicExController.updateAcademicExperience.bind(this.academicExController)
        )

        this.router.delete(
            '/delete/:id/academicEx',
            validateRequestParams(['id']),
            this.academicExController.deleteAcademicExperience.bind(this.academicExController)
        )
    }

    private routesWorkEx(){
        this.router.post(
            '/add/:id/workEx',
            validateRequestParams(['id']),
            validateRequestBody(['position', 'dateStart', 'dateEnd', 'company']),
            this.workExController.addWorkExperience.bind(this.workExController)
        )

        this.router.get(
            '/get/:id/workEx',
            validateRequestParams(['id']),
            this.workExController.getWorkExperience.bind(this.workExController)
        )

        this.router.patch(
            '/patch/:id/workEx',
            validateRequestParams(['id']),
            validateUpdateRequest(['position', 'dateStart', 'dateEnd', 'company', 'description']),
            this.workExController.updateWorkExperience.bind(this.workExController)
        )

        this.router.delete(
            '/delete/:id/workEx',
            validateRequestParams(['id']),
            this.workExController.deleteWorkExperience.bind(this.workExController)
        )
    }

    private routesProfessionalP(){
        this.router.post(
            '/add/:id/professionalP',
            validateRequestParams(['id']),
            validateRequestBody(['title', 'resume']),
            this.professionalPController.addProfessionalProfile.bind(this.professionalPController)
        )

        this.router.get(
            '/get/:id/professionalP',
            validateRequestParams(['id']),
            this.professionalPController.getProfessionalProfile.bind(this.professionalPController)
        )

        this.router.patch(
            '/patch/:id/professionalP',
            validateRequestParams(['id']),
            validateUpdateRequest(['title', 'resume']),
            this.professionalPController.updateProfessionalProfile.bind(this.professionalPController)
        )

        this.router.delete(
            '/delete/:id/professionalP',
            validateRequestParams(['id']),
            this.professionalPController.deleteProfessionalProfile.bind(this.professionalPController)
        )
    }
}