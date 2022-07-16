import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Doctor = () => {
    
    const navigate = useNavigate()
    
    useEffect(() => {

        const doctor = localStorage.getItem('doctor')
        
        doctor ? navigate('/doctor/discover') : navigate('/doctor/login')
        
    }, [])
}

export default Doctor