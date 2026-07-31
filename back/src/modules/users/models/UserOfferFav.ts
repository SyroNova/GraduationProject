import { Pool, PoolConnection, ResultSetHeader, RowDataPacket } from "mysql2/promise";
import pool from "../../../config/Database.js";
import HttpError from "../../../shared/HttpError.js";
import { OfferDB } from "../../offers/types/OfferDB.js";

export default class UserOfferFav{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async addFavorite(idUser: number, idOffer: number){
        try {
            const query = `
                INSERT INTO user_fav_offers (idUser, idOffer)
                VALUES (?, ?)
            `

            const values = [idUser, idOffer]

            const [result] = await this.db.execute<ResultSetHeader>(query, values)

            return result
        } catch (error: any) {
            if(error.code === "ER_DUP_ENTRY"){
                throw new HttpError("Offer is already in favorites", 409)
            }
            if(error.code === "ER_NO_REFERENCED_ROW_2"){
                throw new HttpError("Offer not found", 404)
            }
            throw error;
        }
        
    }

    public async get(offset: number, limit: number, idUser: number){
    
            const query = `
                SELECT o.*
                FROM user_fav_offers uo
                INNER JOIN offers o ON o.idOffer = uo.idOffer
                INNER JOIN user u ON u.idUser = uo.idUser
                WHERE uo.idUser = ?
                LIMIT ${limit} OFFSET ${offset}
            `
    
            const [result] = await this.db.execute<OfferDB[]>(query, [idUser])
    
            const total = await this.getTotal(idUser)
    
            return { result, total }
        }

    public async deleteFavorite(idUser: number, idOffer: number){
        const query = `
            DELETE FROM user_fav_offers
            WHERE idUser = ? AND idOffer = ?
        `

        const values = [idUser, idOffer]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    private async getTotal(idUser: number){
        const queryTotal = `
            SELECT COUNT(*) as total
            FROM user_fav_offers uo
            INNER JOIN offers o ON o.idOffer = uo.idOffer
            INNER JOIN user u ON u.idUser = uo.idUser
            WHERE uo.idUser = ?
        `

        const [result] = await this.db.execute<RowDataPacket[]>(queryTotal, [idUser])

        const total = result[0].total as number

        return total;
    }
}