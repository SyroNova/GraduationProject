import { Card, Row, Col, Alert, Button, Spinner } from "react-bootstrap"
import { FaGraduationCap } from "react-icons/fa"
import type AcademicExperience from "../../../../types/Curriculum/AcademicExperience"
import ExperienceCard from "./ExperienceCard"
import { useState } from "react"
import axios from "../../../../api/axios"
import ConfirmDeleteModal from "../ConfirmDeleteModal"
import ConfirmDiscardModal from "../ConfirmDiscardModal"
import AcademicExperienceForm from "./Forms/AcademicExperienceForm"
import type Curriculum from "../../../../types/Curriculum/Curriculum"

type Props = {
    idResume: string
    academicExperience: AcademicExperience[]
    setCurriculum: React.Dispatch<React.SetStateAction<Curriculum | null>>
}

export default function AcademicExperienceSection({ idResume, academicExperience, setCurriculum }: Readonly<Props>){
    const [editingId, setEditingId] = useState<number | null>(null)
    const [isAdding, setIsAdding] = useState(academicExperience.length === 0)
    const [isEditing, setIsEditing] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [saved, setSaved] = useState(false)
    const [errorString, setErrorString] = useState("")
    const [loading, setLoading] = useState(false)
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    const handleDelete = async (idExperience: number) => {
        try {
            setLoading(true)

            await axios.delete(`/resume/delete/${idExperience}/academicEx`)

            setCurriculum(prev => {
                if(!prev) return prev

                return {
                    ...prev,
                    academicExperience: prev.academicExperience.filter(experience => experience.idAcademicExperience !== idExperience)
                }
            })

            setSaved(true)

            setTimeout(() => {
                setSaved(false)
            }, 3000)
        } catch (error) {
            console.log(error)
            setErrorString("Hubo un error borrando la experiencia")

            setTimeout(() => {
                setErrorString("")
            }, 3000)
        } finally{
            setLoading(false)
        }
    }

    return (
        <>
            {loading ? 
                <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
                    :
                <Card className="p-4" style={{width: "80%"}}>
                    <Card.Body>
                        <Row className="mb-4 align-items-center justify-content-between" style={{color: "var(--color-text-primary)"}}>
                            <Col className="d-flex align-items-center" sm="auto">
                                <FaGraduationCap size={45}/>
                                <Card.Title className="fs-4 m-0 ms-4">Experiencia academica</Card.Title>
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
                                        setIsAdding(academicExperience.length === 0)
                                        setEditingId(null)
                                    }}>Salir</Button>
                                </Col>
                                :
                                <Col sm="auto">
                                    <Button className="btn-link bg-transparent" onClick={() => setIsEditing(true)}>Editar</Button>
                                </Col>
                            }
                        </Row>
                        <div className="d-flex flex-column gap-3">
                            {academicExperience.length > 0 ? (
                                academicExperience.map((experience) => 
                                    editingId === experience.idAcademicExperience ? (
                                        <AcademicExperienceForm 
                                            key={experience.idAcademicExperience}
                                            data={experience}
                                            idResume={idResume}
                                            onCancel={() => {
                                                if(hasChanges){
                                                    setShowModal(true)
                                                    return
                                                }
                                                setEditingId(null)
                                            }}
                                            onSaveSuccess={() => {
                                                setHasChanges(false)
                                                setEditingId(null)
                                                setSaved(true)

                                                setTimeout(() => {
                                                    setSaved(false)
                                                }, 3000)
                                            }}
                                            onError={() => {
                                                setErrorString("Hubo un error guardando los datos")

                                                setTimeout(() => {
                                                    setErrorString("")
                                                }, 3000)
                                            }}
                                            setCurriculum={setCurriculum}
                                            onDirtyChange={setHasChanges}
                                        />
                                    ) : (
                                        <ExperienceCard 
                                            key={experience.idAcademicExperience}
                                            data={experience}
                                            onEdit={() => setEditingId(experience.idAcademicExperience!)}
                                            type="academic"
                                            isEditing={isEditing}
                                            onDelete={() => {
                                                setDeleteId(experience.idAcademicExperience!)
                                                setShowModalDelete(true)
                                            }}
                                        />
                                    )
                                )
                            ) : !isEditing && (
                                <ExperienceCard
                                    data={null}
                                    type="academic"
                                    isEditing={false}
                                />
                            )}
                            {isAdding && isEditing && (
                                <AcademicExperienceForm 
                                    data={null}
                                    idResume={idResume}
                                    onSaveSuccess={() => {
                                        setHasChanges(false)
                                        setIsAdding(false)
                                        setSaved(true)

                                        setTimeout(() => {
                                            setSaved(false)
                                        }, 3000)
                                    }}
                                    onError={() => {
                                        setErrorString("Error al guardar la experiencia academica")

                                        setTimeout(() => {
                                            setErrorString("")
                                        }, 3000)
                                    }}
                                    setCurriculum={setCurriculum}
                                    onDirtyChange={setHasChanges}
                                />
                            )}
                        </div>
                        {isEditing && (
                            <div className="text-center">
                                <Button className="btn-link bg-transparent" onClick={() => setIsAdding(true)} hidden={isAdding || editingId !== null}>Agregar experiencia</Button>
                            </div>
                        )}
                    </Card.Body>
                    {saved && (
                        <Alert variant="success" className="mt-3">
                            ¡Los cambios se guardaron correctamente!
                        </Alert>
                    )}
                    {errorString !== "" && (
                        <Alert variant="danger" className="mt-3">
                            {errorString}
                        </Alert>
                    )}
                </Card>
            }
            <ConfirmDiscardModal 
                show={showModal} 
                onCancel={() => setShowModal(false)}
                onContinue={() => {
                    if(editingId !== null){
                        setEditingId(null)
                        setShowModal(false)
                        return
                    }
                    setShowModal(false)
                    setIsEditing(false)
                    setHasChanges(false)
                    setEditingId(null)
                }}
            />
            <ConfirmDeleteModal 
                show={showModalDelete}
                onCancel={() => setShowModalDelete(false)}
                onContinue={() => {
                    handleDelete(deleteId!)
                    setShowModalDelete(false)
                }}
            />
        </>
    )
}