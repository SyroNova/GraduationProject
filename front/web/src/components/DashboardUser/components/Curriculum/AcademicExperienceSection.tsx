import { Card, Row, Col } from "react-bootstrap"
import { FaGraduationCap } from "react-icons/fa"
import type AcademicExperience from "../../../../types/Curriculum/AcademicExperience"
import ExperienceCard from "./ExperienceCard"

type Props = {
    academicExperience: AcademicExperience[]
}

export default function AcademicExperienceSection({ academicExperience }: Readonly<Props>){
    return (
        <Card className="p-4" style={{width: "80%"}}>
            <Card.Body>
                <Row className="mb-4 align-items-center justify-content-between" style={{color: "var(--color-text-primary)"}}>
                    <Col className="d-flex align-items-center" sm="auto">
                        <FaGraduationCap size={45}/>
                        <Card.Title className="fs-4 m-0 ms-4">Experiencia academica</Card.Title>
                    </Col>
                </Row>
                <div className="d-flex flex-column gap-3">
                    {academicExperience.length > 0 ? (
                        academicExperience.map((experience) => (
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
    )
}