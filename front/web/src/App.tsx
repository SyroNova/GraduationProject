
import EnterPage from "./pages/EnterPage"
import LandingPage from "./pages/LandingPage"
import { Route, Routes } from "react-router-dom"
import LoginUser from "./pages/LoginUser"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/enter" element={<EnterPage />} />
      <Route path="/login/user" element={<LoginUser />} />
    </Routes>
  )
}

export default App
