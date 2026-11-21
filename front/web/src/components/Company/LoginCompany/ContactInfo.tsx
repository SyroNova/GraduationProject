import { Button, Card, Col, Row } from "react-bootstrap"
import "../../../css/Company/Company.css"
import { CiMail } from "react-icons/ci"
import { FiPhone, FiMessageSquare  } from "react-icons/fi"
import { FaRegCircleCheck } from "react-icons/fa6"

type Props = {
    onDone: () => void
}

export default function ContactInfo(props: Readonly<Props>){


    return (
        <Card className="p-3" style={{width: "45%"}}>
            <Card.Body>
                <Card.Title className="mb-4" style={{color: "var(--color-text-primary)"}}>Pasos para registrar tu empresa:</Card.Title>
                <Card.Text>
                    <Col className="d-flex flex-column gap-3">
                        <Row>
                            <Col>
                                <Card style={{background: "rgb(244, 246, 248)"}}>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={1}>
                                                <div className="text-center align-content-center text-white icon-contact">
                                                    1
                                                </div>
                                            </Col>
                                            <Col className="ms-3">
                                                <Card.Title style={{color: "var(--color-text-primary)"}}>Contacta al equipo</Card.Title>
                                                <Card.Subtitle className="text-muted">Comunícate con nostros por alguno de los canales oficiales</Card.Subtitle>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card style={{background: "rgb(244, 246, 248)"}}>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={1}>
                                                <div className="text-center align-content-center text-white icon-contact">
                                                    2
                                                </div>
                                            </Col>
                                            <Col className="ms-3">
                                                <Card.Title style={{color: "var(--color-text-primary)"}}>Envía documentación</Card.Title>
                                                <Card.Subtitle className="text-muted">Proporciona los siguientes documentos: Cámara de comercio, Salaf y el historial de la superintendencia de industria y comercio</Card.Subtitle>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card style={{background: "rgb(244, 246, 248)"}}>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={1}>
                                                <div className="text-center align-content-center text-white icon-contact">
                                                    3
                                                </div>
                                            </Col>
                                            <Col className="ms-3">
                                                <Card.Title style={{color: "var(--color-text-primary)"}}>Proceso de validación</Card.Title>
                                                <Card.Subtitle className="text-muted">Nuestro equipo revisará la informacioón (2-5 días hábiles)</Card.Subtitle>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card style={{background: "rgb(244, 246, 248)"}}>
                                    <Card.Body>
                                        <Row>
                                            <Col sm={1}>
                                                <div id="icon-contact-end" className="text-center align-content-center text-white">
                                                    4
                                                </div>
                                            </Col>
                                            <Col className="ms-3">
                                                <Card.Title style={{color: "var(--color-text-primary)"}}>Recibe tus credenciales</Card.Title>
                                                <Card.Subtitle className="text-muted">Una vez aprobado, recibirás tu usuario (NIT) y contraseña</Card.Subtitle>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Col>
                    <hr />
                    <div className="d-flex flex-column gap-2">
                        <h4 style={{color: "var(--color-text-primary)"}}>Canales de contacto</h4>
                        <Row>
                            <Col sm={1}>
                                <CiMail size={28} style={{color: "rgb(62, 106, 176)"}}/>
                            </Col>
                            <Col style={{color: "var(--color-text-primary)"}}>
                                <span className="fw-bold">Email:</span> <span className="text-muted">empresas@empleodignificado.com</span>
                            </Col>  
                        </Row>
                        <Row>
                            <Col sm={1}>
                                <FiPhone size={28} style={{color: "rgb(62, 106, 176)"}}/>
                            </Col>
                            <Col style={{color: "var(--color-text-primary)"}}>
                                <span className="fw-bold">Teléfono:</span> <span className="text-muted">+57 (1) 800-123-4567</span>
                            </Col>  
                        </Row>
                        <Row>
                            <Col sm={1}>
                                <FiMessageSquare size={28} style={{color: "rgb(47, 174, 158, 100%)"}}/>
                            </Col>
                            <Col style={{color: "var(--color-text-primary)"}}>
                                <span className="fw-bold">WhastsApp:</span> <span className="text-muted">+57 300 123 4567</span>
                            </Col>  
                        </Row>
                    </div>
                    <Card className="mt-4" style={{background: "rgb(234, 246, 245)", borderColor: "rgb(73, 184, 170)"}}>
                        <Card.Body>
                            <Row>
                                <Col sm={1}>
                                    <FaRegCircleCheck size={20}/>
                                </Col>
                                <Col className="text-muted">
                                    Te acompañaremos en todo el proceso para que tu empresa pueda conectar
                                    con candidatos calificados de forma rápida y segura.
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                    <Button className="btn mt-3 w-100" onClick={props.onDone}>Entendido</Button>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}