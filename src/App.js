import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Homepage from "./Components/Home/Homepage";
import Appointments from "./Components/Appointments/Appointments";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Navigation from "./Components/Navigation/Navigation";
import Profile from "./Components/Profile/Profile";
import Messages from "./Components/Messages/Messages";
import Discover from "./Components/Discover/Discover";

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
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/chats" element={<RequireAuth><Messages /></RequireAuth>} />
        <Route path="/discover" element={<RequireAuth><Discover /></RequireAuth>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navigation />
    </Router>
  );
}
