import { Outlet } from "react-router-dom";
import SideBar from "../components/Dashboard/SideBar";

export default function Dashboard(){
    return (
        <div className="d-flex">
            <SideBar />

            <div className="flex-grow-1">
                <Outlet />
            </div>
        </div>
    )
}