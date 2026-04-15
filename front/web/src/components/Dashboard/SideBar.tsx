import { Image, Nav } from "react-bootstrap";
import { FaBell, FaBookmark, FaFileAlt, FaHome, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../css/Dashboard/SideBar.css"

export default function SideBar(){
    return (
        <div className="sidebar d-flex flex-column p-3">
            <div className="text-center mb-4">
                <Image roundedCircle/>
            </div>
            <hr />
            <Nav className="flex-column gap-2">
                <Nav.Link as={Link} to="/dashboard/home" className="sidebar-link">
                    <FaHome /> <span>Inicio</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/curriculum" className="sidebar-link">
                    <FaFileAlt /> <span>Hoja de vida</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/saves" className="sidebar-link">
                    <FaBookmark /> <span>Guardados</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/notifications" className="sidebar-link">
                    <div>
                        <FaBell /> <span>Notificaciones</span>
                    </div>
                    <span className="badge bg-danger">2</span>
                </Nav.Link>
                <Nav.Link as={Link} to="/dashboard/help" className="sidebar-link">
                    <FaQuestionCircle /> <span>Ayuda</span>
                </Nav.Link>
                <Nav.Link className="sidebar-link">
                    <FaSignOutAlt /> <span>Cerrar sesión</span>
                </Nav.Link>
            </Nav>
        </div>

    )
}