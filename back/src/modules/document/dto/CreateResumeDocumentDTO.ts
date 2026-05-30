import DocumentDTO from "./DocumentDTO.js"

export default interface CreateAttachmentDocumentDTO{
    idResume: number
    documents: DocumentDTO[]
}