import DocumentDTO from "./DocumentDTO.js"

export default interface CreateOfferDocumentDTO{
    idOffer: number
    documents: DocumentDTO[]
}