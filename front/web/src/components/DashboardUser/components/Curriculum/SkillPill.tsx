import { Col, Row } from "react-bootstrap";
import type Skill from "../../../../types/Curriculum/Skill";
import { CiTrash } from "react-icons/ci";
import { MdOutlineEdit } from "react-icons/md";

type Props = {
    data: Skill,
    isEditing: boolean,
    onEdit?: () => void,
    onDelete?: () => void
}

export default function SkillPill({ data, isEditing, onEdit, onDelete }: Readonly<Props>){
    return (
        <Col
            key={data.idSkill}
            className="py-1 text-primary fw-bold"  
            style={{ fontSize: "0.9rem"}}
            xs={12} 
            md={6}
        >
            <div className="justify-content-center p-1" style={{border: '1px solid black', borderRadius: '5px', width: "50%"}}>
                <Row className="justify-content-center align-items-center">
                    <Col
                        className="text-truncate"
                        title={data.name}
                        sm="auto"
                    >
                        {data.name}
                    </Col>
                    <Col xs="auto">
                        {"-"}
                    </Col>
                    <Col xs="auto">
                        {data.level}
                        {" "}
                    </Col>
                    {isEditing && (
                        <Col sm="auto">
                            <MdOutlineEdit className="me-2" size={20} onClick={onEdit} style={{color: "var(--color-text-primary)"}}/>
                            <CiTrash size={20} onClick={onDelete} style={{color: "var(--color-text-primary)"}}/>
                        </Col>
                    )}
                </Row>
            </div>
        </Col>
    )
}