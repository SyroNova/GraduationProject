export default interface WorkExperience {
    idWorkExperience?: number
    position: string;
    dateStart: string;
    dateEnd?: string | null;
    company: string;
    description?: string | null;
}
