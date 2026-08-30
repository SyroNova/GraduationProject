export default interface AcademicExperience {
    idAcademicExperience?: number;
    degree: string;
    institution: string;
    dateStart: string;
    dateEnd?: string | null;
    description?: string | null;
}
