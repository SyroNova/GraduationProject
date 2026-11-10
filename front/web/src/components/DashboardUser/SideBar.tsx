import { Image, Nav } from "react-bootstrap";
import { FaBell, FaBookmark, FaFileAlt, FaHome, FaQuestionCircle, FaSignOutAlt } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../css/Dashboard/SideBar.css"
import UseAuth from "../../hooks/UseAuth";
import logo from "../../assets/Logo.png";
import { useEffect, useState } from "react";
import axios from "../../api/axios";
import UseProfileImage from "../../hooks/UseProfileImage";

export default function SideBar(){
    const { logout } = UseAuth()
    const location = useLocation()
    const [count, setCount] = useState(0)
    const navigator = useNavigate()
    const { profileImage } = UseProfileImage()

    useEffect(() => {
        const fetchNotificationCount = async () => {
            try {
                const response = await axios.get('/notification/get-count')

                setCount(response.data.result)
            } catch (error) {
                console.log(error)
            }
        }

        void fetchNotificationCount()
    }, [])


    return (
        <div className="sidebar d-flex flex-column p-3">
            <div className="text-center mb-4">
                <Image onClick={() => navigator('/dashboard/me')} src={profileImage || logo} roundedCircle fluid alt="Foto de perfil"/>
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
                    <span className="badge bg-danger">{count === 0 ? "" : count}</span>
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