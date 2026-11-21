import { Outlet } from "react-router-dom";
import SideBar from "../../components/User/DashboardUser/SideBar";

export default function DashboardUser(){
    return (
        <div className="d-flex min-vh-100">
            <SideBar />
            <div className="flex-grow-1">
                <Outlet />
            </div>
        </div>
    )
}