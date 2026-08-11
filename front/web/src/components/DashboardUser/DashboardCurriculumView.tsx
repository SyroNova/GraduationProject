import { useEffect, useState } from "react"
import type Curriculum from "../../types/Curriculum/Curriculum"
import axios from "../../api/axios"
import UseAuth from "../../hooks/UseAuth"
import { Alert, Button, Card, Col, Row, Spinner } from "react-bootstrap"
import type User from "../../types/User"
import { LuUser } from "react-icons/lu";
import { ImUserTie, ImBriefcase } from "react-icons/im";
import { FaGraduationCap } from "react-icons/fa6";
import { GrDocumentText } from "react-icons/gr";
import { GiRibbonMedal } from "react-icons/gi";
import { FaRegEdit } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import ExperienceCard from "./components/Curriculum/ExperienceCard"

export default function DashboardCurriculumView(){
    
    const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
    const [personalData, setPersonalData] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    const { auth } = UseAuth()

    const fetchCurriculum = async (resumeId: string | undefined) => {
        const response = await axios.get(`/resume/get/${resumeId ?? 1}`) //TODO: REMEMBER TO DELETE THE VALUE WHEN AUTHENTICATION IS PERMITED
        
        return response.data
    }

    const fetchPersonalData = async (idUser: string | undefined) => {
        const response = await axios.get(`/users/get/id/${idUser ?? 5}`) // TODO: REMEMBER TO DELETE THE VALUE WHEN AUTHENTICATION IS PERMITED
        
        return response.data
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                setError("")

                const [resumeData, userData] = await Promise.all([
                    fetchCurriculum(auth?.resumeId),
                    fetchPersonalData(auth?.id)
                ])

                setCurriculum(resumeData)
                setPersonalData(userData)
            } catch (error) {
                console.log(error)
                setError("Error loading curriculum information")
            } finally {
                setLoading(false)
            }
        }
        

        loadData()
    }, [auth?.resumeId, auth?.id])

    if(loading || !curriculum){
        return (
            <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                <span className="visually-hidden">Loading...</span>
            </Spinner> 
        )
    }
    
    return(
        <>
            {error && 
                <Alert variant="warning">
                    {error}
                </Alert>
            }
            <div className="d-flex justify-content-between">
                <div className="mt-4 ms-4">
                    <h2 style={{color: "var(--color-text-primary)"}}>Mi Hoja de Vida</h2>
                    <p className="text-muted" style={{color: "var(--color-text-secondary)"}}>Gestiona tu informacion profesional</p>
                </div>
                <div className="d-flex align-items-center">
                    <Button className="me-4 d-flex align-items-center">
                        <FaRegEdit className="me-2" />
                        Editar perfil
                    </Button>

                    <Button className="btn-light border-black me-4 d-flex align-items-center">
                        <FiDownload className="me-2" />
                        Exportar PDF
                    </Button>
                </div>
            </div>
            <hr className="mt-0"/>
            <div className="d-flex flex-column align-items-center mt-5 gap-5 mb-5">
                {/**Card for the personal info */}
                <Card className="p-4" style={{width: "80%"}}>
                    <Card.Body>
                        <Row className="mb-4 align-items-center" style={{color: "var(--color-text-primary)"}}>
                            <Col className="me-2" sm={1} >
                                <LuUser size={40} />
                            </Col>
                            <Col >
                                <Card.Title className="fs-4 m-0">Datos personales</Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-muted mb-1">Nombre completo</p>
                                <p>{personalData?.name}</p>
                            </Col>
                            <Col>
                                <p className="text-muted mb-1">Documento</p>
                                <p>{personalData?.document}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-muted mb-1">Email</p>
                                <p>{personalData?.email}</p>
                            </Col>
                            <Col>
                                <p className="text-muted mb-1">Teléfono</p>
                                <p>{personalData?.phone}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="text-muted mb-1">Ciudad</p>
                                <p>{personalData?.actualCity}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {/**Card for the professional info */}
                <Card className="p-4" style={{width: "80%"}}>
                    <Card.Body>
                        <Row className="mb-4 align-items-center" style={{color: "var(--color-text-primary)"}}>
                            <Col className="me-2" sm={1}> 
                                <ImUserTie size={40}/>
                            </Col>
                            <Col>
                                <Card.Title className="fs-4 m-0">Perfil profesional</Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="fw-bold">Titulo profesional</p>
                                <p>{curriculum?.professionalProfile?.title ?? "No has añadido nada aun..."}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <p className="fw-bold">Resumen profesional</p>
                                <p>{curriculum?.professionalProfile?.resume ?? "No has añadido nada aun..."}</p>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                {/**Card for the work experience */}
                <Card className="p-4" style={{width: "80%"}}>
                    <Card.Body>
                        <Row className="mb-4 align-items-center" style={{color: "var(--color-text-primary)"}}>
                            <Col className="me-3" sm={1}>
                                <ImBriefcase size={45}/>
                            </Col>
                            <Col>
                                <Card.Title className="fs-4 m-0">Experiencia laboral</Card.Title>
                            </Col>
                        </Row>
                        <div className="d-flex flex-column gap-3">
                            {curriculum?.workExperience.length > 0 ? (
                                curriculum?.workExperience.map((experience) => (
                                    <ExperienceCard 
                                        key={experience.idWorkExperience}
                                        data={experience}
                                        type={"work"}
                                    />
                                ))
                            ) :
                                <ExperienceCard 
                                    data={null}
                                    type="work"
                                />
                            }
                        </div>
                    </Card.Body>
                </Card>
                {/**Card for the academic experience */}
                <Card className="p-4" style={{width: "80%"}}>
                    <Card.Body>
                        <Row className="mb-4 align-items-center" style={{color: "var(--color-text-primary)"}}>
                            <Col className="me-3" sm={1}>
                                <FaGraduationCap size={45}/>
                            </Col>
                            <Col>
                                <Card.Title className="fs-4 m-0">Experiencia academica</Card.Title>
                            </Col>
                        </Row>
                        <div className="d-flex flex-column gap-3">
                            {curriculum?.academicExperience.length > 0 ? (
                                curriculum?.academicExperience.map((experience) => (
                                    <ExperienceCard 
                                        key={experience.idAcademicExperience}
                                        data={experience}
                                        type={"academic"}
                                    />
                                ))
                            ) :
                                <ExperienceCard 
                                    data={null}
                                    type="work"
                                />
                            }
                        </div>
                    </Card.Body>
                </Card>
                {/**Card for the skills info */}
                <Card className="p-4" style={{width: "80%"}}>
                    <Card.Body>
                        <Row className="mb-4 align-items-center" style={{color: "var(--color-text-primary)"}}>
                            <Col className="me-3" sm={1}>
                                <GiRibbonMedal size={45}/>
                            </Col>
                            <Col>
                                <Card.Title className="fs-4 m-0">Habilidades</Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            {curriculum.skills.length > 0 &&
                                <Row className="mb-3">
                                    {curriculum.skills.map((skill) => (
                                        <Col
                                            key={skill.idSkill}
                                            className="py-1 text-primary fw-bold"  
                                            style={{ fontSize: "0.9rem"}}
                                            xs={12} 
                                            md={6}
                                        >
                                            <div className="justify-content-center p-1" style={{border: '1px solid black', borderRadius: '5px'}}>
                                                <Row>
                                                    <Col
                                                        className="text-truncate"
                                                        title={skill.name}
                                                    >
                                                        {skill.name}
                                                    </Col>
                                                    <Col xs="auto">
                                                        {"-"}
                                                    </Col>
                                                    <Col xs="auto">
                                                        {skill.level}
                                                        {" "}
                                                    </Col>
                                                </Row>
                                            </div>
                                        </Col>
                                    ))}
                                </Row>
                            }
                        </Row>
                    </Card.Body>
                </Card>
                {/**Card for the documents */}
                <Card className="p-4" style={{width: "80%"}}>
                    <Card.Body>
                        <Row className="mb-4 align-items-center" style={{color: "var(--color-text-primary)"}}>
                            <Col className="me-3" sm={1}>
                                <GrDocumentText size={45}/>
                            </Col>
                            <Col>
                                <Card.Title className="fs-4 m-0">Archivos adjuntos</Card.Title>
                            </Col>
                        </Row>
                        <Row>
                            <p className="fw-bold fs-5">No hay archivos adjuntos...</p>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}