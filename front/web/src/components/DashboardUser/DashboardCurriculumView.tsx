import { useEffect, useState } from "react"
import type Curriculum from "../../types/Curriculum/Curriculum"
import axios from "../../api/axios"
import UseAuth from "../../hooks/UseAuth"
import { Alert, Button, Spinner } from "react-bootstrap"
import type User from "../../types/User"
import { FiDownload } from "react-icons/fi";
import WorkExperienceSection from "./components/Curriculum/WorkExperienceSection"
import AcademicExperienceSection from "./components/Curriculum/AcademicExperienceSection"
import SkillSection from "./components/Curriculum/SkillSection"
import ProfessionalProfileSection from "./components/Curriculum/ProfessionalProfileSection"
import PersonalDataSection from "./components/Curriculum/PersonalDataSection"
import type MetadataResponse from "../../types/Curriculum/Document"
import DocumentSection from "./components/Curriculum/DocumentSection"

export default function DashboardCurriculumView(){
    
    const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
    const [personalData, setPersonalData] = useState<User | null>(null)
    const [documents, setDocuments] = useState<MetadataResponse[] | null>(null)
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

    const fetchDocuments = async (idResume: string | undefined) => {
        const response = await axios.get(`/document/get/resume/${idResume ?? 1}`)

        return response.data
    }

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true)
                setError("")

                const [resumeData, userData, documentsData] = await Promise.all([
                    fetchCurriculum(auth?.resumeId),
                    fetchPersonalData(auth?.id),
                    fetchDocuments(auth?.resumeId)
                ])

                setCurriculum(resumeData)
                setPersonalData(userData)
                setDocuments(documentsData)
            } catch (error) {
                console.log(error)
                setError("Error loading curriculum information")
            } finally {
                setLoading(false)
            }
        }
        

        loadData()
    }, [auth?.resumeId, auth?.id])

    if(loading){
        return (
            <Spinner className="justify-content-center align-self-center m-5" animation="border" role="status" variant="secondary">
                <span className="visually-hidden">Loading...</span>
            </Spinner> 
        )
    }

    if(!curriculum || !personalData || !documents){
        return (
            <Alert className="justify-content-center align-self-center m-5" variant="warning">
                No se pudo cargar la informacion del curriculum
            </Alert>
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
                        <FiDownload className="me-2"/>
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
                <WorkExperienceSection idResume={auth?.resumeId ?? "1"} workExperience={curriculum.workExperience} setCurriculum={setCurriculum}/>
                {/**Section for the academic experience */}
                <AcademicExperienceSection idResume={auth?.resumeId ?? "1"} academicExperience={curriculum.academicExperience} setCurriculum={setCurriculum} />
                {/**Card for the skills info */}
                <SkillSection idResume={auth?.resumeId ?? "1"} skills={curriculum.skills} setCurriculum={setCurriculum}/>
                {/**Section for the documents */}
                <DocumentSection idResume={auth?.resumeId ?? "1"} documentsData={documents.length > 0 ? documents : null} setDocuments={setDocuments}/>
            </div>
        </>
    )
}