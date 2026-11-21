export interface SessionDTO{
    id: number;
    refreshToken: string;
    createdAt: Date;
    expiresAt: Date;
    role: string;
}