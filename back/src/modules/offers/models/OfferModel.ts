import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../../config/Database.js";
import { Offer } from "../types/Offer.js";
import { OfferDB } from "../types/OfferDB.js";
import { Pool, PoolConnection } from "mysql2/promise";
import HttpError from "../../../shared/HttpError.js";


export default class OfferModel{
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
            if(error.code === "ER_CHECK_CONSTRAINT_VIOLATED"){
                throw new HttpError("SalaryMin cannot be greater or equal than SalaryMax", 400)
            }
            throw error;
        }
    }

    public async get(offset: number, limit: number, idUser: number){

        const query = `
            SELECT 
                o.*,
                c.name companyName, 
                c.location companyLocation,
                ufo.idUser IS NOT NULL isFavorite
            FROM offers o
            INNER JOIN company c ON o.idCompany = c.idCompany
            LEFT JOIN user_fav_offers ufo ON ufo.idOffer = o.idOffer 
            AND ufo.idUser = ?
            ORDER BY o.createdAt DESC
            LIMIT ${limit} OFFSET ${offset}
        `

        const [result] = await this.db.execute<OfferDB[]>(query, [idUser])

        const total = await this.getTotal()

        return { result, total }
    }

    public async getById(id: number){

        const query = `
            SELECT
                o.*,
                c.name companyName, 
                c.location companyLocation,
                c.idCompany
            FROM offers o
            INNER JOIN company c ON o.idCompany = c.idCompany
            WHERE o.idOffer = ?
        `

        const [result] = await this.db.execute<OfferDB[]>(query, [id])

        return result[0] ?? null
    }

    public async update(setClause: string, values: string[]){
        const query = `
            UPDATE offers
            SET ${setClause}
            WHERE idOffer = ?
        `

        const [result] = await this.db.execute<ResultSetHeader>(query, values);

        return result;
    }

    private async getTotal(){
        const queryTotal = `
            SELECT COUNT(*) as total
            FROM offers
        `

        const [result] = await this.db.execute<RowDataPacket[]>(queryTotal)

        const total = result[0].total as number

        return total;
    }
}