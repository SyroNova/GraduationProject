import { Card, Col, Row } from "react-bootstrap"
import type AcademicExperience from "../../../../types/Curriculum/AcademicExperience"
import type WorkExperience from "../../../../types/Curriculum/WorkExperience"
import { getDateClean } from "../../../../utils/dateUtils"
import { CiTrash } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";

type Props = {
    isEditing: boolean,
    onEdit?: () => void,
    onDelete?: () => void
} & (
    | {
        data: WorkExperience | null,
        type: "work"
    }
    | {
        data: AcademicExperience | null,
        type: "academic"
    }
)

export default function ExperienceCard({ data, type, isEditing, onEdit, onDelete }: Readonly<Props>){

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
            <Card>
                <Card.Body>
                    <Row className="align-items-center justify-content-between">
                        <Col className="overflow-hidden">
                            <Card.Title className="text-truncate">{data.position}</Card.Title>
                        </Col>
                        <Col sm="auto" className={isEditing ? "ms-auto" : ""}>
                            <small className="text-muted me-2">
                                {getDateClean(data.dateStart)} - {getDateClean(data.dateEnd ?? "") || "Actual"}
                            </small>
                        </Col>
                        {isEditing && (
                            <Col sm="auto">
                                <MdOutlineEdit className="me-2" size={20} onClick={onEdit} style={{color: "var(--color-text-primary)"}}/>
                                <CiTrash size={20} onClick={onDelete} style={{color: "var(--color-text-primary)"}}/>
                            </Col>
                        )}
                    </Row>
                    <Card.Subtitle>{data.company}</Card.Subtitle>
                    <Card.Text>{data.description}</Card.Text>
                </Card.Body>
            </Card>
        )
    }

    if(type === "academic"){
        return (
            <Card>
                <Card.Body>
                    <Row className="align-items-center justify-content-between">
                        <Col className="overflow-hidden">
                            <Card.Title className="text-truncate">{data.degree}</Card.Title>
                        </Col>
                        <Col sm="auto" className={isEditing ? "ms-auto" : ""}>
                            <small className="text-muted me-2">
                                {getDateClean(data.dateStart)} - {getDateClean(data.dateEnd ?? "") || "Actual"}
                            </small>
                        </Col>
                        {isEditing && (
                            <Col sm="auto">
                                <MdOutlineEdit className="me-2" size={20} onClick={onEdit} style={{color: "var(--color-text-primary)"}}/>
                                <CiTrash size={20} onClick={onDelete} style={{color: "var(--color-text-primary)"}}/>
                            </Col>
                        )}
                    </Row>
                    <Card.Subtitle>{data.institution}</Card.Subtitle>
                    <Card.Text>{data.description}</Card.Text>
                </Card.Body>
            </Card>
        )
    }
}