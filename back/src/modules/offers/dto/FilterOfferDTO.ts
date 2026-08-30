import { TypeContract } from "../types/TypeContract.js";

export default interface FilterOfferDTO {
    search?: string;
    location?: string;
    contractType?: TypeContract | TypeContract[] | string;
    salaryMin?: number;
    salaryMax?: number;
    skills?: string[] | string;
}

