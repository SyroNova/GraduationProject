import { Alert, Button, Card, Col, Row } from "react-bootstrap"
import type MetadataResponse from "../../../../types/Curriculum/Document"
import { GrDocumentText } from "react-icons/gr"
import { useState } from "react"
import DocumentCard from "../DocumentCard"
import DocumentForm from "./Forms/DocumentForm"
import axios from "../../../../api/axios"
import ConfirmDiscardModal from "../ConfirmDiscardModal"
import ConfirmDeleteModal from "../ConfirmDeleteModal"

type Props = {
    idResume: string
    documentsData: MetadataResponse[] | null
    setDocuments: React.Dispatch<React.SetStateAction<MetadataResponse[] | null>>
}

export default function DocumentSection({ idResume, documentsData, setDocuments }: Readonly<Props>){
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)
    const [showModal, setShowModal] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [hasFile, setHasFile] = useState(false)

    const handleDelete = async (idDocument: number) => {
        try {
            await axios.delete(`/document/delete/${idDocument}`)

            setDocuments(prev => {
                if(!prev) return prev

                return prev.filter(doc => doc.idDocument !== idDocument)
            })

            setSaved(true)

            setTimeout(() => {
                setSaved(false)
            }, 3000)
        } catch (error) {
            console.log(error)
            setError(true)

            setTimeout(() => {
                setError(false)
            }, 3000)
        }
    }
    
    return (
        <>
            <Card className="p-4" style={{width: "80%"}}>
                <Card.Body>
                    <Row className="mb-4 align-items-center justify-content-between" style={{color: "var(--color-text-primary)"}}>
                        <Col className="d-flex align-items-center" sm="auto">
                            <GrDocumentText size={45}/>
                            <Card.Title className="fs-4 m-0 ms-4">Archivos adjuntos</Card.Title>
                        </Col>
                        {isEditing ?
                            <Col sm="auto">
                                <Button className="btn-link bg-transparent" onClick={() => {
                                    if(hasFile){
                                        setShowModal(true)
                                        return
                                    }
                                    setIsEditing(false)
                                }}>Salir</Button>
                            </Col>
                            :
                            <Col sm="auto">
                                <Button className="btn-link bg-transparent" onClick={() => setIsEditing(true)}>Editar</Button>
                            </Col>
                        }
                    </Row>
                    <Row>
                        {documentsData && documentsData.length > 0 ? (
                            documentsData.map(document => (
                                <Col
                                    key={document.idDocument}
                                    xs={12} 
                                    md={6} 
                                    className="py-2"
                                >
                                    <DocumentCard 
                                        document={document}
                                        isEditing={isEditing}
                                        onDelete={() => {
                                            setDeleteId(document.idDocument)
                                            setShowModalDelete(true)
                                        }}
                                        isOffer={false}
                                    />
                                </Col>
                            ))
                        ) : !isEditing && (
                            <Row>
                                <p className="fw-bold fs-5">No hay archivos adjuntos...</p>
                            </Row>
                        )}
                        {isEditing && (
                            <DocumentForm 
                                idResume={idResume}
                                onSavedSuccess={() => {
                                    setHasFile(false)
                                    setSaved(true)

                                    setTimeout(() => {
                                        setSaved(false)
                                    }, 3000)
                                }}
                                onError={() => {
                                    setError(true)

                                    setTimeout(() => {
                                        setError(false)
                                    }, 3000)
                                }}
                                onDirtyChange={setHasFile}
                                setDocuments={setDocuments}
                            />
                        )}
                    </Row>
                    {saved && (
                        <Alert variant="success" className="mt-3">
                            ¡Los cambios se guardaron correctamente!
                        </Alert>
                    )}
                    {error && (
                        <Alert variant="danger" className="mt-3">
                            Hubo un error guardando los cambios
                        </Alert>
                        )}
                </Card.Body>
            </Card>
            <ConfirmDiscardModal 
                show={showModal}
                onContinue={() => {
                    setIsEditing(false)
                    setHasFile(false)
                    setShowModal(false)
                }}
                onCancel={() => setShowModal(false)}
            />
            <ConfirmDeleteModal 
                show={showModalDelete}
                onContinue={() => {
                    handleDelete(deleteId!)
                    setShowModalDelete(false)
                }}
                onCancel={() => {
                    setShowModalDelete(false)
                }}
            />
        </>
    )
}