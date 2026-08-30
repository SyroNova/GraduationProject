import { Alert, Button, Card, Col, Row } from "react-bootstrap";
import { LuUser } from "react-icons/lu";
import type User from "../../../../types/User";
import { useState } from "react";
import PersonalDataForm from "./Forms/PersonalDataForm";
import ConfirmDiscardModal from "../ConfirmDiscardModal";

type Props = {
    personalData: User | null,
    setPersonalData: React.Dispatch<React.SetStateAction<User | null>>
}

export default function PersonalDataSection({ personalData, setPersonalData }: Readonly<Props>){
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
                        <Col className="d-flex align-items-center" sm="auto" >
                            <LuUser size={40} />
                            <Card.Title className="fs-4 m-0 ms-4">Datos personales</Card.Title>
                        </Col>
                        {isEditing ?
                            <Col sm="auto">
                                <Button className="btn-link bg-transparent" onClick={() => {
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
                        <PersonalDataForm 
                            personalData={personalData!}
                            setPersonalData={setPersonalData}
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
                                    <p className="text-muted mb-1">Nombre completo</p>
                                    <p>{personalData?.name}</p>
                                </Col>
                                <Col>
                                    <p className="text-muted mb-1">Documento</p>
                                    <p>{personalData?.documentType}{" "}{personalData?.document}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="text-muted mb-1">Email</p>
                                    <p>{personalData?.email ?? "Aun no lo has agregado"}</p>
                                </Col>
                                <Col>
                                    <p className="text-muted mb-1">Teléfono</p>
                                    <p>{personalData?.phone}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <p className="text-muted mb-1">Fecha de nacimiento</p>
                                    <p>{personalData?.birthDate?.split("T")[0] ?? "Aun no la has agregado"}</p>
                                </Col>
                                <Col>
                                    <p className="text-muted mb-1">Ciudad</p>
                                    <p>{personalData?.actualCity ?? "Aun no la has agregado"}</p>
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

