import { Alert, Button, Card, Col, Row, Spinner } from "react-bootstrap"
import type WorkExperience from "../../../../types/Curriculum/WorkExperience"
import ExperienceCard from "./ExperienceCard"
import { ImBriefcase } from "react-icons/im"
import { useEffect, useState } from "react"
import ConfirmDiscardModal from "../ConfirmDiscardModal"
import type Curriculum from "../../../../types/Curriculum/Curriculum"
import type { OccupationEsco } from "../../../../types/Curriculum/Esco"
import axios from "../../../../api/axios"
import WorkExperienceForm from "./Forms/WorkExperienceForm"
import ConfirmDeleteModal from "../ConfirmDeleteModal"

type Props = {
    idResume: string
    workExperience: WorkExperience[]
    setCurriculum: React.Dispatch<React.SetStateAction<Curriculum | null>>
}

export default function WorkExperienceSection({ idResume, workExperience, setCurriculum }: Readonly<Props>){
    const [editingId, setEditingId] = useState<number | null>(null)
    const [isAdding, setIsAdding] = useState(workExperience.length === 0)
    const [isEditing, setIsEditing] = useState(false)
    const [hasChanges, setHasChanges] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [saved, setSaved] = useState(false)
    const [errorString, setErrorString] = useState("")
    const [loading, setLoading] = useState(false)
    const [occupations, setOccupations] = useState<OccupationEsco[]>([])
    const [showModalDelete, setShowModalDelete] = useState(false)
    const [deleteId, setDeleteId] = useState<number | null>(null)

    useEffect(() => {
        const fetchOccupations = async () => {
            try {
                setLoading(true)

                const response = await axios.get<OccupationEsco[]>('/esco/occupations')

                setOccupations(response.data)
            } catch (error) {
                console.log(error)
                setErrorString("Hubo un error cargando los datos")

                setTimeout(() => {
                    setErrorString("")
                }, 3000)
            } finally{
                setLoading(false)
            }
        }

        fetchOccupations()
    }, [])

    const handleDelete = async (idExperience: number) => {
        try {
            await axios.delete(`/resume/delete/${idExperience}/workEx`)

            setCurriculum(prev => {
                if(!prev) return prev

                return {
                    ...prev,
                    workExperience: prev.workExperience.filter(experience => experience.idWorkExperience !== idExperience)
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
                                <ImBriefcase size={45}/>
                                <Card.Title className="fs-4 m-0 ms-4">Experiencia laboral</Card.Title>
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
                                        setIsAdding(workExperience.length === 0)
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
                            {workExperience.length > 0 ? (
                                workExperience.map((experience) => 
                                    editingId === experience.idWorkExperience ? (
                                        <WorkExperienceForm 
                                            key={experience.idWorkExperience}
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
                                                setEditingId(null)
                                                setHasChanges(false)
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
                                            escoData={occupations}
                                            setCurriculum={setCurriculum}
                                            onDirtyChange={setHasChanges}
                                        />
                                    ) : (
                                        <ExperienceCard 
                                            key={experience.idWorkExperience}
                                            data={experience}
                                            onEdit={() => setEditingId(experience.idWorkExperience!)}
                                            type="work"
                                            isEditing={isEditing}
                                            onDelete={() => {
                                                setDeleteId(experience.idWorkExperience!)
                                                setShowModalDelete(true)
                                            }}
                                        />
                                    )
                                )
                            ) : !isEditing && (
                                <ExperienceCard
                                    data={null}
                                    type="work"
                                    isEditing={false}
                                />
                            )}
                            {isAdding && isEditing && (
                                <WorkExperienceForm 
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
                                        setErrorString("Error al guardar la experiencia laboral")

                                        setTimeout(() => {
                                            setErrorString("")
                                        }, 3000)
                                    }}
                                    setCurriculum={setCurriculum}
                                    escoData={occupations}
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