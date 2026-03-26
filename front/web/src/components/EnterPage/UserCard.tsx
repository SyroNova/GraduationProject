import { Button, Card } from "react-bootstrap";
import { FiShoppingBag } from "react-icons/fi";
import "../../css/EnterPage/UserCard.css"
import { useNavigate } from "react-router-dom";


export default function UserCard(){
    const navigator = useNavigate()


    return (
        <Card style={{ width: '18rem'}}>
            <Card.Body className="d-flex align-items-center flex-column gap-4">
                <div id="icon-user" className="text-center align-content-center">
                    <FiShoppingBag size={40} />
                </div>
                <Card.Title className="text-center fs-2" style={{color: "var(--color-text-primary)"}}>Usuario</Card.Title>
                <Button className="btn p-2 fw-semibold w-100" onClick={() => navigator("/login/user")}>Ingresar como usuario</Button>
            </Card.Body>
        </Card>
    )
}