export default interface AcademicExperienceResponse{
    idAcademicExperience: number
    degree: string
    institution: string
    dateStart: Date
    dateEnd?: Date
    description?: string
}