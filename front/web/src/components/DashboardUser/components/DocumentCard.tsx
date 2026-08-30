import { Button, Card, Col, Row } from "react-bootstrap"
import type MetadataResponse from "../../../types/Curriculum/Document"
import { GrDocumentText } from "react-icons/gr"
import { getFileType, getSize } from "../../../utils/documentUtils"
import { CiTrash } from "react-icons/ci"

type Props = {
    document: MetadataResponse
} & (
    | {
        isOffer: true
    }
    | {
        isOffer: false
        isEditing: boolean
        onDelete: () => void
    }
)


export default function DocumentCard({ document, ...props }: Readonly<Props>){

    if(props.isOffer){
        return (
            <Card className="h-100">
                <Card.Body>
                    <Row className="align-items-center">
                        <Col xs="auto">
                            <GrDocumentText size={30} />
                        </Col>

                        <Col className="d-flex flex-column overflow-hidden">
                            <p
                                className="mb-1 fw-bold text-truncate"
                                title={document.fileName}
                            >
                                {document.fileName.substring(0, document.fileName.lastIndexOf("."))}
                            </p>

                            <small className="text-muted">
                                {getFileType(document.mimeType)}
                            </small>
                            
                            <small className="text-muted">
                                {getSize(document.fileSize)}
                            </small>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    }

    const isEditing = props.isEditing
    const onDelete = props.onDelete
    

    return (
        <Card className="h-100">
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <GrDocumentText size={30} />
                    </Col>

                    <Col className="d-flex flex-column overflow-hidden">
                        <p
                            className="mb-1 fw-bold text-truncate"
                            title={document.fileName}
                        >
                            {document.fileName.substring(0, document.fileName.lastIndexOf("."))}
                        </p>

                        <small className="text-muted">
                            {getFileType(document.mimeType)}
                        </small>
                        
                        <small className="text-muted">
                            {getSize(document.fileSize)}
                        </small>
                    </Col>
                    {isEditing && (
                        <Col xs="auto">
                            <Button
                                type="button"
                                className="btn bg-transparent border-0"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    onDelete()
                                }}
                            >
                                <CiTrash size={25} color="black" />
                            </Button>
                        </Col>
                    )}
                </Row>
            </Card.Body>
        </Card>
    )
}