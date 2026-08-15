import ProfessionalProfileResponse from "./ProfessionalProfileResponse.js"
import SkillResponse from "./SkillResponse.js"
import WorkExperienceResponse from "./WorkExperienceResponse.js"
import AcademicExperienceResponse from "./AcademicExperienceResponse.js"

export default interface ResumeResponse{
    academicExperience: AcademicExperienceResponse[]
    professionalProfile: ProfessionalProfileResponse | null
    skills: SkillResponse[]
    workExperience: WorkExperienceResponse[]
}