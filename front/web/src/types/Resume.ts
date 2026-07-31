export interface OccupationEsco{
    idOccupation: string,
    name: string
}

export interface WorkExperience{
    position: string
    dateStart: string
    dateEnd: string
    company: string
    description?: string
}

export interface AcademicExperience{
    degree: string
    institution: string
    dateStart: string
    dateEnd?: string
    description?: string
}

export interface SkillEsco{
    idSkill: string,
    name: string
}

export interface Skill extends SkillEsco{
    level: string
}
