
import EnterPage from "./pages/EnterPage"
import LandingPage from "./pages/LandingPage"
import { Route, Routes } from "react-router-dom"
import LoginUser from "./pages/LoginUser"
import RegisterPage from "./pages/RegisterPage"
import CurriculumPage from "./pages/CurriculumPage"
import Dashboard from "./pages/Dashboard"
import DashboardHome from "./components/DashboardUser/DashboardHome"
import DashboardSaves from "./components/DashboardUser/DashboardSaves"
import DashboardCurriculum from "./components/DashboardUser/DashboardCurriculum"
import DashboardNotifications from "./components/DashboardUser/DashboardNotifications"
import DashboardHelp from "./components/DashboardUser/DashboardHelp"
import DashboardOffer from "./components/DashboardUser/DashboardOffer"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/enter" element={<EnterPage />} />
      <Route path="/login/user" element={<LoginUser />} />
      <Route path="/register/user" element={<RegisterPage />} /> 
      <Route path="/curriculum" element={<CurriculumPage />} />
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="home" element={<DashboardHome />}/>
        <Route path="offer/:id" element={<DashboardOffer />}/>
        <Route path="curriculum" element={<DashboardCurriculum />}/>
        <Route path="saves" element={<DashboardSaves />}/>
        <Route path="notifications" element={<DashboardNotifications />}/>
        <Route path="help" element={<DashboardHelp />}/>
      </Route>

    </Routes>
  )
}

export default App
