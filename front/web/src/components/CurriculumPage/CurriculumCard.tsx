import { Button, Card } from "react-bootstrap";
import logo from "../../assets/Logo.png";
import "../../css/CurriculumPage/CurriculumCard.css"
import { useNavigate } from "react-router-dom";

type Props = {
    onNext: () => void
}

export default function CurriculumCard({onNext}: Readonly<Props>) {
    const navigator = useNavigate();

    return (
        <Card style={{ maxWidth: '50rem'}}>
            <Card.Body className="d-flex align-items-center flex-column mb-5">
                <div className="d-flex justify-content-center pt-5 flex-column align-items-center pb-5">
                    <img src={logo} alt="logo" style={{ height: "120px", width: "120px", objectFit: "cover" }}  className="img-fluid" />
                    <p className="fw-bold fs-1" style={{color: "var(--color-text-primary)"}}>Empieza a crear tu hoja de vida</p>
                    <p className="fw-bold text-center" style={{color: "rgb(157, 157, 157)"}}>Para postularse a un empleo, una hoja de vida completa y sustanciosa es muy importante</p>
                </div>
                <div className="d-flex align-items-center gap-4">
                    <Button className="my-buttonCurriculum" onClick={onNext} style={{ width: '20rem', height: '15rem' }}>
                        <div className="d-flex flex-column">
                            <p className="fs-5 fw-bold text-start" style={{color: "var(--color-text-primary)"}}>Completar hoja de vida ahora</p>
                            <p className="fw-bold text-start" style={{color: "rgb(102, 121, 150)"}}>Solo te tomará 10-15 minutos. Podrás guardar tu progreso en cualquier momento.</p>
                        </div>
                    </Button>
                    <Button className="my-buttonCurriculum" onClick={() => navigator("/dashboard/home")} style={{ width: '20rem', height: '15rem'}}>
                        <div className="d-flex flex-column">
                            <p className="fs-5 fw-bold text-start" style={{color: "var(--color-text-primary)"}}>Completar más tarde</p>
                            <p className="fw-bold text-start" style={{color: "rgb(102, 121, 150)"}}>Explora la plataforma y completa tu hoja de vida cuado estés listo.</p>
                        </div>
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}