import { Outlet } from "react-router-dom";
import SideBar from "../../components/Company/Dashboard/SideBar";

export default function DashboardCompany(){
    return (
        <div className="d-flex min-vh-100">
            <SideBar />
            <div className="flex-grow-1">
                <Outlet />
            </div>
        </div>
    )
}