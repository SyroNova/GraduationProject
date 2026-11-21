import { Image, Nav } from "react-bootstrap";
import { FaRegBell , FaRegBuilding } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../../css/Dashboard/SideBar.css"
import UseAuth from "../../../hooks/UseAuth";
import logo from "../../../assets/Logo.png";
import { FiPlusCircle, FiLogOut, FiHome  } from "react-icons/fi";
import { LuUsers } from "react-icons/lu";
import { useEffect, useState } from "react";
import axios from "../../../api/axios";

export default function SideBar(){
    const { logout } = UseAuth()
    const location = useLocation()
    const [count, setCount] = useState(0)
    const navigator = useNavigate()

    
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
                <Image onClick={() => navigator('/dashboard/company/me')} src={logo} roundedCircle fluid alt="Foto de perfil"/>
            </div>
            <hr />
            <Nav className="flex-column gap-2" activeKey={location.pathname}>
                <Nav.Link as={Link} eventKey="/dashboard/company/home" to="/dashboard/company/home" className="sidebar-link">
                    <FiHome  size={18}/> <span>Inicio</span>
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/dashboard/company/me" to="/dashboard/company/me" className="sidebar-link">
                    <FaRegBuilding  /> <span>Perfil empresarial</span>
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/dashboard/company/offer/create" to="/dashboard/company/offer/create" className="sidebar-link">
                    <FiPlusCircle  /> <span>Crear oferta</span>
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/dashboard/company/candidates" to="/dashboard/company/candidates" className="sidebar-link">
                    <LuUsers  /> <span>Candidatos</span>
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/dashboard/company/notifications" to="/dashboard/company/notifications" className="sidebar-link">
                    <div>
                        <FaRegBell /> <span className="ms-1">Notificaciones</span>
                    </div>
                    <span className="badge bg-danger">{count === 0 ? "" : count}</span>
                </Nav.Link>
                <Nav.Link as={Link} eventKey="/" to="/" className="sidebar-link" onClick={logout}>
                    <FiLogOut  /><span>Cerrar sesión</span>
                </Nav.Link>
            </Nav>
        </div>
    )
}