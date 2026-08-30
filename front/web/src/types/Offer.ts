export default interface Offer{
    idOffer: number
    company: CompanyOffer
    title: string
    salaryMin: number
    salaryMax?: number
    description: string
    location: string
    contractType: TypeContract
    expireDate?: string
    createdAt: string,
    isFavorite: boolean
}

interface CompanyOffer{
    idCompany: number
    companyName: string
    companyLocation: string
}

export type TypeContract = 'TIEMPO_COMPLETO' | 'MEDIO_TIEMPO' | 'POR_HORAS' | 'TEMPORAL';