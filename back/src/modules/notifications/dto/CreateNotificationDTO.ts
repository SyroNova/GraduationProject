import { NotificationType } from "../types/NotificationType.js"
import { RecipientType } from "../types/RecipientType.js"
import { ReferenceType } from "../types/ReferenceType.js"

export default interface CreateNotificationDTO{
    recipientId: number
    recipientType: RecipientType
    type: NotificationType
    referenceId: number
    referenceType: ReferenceType
    message: string
}