import { Card, Col, Row } from "react-bootstrap"
import type Skill from "../../../../types/Curriculum/Skill"
import { GiRibbonMedal } from "react-icons/gi"

type Props = {
    skills: Skill[]
}

export default function SkillSection({ skills }: Readonly<Props>){
    return (
        <Card className="p-4" style={{width: "80%"}}>
            <Card.Body>
                <Row className="mb-4 align-items-center justify-content-between" style={{color: "var(--color-text-primary)"}}>
                    <Col className="d-flex align-items-center" sm="auto">
                        <GiRibbonMedal size={45}/>
                        <Card.Title className="fs-4 m-0 ms-4">Habilidades</Card.Title>
                    </Col>
                </Row>
                <Row>
                    {skills.length > 0 &&
                        <Row className="mb-3">
                            {skills.map((skill) => (
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
    )
}