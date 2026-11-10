import { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
import pool from "../../../config/Database.js";
import SetImageDTO from "../dto/SetImageDTO.js";
import ImageDB from "../types/ImageDB.js";

export default class UserProfileImage{
    constructor(
        private readonly db: Pool | PoolConnection = pool
    ) {}

    public async setImage(data: SetImageDTO){
        const query = `
            INSERT INTO user_profile_images (idUser, imageData, mimeType)
            VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE 
                imageData = VALUES(imageData),
                mimeType = VALUES(mimeType)
        `

        const values = [
            data.idUser,
            data.image.imageData,
            data.image.mimeType
        ]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async getImage(idUser: number){
        const query = `
            SELECT *
            FROM user_profile_images
            WHERE idUser = ?
        `

        const [result] = await this.db.execute<ImageDB[]>(query, [idUser])
        
        return result[0] ?? null
    }
}