import { Pool, PoolConnection, ResultSetHeader } from "mysql2/promise";
import pool from "../../../config/Database.js";
import CreateNotificationDTO from "../dto/CreateNotificationDTO.js";
import NotificationDB from "../types/NotificationDB.js";
import CountType from "../types/CountType.js";

export default class NotificationModel{
    constructor(private readonly db: Pool | PoolConnection = pool){}

    public async createNotification(data: CreateNotificationDTO){
        const query = `
            INSERT INTO notifications (recipientId, recipientType, type, referenceId, referenceType, message)
            VALUES (?, ?, ?, ?, ?, ?)
        `

        const values = [
            data.recipientId,
            data.recipientType,
            data.type,
            data.referenceId,
            data.referenceType,
            data.message
        ]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async setReadNotification(idNoti: number, recipientId: number, recipientType: string){
        const query = `
            UPDATE notifications
            SET isRead = TRUE,
                readAt = UTC_TIMESTAMP()
            WHERE idNotification = ?
                AND recipientId = ?
                AND recipientType = ?
        `

        const values = [idNoti, recipientId, recipientType]

        const [result] = await this.db.execute<ResultSetHeader>(query, values)

        return result
    }

    public async getAll(recipientId: number){
        const query = `
            SELECT *
            FROM notifications
            WHERE recipientId = ?
            AND isRead = FALSE
        `

        const [result] = await this.db.execute<NotificationDB[]>(query, [recipientId])

        return result
    }

    public async getNotificationCount(recipientId: number){
        const query = `
            SELECT COUNT(*) AS count
            FROM notifications
            WHERE recipientId = ?
            AND isRead = FALSE
        `

        const [result] = await this.db.execute<CountType[]>(query, [recipientId])

        return result[0].count 
    }
}