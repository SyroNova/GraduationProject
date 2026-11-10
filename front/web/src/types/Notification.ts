export default interface NotificationDB{
    idNotification: number
    referenceId: number
    referenceType: ReferenceType
    message: string
    createdAt: string
}

export type ReferenceType = 'USER' | 'COMPANY' | 'OFFER' | 'COMMENT'