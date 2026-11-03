import { RowDataPacket } from "mysql2";
import { NotificationType } from "./NotificationType.js";
import { RecipientType } from "./RecipientType.js";
import { ReferenceType } from "./ReferenceType.js";

export default interface NotificationDB extends RowDataPacket{
    idNotification: number
    recipientId: number
    recipientType: RecipientType
    type: NotificationType
    referenceId: number
    referenceType: ReferenceType
    message: string
}