export interface SessionDTO{
    idUser: number;
    refreshToken: string;
    createdAt: Date;
    expiresAt: Date;
    role: string;
}