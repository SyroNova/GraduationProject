
import EnterPage from "./pages/EnterPage"
import LandingPage from "./pages/LandingPage"
import { Route, Routes } from "react-router-dom"
import LoginUser from "./pages/LoginUser"
import RegisterPage from "./pages/RegisterPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/enter" element={<EnterPage />} />
      <Route path="/login/user" element={<LoginUser />} />
      <Route path="/register/user" element={<RegisterPage />} /> 
    </Routes>
  )
}

export default App
