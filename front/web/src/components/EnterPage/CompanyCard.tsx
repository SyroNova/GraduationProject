import { Button, Card } from "react-bootstrap";
import "../../css/EnterPage/CompanyCard.css"
import { BsShop } from "react-icons/bs";
import { useNavigate } from "react-router-dom";


export default function CompanyCard(){
    const navigator = useNavigate()

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body className="d-flex align-items-center flex-column gap-4">
                <div id="icon-company" className="text-center align-content-center">
                    <BsShop size={40} />
                </div>
                <Card.Title className="text-center fs-2" style={{color: "var(--color-text-primary)"}}>Empresa</Card.Title>
                <Button className="btn p-2 my-button-company-card fw-semibold w-100" onClick={() => navigator("/login/company")}>Ingresar como empresa</Button>
            </Card.Body>
        </Card>
    )
}