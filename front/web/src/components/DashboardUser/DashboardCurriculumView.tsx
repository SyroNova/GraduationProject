import { useEffect, useState } from "react"
import type Curriculum from "../../types/Curriculum/Curriculum"
import axios from "../../api/axios"
import UseAuth from "../../hooks/UseAuth"
import { Alert, Button, Card, Col, Row, Spinner } from "react-bootstrap"
import type User from "../../types/User"
import { GrDocumentText } from "react-icons/gr";
//import { FaRegEdit } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import WorkExperienceSection from "./components/Curriculum/WorkExperienceSection"
import AcademicExperienceSection from "./components/Curriculum/AcademicExperienceSection"
import SkillSection from "./components/Curriculum/SkillSection"
import ProfessionalProfileSection from "./components/Curriculum/ProfessionalProfileSection"
import PersonalDataSection from "./components/Curriculum/PersonalDataSection"

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
                    <Button className="btn-light border-black me-4 d-flex align-items-center">
                        <FiDownload className="me-2" />
                        Exportar PDF
                    </Button>
                </div>
            </div>
            <hr className="mt-0"/>
            <div className="d-flex flex-column align-items-center mt-5 gap-5 mb-5">
                {/**Section for the personal data */}
                <PersonalDataSection personalData={personalData} setPersonalData={setPersonalData}/>
                {/**Section for the professional profile */}
                <ProfessionalProfileSection professionalProfile={curriculum.professionalProfile} setCurriculum={setCurriculum}/>
                {/**Section for the work experience */}
                <WorkExperienceSection workExperience={curriculum.workExperience}/>
                {/**Section for the academic experience */}
                <AcademicExperienceSection academicExperience={curriculum.academicExperience} />
                {/**Card for the skills info */}
                <SkillSection skills={curriculum.skills} />
                {/**Section for the documents */}
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