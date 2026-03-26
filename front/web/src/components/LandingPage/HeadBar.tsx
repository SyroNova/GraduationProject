import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import '../../css/LandingPage/HeadBar.css';
import logo from "../../assets/Logo.png";
import { useNavigate } from 'react-router-dom';

function HeadBar(){
    const navigate = useNavigate()

    return (
        <Navbar className="my-navbar">
        <Container>
            <Navbar.Brand href="#home" className="text-white fs-2">
                <img src={logo} alt="logo" style={{ height: "80px", width: "80px", objectFit: "cover" }}  className="img-fluid" />
                {" "}
                UrNextJob
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Button variant="outline-light" onClick={() => navigate("/enter")}>Iniciar Sesión</Button>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    )
}

export default HeadBar;