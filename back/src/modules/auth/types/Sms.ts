import { RowDataPacket } from "mysql2"

export interface Sms extends RowDataPacket{
    idSms: number
    phone: string
    code: string
    expiresAt: Date
    attempts: number
    createdAt: Date
}