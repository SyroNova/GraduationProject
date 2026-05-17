import { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "../../../config/Database.js";
import { Offer } from "../types/Offer.js";
import { OfferDB } from "../types/OfferDB.js";


export default class OfferModel{
    public async create(offer: Offer) {
        
        const query = `
            INSERT INTO offers (Company_idCompany, title, salaryMin, salaryMax, description, location, contractType, expireDate)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            offer.Company_idCompany, 
            offer.title, 
            offer.salaryMin,
            offer.salaryMax ?? null, 
            offer.description, 
            offer.location, 
            offer.contractType, 
            offer.expireDate ?? null
        ];
        const [result] = await pool.execute<ResultSetHeader>(query, values);

        return result;
    }

    public async get(offset: number, limit: number){

        const query = `
            SELECT *
            FROM offers
            LIMIT ${limit} OFFSET ${offset}
        `

        const [result] = await pool.execute<OfferDB[]>(query)

        const total = await this.getTotal();


        return { result, total }
    }

    public async getById(id: number){

        const query = `
            SELECT
                o.*,
                c.name CompanyName, c.location CompanyLocation
            FROM offers o
            INNER JOIN company c ON o.Company_idCompany = c.idCompany
            WHERE o.Company_idCompany = ?
        `

        const [result] = await pool.execute<OfferDB[]>(query, [id])

        return result[0] ?? null
    }

    public async update(setClause: string, values: string[]){
        const query = `
            UPDATE offers
            SET ${setClause}
            WHERE idOffer = ?
        `

        const [result] = await pool.execute<ResultSetHeader>(query, values);

        return result;
    }

    private async getTotal(){
        const queryTotal = `
            SELECT COUNT(*) as total
            FROM offers
        `

        const [result] = await pool.execute<RowDataPacket[]>(queryTotal)

        const total = result[0].total as number

        return total;
    }
}