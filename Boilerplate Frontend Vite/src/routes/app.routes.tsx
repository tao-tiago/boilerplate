import { Route, Routes } from "react-router-dom"
import Home from "../pages/HomePage"
import Single from "../pages/Single"

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/single" element={<Single />} />
  </Routes>
)

export default AppRoutes
