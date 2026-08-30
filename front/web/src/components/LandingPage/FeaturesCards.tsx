import { Card } from "react-bootstrap";


export default function FeaturesCards(){
    return (
        <>
            <p className="fs-2 fw-bold text-center" style={{color:'var(--color-text-primary)'}}>¿Como te ayudamos?</p>
            <div className="d-flex justify-content-center ps-5 pe-5">
                <Card className="m-3" style={{width: "75%", height: "100%"}}>
                    <Card.Body>
                        <Card.Title>Seguridad Garantizada</Card.Title>
                        <Card.Text>
                            Todas las empresas estan verificadas. 
                            Protegemos tus datos y te alertamos sobre practicas sospechosas.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="m-3" style={{width: "75%"}}>
                    <Card.Body>
                        <Card.Title>Hoja de vida facil</Card.Title>
                        <Card.Text>
                            Crea tu perfil profesional paso a paso.
                            Controla que informacion compartes y con quien.
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card className="m-3" style={{width: "75%"}}>
                    <Card.Body>
                        <Card.Title>Acompañamiento continuo</Card.Title>
                        <Card.Text>
                            Recibe notificaciones de nuevas ofertas, consejos de seguridad laboral
                            y recursos de ayuda.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}