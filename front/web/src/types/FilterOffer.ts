import type { TypeContract } from "./Offer";

export default interface FilterOffer {
    search?: string;
    location?: string;
    contractType?: TypeContract[] | string;
    salaryMin?: number;
    salaryMax?: number;
    skills?: string[] | string;
}

export type FilterType = "location" | "contractType" | "salary" | "skills"
