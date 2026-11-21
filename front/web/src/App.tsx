import EnterPage from "./pages/EnterPage"
import LandingPage from "./pages/LandingPage"
import { Route, Routes } from "react-router-dom"
import { ProfileImageProvider } from './context/ProfileImageProvider.tsx';
import { SmsProvider } from './context/SmsProvider.tsx';
// User imports
import LoginUser from "./pages/User/LoginUser"
import RegisterPageUser from "./pages/User/RegisterPageUser"
import CurriculumPage from "./pages/User/CurriculumPage"
import DashboardUser from "./pages/User/DashboardUser"
import DashboardHomeUser from "./components/User/DashboardUser/DashboardHome.tsx"
import DashboardSaves from "./components/User/DashboardUser/DashboardSaves"
import DashboardCurriculumView from "./components/User/DashboardUser/DashboardCurriculumView"
import DashboardNotifications from "./components/User/DashboardUser/DashboardNotifications"
import DashboardHelp from "./components/User/DashboardUser/DashboardHelp"
import DashboardOffer from "./components/User/DashboardUser/DashboardOffer"
import DashboardMeUser from "./components/User/DashboardUser/DashboardMe"
// Company imports
import LoginCompany from "./pages/Company/LoginCompany"
import DashboardCompany from "./pages/Company/DashboardCompany.tsx"
import DashboardHomeCompany from "./components/Company/Dashboard/DashboardHome.tsx"
import DashboardMeCompany from "./components/Company/Dashboard/DashboardMe.tsx"
import DashboardCandidates from "./components/Company/Dashboard/DashboardCandidates.tsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/enter" element={<EnterPage />} />

      {/* User */}
      <Route path="/login/user" element={<LoginUser />} />
      <Route path="/register/user" element={
        <SmsProvider>
          <RegisterPageUser />
        </SmsProvider>
      } />
      <Route path="/curriculum" element={<CurriculumPage />} />
      <Route path="/dashboard/user" element={
        <ProfileImageProvider>
          <DashboardUser />
        </ProfileImageProvider>
      }>
        <Route path='me' element={<DashboardMeUser />}/>
        <Route path="home" element={<DashboardHomeUser />}/>
        <Route path="offer/:id" element={<DashboardOffer />}/>
        <Route path="curriculum" element={<DashboardCurriculumView />}/>
        <Route path="saves" element={<DashboardSaves />}/>
        <Route path="notifications" element={<DashboardNotifications />}/>
        <Route path="help" element={<DashboardHelp />}/>
      </Route>

      {/* Company */}
      <Route path ="/login/company" element={<LoginCompany />} />
      <Route path="/dashboard/company" element={<DashboardCompany />}>
        <Route path="home" element={<DashboardHomeCompany />}/>
        <Route path="me" element={<DashboardMeCompany />}/>
        <Route path="offer/create"/>
        <Route path="candidates" element={<DashboardCandidates />}/>
        <Route path="notifications"/>
      </Route> 
    </Routes>
  )
}

export default App
