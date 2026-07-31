import { Accordion, Card, Col, Row } from "react-bootstrap";
import { LuTriangleAlert, LuShield } from "react-icons/lu";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { IoIosCheckmark  } from "react-icons/io";
import "../../css/Dashboard/DashboardHelp.css"

export default function DashboardHelp(){
    return(
        <>
            <div className="d-flex flex-column align-items-center mt-2">
                <h2 style={{color: "var(--color-text-primary)"}}>Centro de ayuda</h2>
                <p className="text-muted" style={{color: "var(--color-text-secondary)"}}>Busca entre las preguntas frecuentes para solucionar tus dudas</p>
            </div>
            <hr className="mt-0"/>
            <div className="d-flex flex-column justify-content-center align-items-center mt-5 gap-5">
                <Card className="bg-danger" style={{ width: '50rem' }}>
                    <Card.Body>
                        <Row>
                            <Col sm={1}>
                                <LuTriangleAlert size={40} color="white"/>
                            </Col>
                            <Col>
                                <p className="text-white fw-medium fs-4">Prevención contra trata de personas</p>
                                <p className="text-white">
                                    Nunca pagues por un trabajo. Si te piden dinero, documentos originales o te ofrecen trabajo
                                    en otro pais sin informacion clara, <span className="fw-medium">reportalo inmediatamente</span>.
                                </p>
                                <ul className="text-white">
                                    <li>Las empresas legitimas nunca cobran por procesos de selección</li>
                                    <li>Desconfia de ofertas que parecen demasiado buenas</li>
                                    <li>Verifica siempre la identidad de quien te contacta</li>
                                </ul>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card style={{ width: '50rem' }}>
                    <Card.Body>
                        <Row>
                            <Col sm={1}>
                                <AiOutlineQuestionCircle size={35} style={{ color: "var(--color-text-primary)"}}/>
                            </Col>
                            <Col>
                                <p className="fw-medium fs-4" style={{ color: "var(--color-text-primary)"}}>Preguntas frecuentes</p>
                            </Col>
                        </Row>
                        <Accordion className="faq-accordion" alwaysOpen>
                            <Accordion.Item eventKey="0">
                                <Accordion.Header onClick={(e) => e.currentTarget.blur()}>¿Como creo mi hoja de vida?</Accordion.Header>
                                <Accordion.Body>
                                    Ve a la seleccion 'Hoja de vida' y completa cada uno de los campos.
                                    Puedes controlar que informacion es visible para las empresas
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="1">
                                <Accordion.Header onClick={(e) => e.currentTarget.blur()}>¿Esta plataforma cobra por buscar empleo?</Accordion.Header>
                                <Accordion.Body>
                                    No, esta plataforma es 100% gratuita. Nunca cobramos por acceder a ofertas o crear tu perfil.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="2">
                                <Accordion.Header onClick={(e) => e.currentTarget.blur()}>¿Como se si una oferta es legitima?</Accordion.Header>
                                <Accordion.Body>
                                    Todas las empresas estan verificadas. Si una oferta te pide dinero, documentos originales o parece sospechosa, reportala inmediatamente.
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey="3">
                                <Accordion.Header onClick={(e) => e.currentTarget.blur()}>¿Que hacer si me piden pagar por un trabajo?</Accordion.Header>
                                <Accordion.Body>
                                    ¡No pagues! Las empresas legitimas nunca cobran por procesos de seleccion. 
                                    Reporta inmediatamente la oferta.
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </Card.Body>
                </Card>
                <Card style={{ width: '50rem' }}>
                    <Card.Body>
                        <Row>
                            <Col sm={1}>
                                <BsTelephone className="ms-2 mt-1" size={30} style={{ color: "var(--color-text-primary)"}}/>
                            </Col>
                            <Col>
                                <p className="fw-medium fs-4" style={{ color: "var(--color-text-primary)"}}>Lineas de ayuda</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card className="mb-3 ps-4 pt-2">
                                    <p className="fs-4" style={{ color: "var(--color-text-primary)"}}>Trata de personas</p>
                                    <h2 className="text-danger">01-8000-522-020</h2>
                                    <p className="text-muted">Línea gratuita 24/7</p>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="mb-3 ps-4 pt-2">
                                    <p className="fs-4" style={{ color: "var(--color-text-primary)"}}>Línea 141</p>
                                    <h2 style={{ color: "rgb(54, 98, 171)" }}>141</h2>
                                    <p className="text-muted">Atención a migrantes</p>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Card className="mb-3 ps-4 pt-2">
                                    <p className="fs-4" style={{ color: "var(--color-text-primary)"}}>Policía Nacional</p>
                                    <h2 style={{ color: "rgb(54, 98, 171)" }}>123</h2>
                                    <p className="text-muted">Emergencias</p>
                                </Card>
                            </Col>
                            <Col>
                                <Card className="mb-3 ps-4 pt-2">
                                    <p className="fs-4" style={{ color: "var(--color-text-primary)"}}>Defensoría del Pueblo</p>
                                    <h2 style={{ color: "rgb(54, 98, 171)" }}>01-8000-914-814</h2>
                                    <p className="text-muted">Asesoría legal</p>
                                </Card>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Card className="mb-3" style={{ width: '50rem' }}>
                    <Card.Body>
                        <Row>
                            <Col sm={1}>
                                <LuShield className="ms-2 mt-1" size={30} style={{ color: "var(--color-text-primary)"}}/>
                            </Col>
                            <Col>
                                <p className="fw-medium fs-4" style={{ color: "var(--color-text-primary)"}}>Consejos de seguridad</p>
                                <ul className="list-unstyled">
                                    <li className="d-flex align-items-center mb-3">
                                        <IoIosCheckmark className="icon-check me-3" color="rgb(59, 179, 169)"/>
                                        <span className="text-muted fs-5">Verifica que la empresa esté registrada y tenga presencia real</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <IoIosCheckmark className="icon-check me-3" color="rgb(59, 179, 169)"/>
                                        <span className="text-muted fs-5">No compartas información sensible hasta confirmar la legitimidad del empleador</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <IoIosCheckmark className="icon-check me-3" color="rgb(59, 179, 169)"/>
                                        <span className="text-muted fs-5">Las entrevistas presenciales deben ser en lugares públicos o en las oficinas de la empresa</span>
                                    </li>
                                    <li className="d-flex align-items-center mb-3">
                                        <IoIosCheckmark className="icon-check me-3" color="rgb(59, 179, 169)"/>
                                        <span className="text-muted fs-5">Reporta cualquier solicitud de pago o comportamiento sospechoso</span>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}