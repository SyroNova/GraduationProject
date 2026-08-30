import { Alert, Button, Card, Col, Row, Spinner } from "react-bootstrap"
import type Skill from "../../../../types/Curriculum/Skill"
import { GiRibbonMedal } from "react-icons/gi"
import ConfirmDiscardModal from "../ConfirmDiscardModal"
import { useEffect, useState } from "react"
import type { SkillEsco } from "../../../../types/Curriculum/Esco"
import axios from "../../../../api/axios"
import SkillForm from "./Forms/SkillForm"
import SkillPill from "./SkillPill"
import type Curriculum from "../../../../types/Curriculum/Curriculum"
import ConfirmDeleteModal from "../ConfirmDeleteModal"

type Props = {
    idResume: string
    skills: Skill[]
    setCurriculum: React.Dispatch<React.SetStateAction<Curriculum | null>>
}

export default function SkillSection({ idResume, skills, setCurriculum }: Readonly<Props>){
    const [isEditing, setIsEditing] = useState(false)
    const [editingId, setEditingId] = useState<string | null>(null)
    const [deleteId, setDeleteId] = useState<string | null>(null)
    const [isAdding, setIsAdding] = useState(skills.length === 0)
    const [saved, setSaved] = useState(false)
    const [loading, setLoading] = useState(false)
    const [errorString, setErrorString] = useState("")
    const [hasChanges, setHasChanges] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [skillsEsco, setSkillsEsco] = useState<SkillEsco[]>([])
    const [showModalDelete, setShowModalDelete] = useState(false)


    useEffect(() => {
        const fetchSkills = async () => {
            try {
                setLoading(true)
                setErrorString("")

                const response = await axios.get<SkillEsco[]>('/esco/skills')

                setSkillsEsco(response.data)
            } catch (error) {
                console.log(error)
                setErrorString("Error loading skills")
            } finally{
                setLoading(false)
            }
        }

        fetchSkills()
    }, [])

    const handleDelete = async (idSkill: string) => {
        try {
            await axios.delete(`/resume/delete/${idResume}/skill/${idSkill}`)

            setCurriculum(prev => {
                if(!prev) return prev

                return {
                    ...prev,
                    skills: prev.skills.filter(skill => skill.idSkill !== idSkill)
                }
            })

            setSaved(true)

            setTimeout(() => {
                setSaved(false)
            }, 3000)
        } catch (error) {
            console.log(error)
            setErrorString("Hubo un error borrando la habilidad")

            setTimeout(() => {
                setErrorString("")
            }, 3000)
        }
    }

    return (
        <>
            { loading ? 
                <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                    <span className="visually-hidden">Loading...</span>
                </Spinner> 
                :
                <Card className="p-4" style={{width: "80%"}}>
                    <Card.Body>
                        <Row className="mb-4 align-items-center justify-content-between" style={{color: "var(--color-text-primary)"}}>
                            <Col className="d-flex align-items-center" sm="auto">
                                <GiRibbonMedal size={45}/>
                                <Card.Title className="fs-4 m-0 ms-4">Habilidades</Card.Title>
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
                                        setEditingId(null)
                                        setIsAdding(skills.length === 0)
                                    }}>Salir</Button>
                                </Col>
                                :
                                <Col sm="auto">
                                    <Button className="btn-link bg-transparent" onClick={() => setIsEditing(true)}>Editar</Button>
                                </Col>
                            }
                        </Row>
                        <Row className="mb-3">
                            {skills.length > 0 ? (
                                    skills.map((skill) => 
                                        editingId === skill.idSkill ? (
                                            <SkillForm 
                                                key={skill.idSkill}
                                                data={skill}
                                                idResume={idResume}
                                                escoSkills={skillsEsco}
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
                                                onCancel={() => {
                                                    if(hasChanges){
                                                        setShowModal(true)
                                                        return
                                                    }
                                                    setEditingId(null)
                                                }}
                                                setCurriculum={setCurriculum}
                                                onDirtyChange={setHasChanges}
                                            />
                                        ) : (
                                            <SkillPill
                                                key={skill.idSkill}
                                                data={skill}
                                                isEditing={isEditing}
                                                onEdit={() => setEditingId(skill.idSkill!)}
                                                onDelete={() => {
                                                    setDeleteId(skill.idSkill!)
                                                    setShowModalDelete(true)
                                                }}
                                            />
                                        )
                                    )
                                ) :
                                <p className="fw-bold fs-5">No has añadido nada aun...</p>
                            }
                            {isAdding && isEditing && (
                                <SkillForm 
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
                                        setErrorString("Error al guardar la habilidad")

                                        setTimeout(() => {
                                            setErrorString("")
                                        }, 3000)
                                    }}
                                    setCurriculum={setCurriculum}
                                    escoSkills={skillsEsco}
                                    onDirtyChange={setHasChanges}
                                />
                            )}
                        </Row>
                        {isEditing && (
                            <div className="text-center">
                                <Button className="btn-link bg-transparent" onClick={() => setIsAdding(true)} hidden={isAdding || editingId !== null}>Agregar experiencia</Button>
                            </div>
                        )}
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
                    </Card.Body>
                </Card>
            }
            <ConfirmDiscardModal 
                show={showModal} 
                onCancel={() => setShowModal(false)}
                onContinue={() => {
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