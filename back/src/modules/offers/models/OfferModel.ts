import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../../config/Database.js";
import { Offer } from "../types/Offer.js";
import { OfferDB } from "../types/OfferDB.js";
import { Pool, PoolConnection } from "mysql2/promise";
import HttpError from "../../../shared/HttpError.js";
import FilterOfferDTO from "../dto/FilterOfferDTO.js";

export default class OfferModel {
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async create(offer: Offer) {
        try {
            const query = `
                INSERT INTO offers (idCompany, title, salaryMin, salaryMax, description, location, contractType, expireDate)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            `;
            const values = [
                offer.idCompany,
                offer.title,
                offer.salaryMin,
                offer.salaryMax ?? null,
                offer.description,
                offer.location,
                offer.contractType,
                offer.expireDate ?? null
            ];
            const [result] = await this.db.execute<ResultSetHeader>(query, values);

            return result;
        } catch (error: any) {
            if (error.code === "ER_CHECK_CONSTRAINT_VIOLATED") {
                throw new HttpError("SalaryMin cannot be greater or equal than SalaryMax", 400);
            }
            throw error;
        }
    }

    public async get(offset: number, limit: number, idUser: number, filters?: FilterOfferDTO) {
        const { search, location, contractType, salaryMin, salaryMax, skills } = this.getFilters(filters || {});

        const [results] = await this.db.query<[OfferDB[], RowDataPacket[]]>(
            'CALL sp_filter_offers(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [idUser, search, location, contractType, salaryMin, salaryMax, skills, limit, offset]
        );

        const result = results[0] || [];
        const total = Number(results[1]?.[0]?.total ?? 0);

        return { result, total };
    }

    public async getById(id: number) {
        const query = `
            SELECT
                o.*,
                c.name companyName,
                c.location companyLocation,
                c.idCompany,
                (ufo.idUser IS NOT NULL) AS isFavorite
            FROM offers o
            INNER JOIN company c ON o.idCompany = c.idCompany
            LEFT JOIN user_fav_offers ufo ON ufo.idOffer = o.idOffer
            WHERE o.idOffer = ?
        `;

        const [result] = await this.db.execute<OfferDB[]>(query, [id]);

        return result[0] ?? null;
    }

    public async update(setClause: string, values: string[]) {
        const query = `
            UPDATE offers
            SET ${setClause}
            WHERE idOffer = ?
        `;

        const [result] = await this.db.execute<ResultSetHeader>(query, values);

        return result;
    }

    private getFilters(filters: FilterOfferDTO) {
        const search = filters?.search?.trim() || null;
        const location = filters?.location?.trim() || null;
        const contractType = Array.isArray(filters?.contractType)
            ? filters.contractType.filter(Boolean).join(',')
            : (filters?.contractType?.trim() || null);
        const salaryMin = filters?.salaryMin !== undefined && !Number.isNaN(Number(filters.salaryMin)) ? Number(filters.salaryMin) : null;
        const salaryMax = filters?.salaryMax !== undefined && !Number.isNaN(Number(filters.salaryMax)) ? Number(filters.salaryMax) : null;
        const skills = Array.isArray(filters?.skills)
            ? filters.skills.join(',')
            : (filters?.skills?.trim() || null);

            return { search, location, contractType, salaryMin, salaryMax, skills }
    }
}