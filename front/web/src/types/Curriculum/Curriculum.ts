import type AcademicExperience from "./AcademicExperience"
import type ProfessionalProfile from "./ProfessionalProfile"
import type Skill from "./Skill"
import type WorkExperience from "./WorkExperience"

export default interface Curriculum{
    academicExperience: AcademicExperience[]
    professionalProfile: ProfessionalProfile | null
    skills: Skill[]
    workExperience: WorkExperience[]
}