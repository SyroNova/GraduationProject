import { Card, Col, Row } from "react-bootstrap"
import type WorkExperience from "../../../../types/Curriculum/WorkExperience"
import ExperienceCard from "./ExperienceCard"
import { ImBriefcase } from "react-icons/im"

type Props = {
    workExperience: WorkExperience[]
}

export default function WorkExperienceSection({ workExperience }: Readonly<Props>){

    return (
        <Card className="p-4" style={{width: "80%"}}>
            <Card.Body>
                <Row className="mb-4 align-items-center justify-content-between" style={{color: "var(--color-text-primary)"}}>
                    <Col className="d-flex align-items-center" sm="auto">
                        <ImBriefcase size={45}/>
                        <Card.Title className="fs-4 m-0 ms-4">Experiencia laboral</Card.Title>
                    </Col>
                    <Col sm="auto">
                        editar
                    </Col>
                </Row>
                <div className="d-flex flex-column gap-3">
                    {workExperience.length > 0 ? (
                        workExperience.map((experience) => (
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
    )
}