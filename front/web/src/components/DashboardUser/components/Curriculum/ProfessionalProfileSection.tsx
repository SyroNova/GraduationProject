import { Alert, Button, Card, Col, Row } from "react-bootstrap"
import type ProfessionalProfile from "../../../../types/Curriculum/ProfessionalProfile"
import { ImUserTie } from "react-icons/im"
import type Curriculum from "../../../../types/Curriculum/Curriculum"
import ProfessionalDataForm from "./Forms/ProfessionalDataForm"
import ConfirmDiscardModal from "../ConfirmDiscardModal"
import { useState } from "react"

type Props = {
    professionalProfile: ProfessionalProfile | null,
    setCurriculum: React.Dispatch<React.SetStateAction<Curriculum | null>>
}

export default function ProfessionalProfileSection({ professionalProfile, setCurriculum }: Readonly<Props>){
    const [isEditing, setIsEditing] = useState(false)
    const [saved, setSaved] = useState(false)
    const [error, setError] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [showModal, setShowModal] = useState(false)


    return (
        <>
            <Card className="p-4" style={{width: "80%"}}>
                <Card.Body>
                    <Row className="mb-4 align-items-center justify-content-between" style={{color: "var(--color-text-primary)"}}>
                        <Col className="d-flex align-items-center" sm="auto"> 
                            <ImUserTie size={40}/>
                            <Card.Title className="fs-4 m-0 ms-4">Perfil profesional</Card.Title>
                        </Col>
                        {isEditing ?
                            <Col sm="auto">
                                <Button className="btn-link bg-transparent" onClick={() => {
                                    console.log(hasChanges)
                                    if(hasChanges){
                                        setShowModal(true)
                                        return
                                    }
                                    setIsEditing(false)
                                }}>Cancelar</Button>
                            </Col>
                            :
                            <Col sm="auto">
                                <Button className="btn-link bg-transparent" onClick={() => setIsEditing(true)}>Editar</Button>
                            </Col>
                        }
                    </Row>
                    {isEditing ?
                        <ProfessionalDataForm
                            professionalProfile={professionalProfile!}
                            setCurriculum={setCurriculum}
                            onSaveSuccess={() => {
                                setIsEditing(false)
                                setHasChanges(false)
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
                            onDirtyChange={setHasChanges}
                        />
                        :
                        <>
                            <Row>
                                <Col>
                                    <p className="fw-bold">Titulo profesional</p>
                                    <p>{professionalProfile?.title ?? "No has añadido nada aun..."}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="fw-bold">Resumen profesional</p>
                                    <p>{professionalProfile?.resume ?? "No has añadido nada aun..."}</p>
                                </Col>
                            </Row>
                        </>
                    }
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
                onCancel={() => setShowModal(false)}
                onContinue={() => {
                    setShowModal(false)
                    setIsEditing(false)
                    setHasChanges(false)
                }}
            />
        </>
    )
}