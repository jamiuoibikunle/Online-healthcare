// Imports for users

import Homepage from "./Components/Home/Homepage";
import Appointments from "./Components/Appointments/Appointments";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Navigation from "./Components/Navigation/Navigation";
import Profile from "./Components/Profile/Profile";
import Messages from "./Components/Messages/Messages";
import Discover from "./Components/Discover/Discover";

// General imports
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

// Clinic imports
import ClinicLogin from "./Hospitals/Login";
import ClinicRegister from "./Hospitals/Register";
import ClinicProfile from "./Hospitals/Profile";
import ClinicSchedules from "./Hospitals/Schedules";
import ClinicHome from "./Hospitals/ClinicHome";

// Doctor imports
import DoctorDiscover from "./Doctors/Discover";
import DoctorChats from "./Doctors/DoctorChats";
import DoctorProfile from "./Doctors/Profile";
import DoctorRegister from "./Doctors/Register";
import DoctorLogin from "./Doctors/Login";
import DoctorMessages from "./Doctors/DoctorMessages";
import ClinicSettings from "./Hospitals/Settings";
import ChatsScreen from "./Components/Messages/ChatsScreen";

const AppContext = createContext()

export default function App() {

    const [ userDetails, setUserDetails ] = useState()

    const RequireAuth = ({ children }) => {
        const user = localStorage.getItem('user')
        return user ? ( children ) : <Navigate to='/auth/login' />
    }

    const RequireClinic = ({ children }) => {
        const clinic = localStorage.getItem('clinic')
        return clinic ? ( children ) : <Navigate to='/clinic/login' />
    }

    const RequireDoctor = ({ children }) => {
        const doctor = localStorage.getItem('doctor')
        return doctor ? ( children ) : <Navigate to='/doctor/login' />
    }

    return (
        <AppContext.Provider value={{
            userDetails,
            setUserDetails
        }}>
        <Router>
        <Routes>
            
            {/* Routes for users */}
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/" element={<RequireAuth><Homepage /></RequireAuth>} />
            <Route path="/appointments" element={<RequireAuth><Appointments /></RequireAuth>} />
            <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="/chats" element={<RequireAuth><Messages /></RequireAuth>} />
            <Route path="/chats/:chatId" element={<RequireAuth><ChatsScreen /></RequireAuth>} />
            <Route path="/discover" element={<RequireAuth><Discover /></RequireAuth>} />
            
            {/* Routes for hospitals */}
            <Route path="/clinic/login" element={<ClinicLogin />} />
            <Route path="/clinic/register" element={<ClinicRegister />} />
            <Route path="/clinic" element={<RequireClinic><ClinicHome /></RequireClinic>} />
            <Route path="/clinic/profile" element={<RequireClinic><ClinicProfile /></RequireClinic>} />
            <Route path="/clinic/appointments" element={<RequireClinic><ClinicSchedules /></RequireClinic>} />
            <Route path="/clinic/settings" element={<RequireClinic><ClinicSettings /></RequireClinic>} />
            
            {/* Routes for doctors */}
            <Route path="/doctor/discover" element={<RequireDoctor><DoctorDiscover /></RequireDoctor>} />
            <Route path="/doctor/chats" element={<RequireDoctor><DoctorMessages /></RequireDoctor> } />
            <Route path="/doctor/chats/:chatid" element={<RequireDoctor><DoctorChats /></RequireDoctor> } />
            <Route path="/doctor/profile" element={<RequireDoctor><DoctorProfile /></RequireDoctor>} />
            <Route path="/doctor/register" element={<DoctorRegister />} />
            <Route path="/doctor/login" element={<DoctorLogin />} />

            {/* Error page */}
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Navigation />
        </Router>
        </AppContext.Provider>
    );
    }

export { AppContext }