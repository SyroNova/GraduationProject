import { Button } from "react-bootstrap"
import "../../css/LandingPage/Hero.css"
import { useNavigate } from "react-router-dom"

export default function Hero(){
    const navigate = useNavigate()
    return (
        <div className="d-flex justify-content-center flex-column align-items-center">
            <p className="fs-2 fw-bold my-tittle">Encuentra oportunidades laborales con dignidad y seguridad</p>
            <p className="fs-5 my-subText">Una plataforma diseñada especialmente para personas migrantes y población vulnerable. Sin intermediarios, sin costos ocultos</p>
            <Button className="btn p-2 my-button" onClick={() => navigate('/enter')}>Comenzar ahora</Button>
        </div>
    )
}