import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Components/Home/Homepage";
import Appointments from "./Components/Appointments/Appointments";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Navigation from "./Components/Navigation/Navigation";

export default function App() {

  const RequireAuth = ({ children }) => {
    const user = localStorage.getItem('user')
    return user ? ( children ) : <Navigate to='/auth/login' />
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/" element={<RequireAuth><Homepage /></RequireAuth>} />
        <Route path="/appointments" element={<RequireAuth><Appointments /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navigation />
    </Router>
  );
}
