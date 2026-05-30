import AcademicExperienceDTO from "./AcademicExperienceDTO.js";
import ProfessionalProfileDTO from "./ProfessionalProfileDTO.js";
import SkillsDTO from "./SkillsDTO.js";
import WorkExperienceDTO from "./WorkExperienceDTO.js";

export default interface ResumeDTO{
    professionalProfile: ProfessionalProfileDTO
    workExperience: WorkExperienceDTO
    academicExperience: AcademicExperienceDTO
    skills: SkillsDTO[]
}