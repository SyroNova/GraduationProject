export default interface CreateOfferDTO{
    idCompany: number
    title: string
    salaryMin: number
    salaryMax?: number
    description: string
    location: string
    contractType: string
    expireDate?: string
}