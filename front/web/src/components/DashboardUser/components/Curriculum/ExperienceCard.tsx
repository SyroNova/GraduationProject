import { Card } from "react-bootstrap"
import type AcademicExperience from "../../../../types/Curriculum/AcademicExperience"
import type WorkExperience from "../../../../types/Curriculum/WorkExperience"

type Props = {
    data: WorkExperience | AcademicExperience | null,
    type: string
}

export default function ExperienceCard({data, type}: Readonly<Props>){

    if(data === null){
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Añade experiencias a tu hoja de vida</Card.Title>
                    <Card.Text className="text-muted">No has añadido nada aun...</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    if(type === "work"){
        return (
            <></>
        )
    }

    if(type === "academic"){
        return (
            <></>
        )
    }
}