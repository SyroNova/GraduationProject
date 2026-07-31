import { Image, Nav } from "react-bootstrap";
import { FaBell, FaBookmark, FaFileAlt, FaHome, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import "../../css/Dashboard/SideBar.css"
import UseAuth from "../../hooks/UseAuth";

export default function SideBar(){
    const { logout } = UseAuth()
    const location = useLocation()

    return (
        <div className="sidebar d-flex flex-column p-3">
            <div className="text-center mb-4">
                <Image roundedCircle/>
            </div>
            <hr />
            <Nav className="flex-column gap-2" activeKey={location.pathname}>
                <Nav.Link as={Link} eventKey="/dashboard/home" to="/dashboard/home" className="sidebar-link">
                    <FaHome /> <span>Inicio</span>
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/dashboard/curriculum" to="/dashboard/curriculum" className="sidebar-link">
                    <FaFileAlt /> <span>Hoja de vida</span>
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/dashboard/saves" to="/dashboard/saves" className="sidebar-link">
                    <FaBookmark /> <span>Guardados</span>
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/dashboard/notifications" to="/dashboard/notifications" className="sidebar-link">
                    <div>
                        <FaBell /> <span>Notificaciones</span>
                    </div>
                    {/*<span className="badge bg-danger">2</span>*/}
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/dashboard/help" to="/dashboard/help" className="sidebar-link">
                    <FaQuestionCircle /> <span>Ayuda</span>
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/" to="/" className="sidebar-link" onClick={logout}>
                    <FaSignOutAlt /><span>Cerrar sesión</span>
                </Nav.Link>
            </Nav>
        </div>

    )
}