import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import Typewriter from 'typewriter-effect';
import { Checkbox, CircularProgress } from '@material-ui/core'
import { ArrowForwardIosOutlined } from '@material-ui/icons'
import styles from './Clinic.module.css'
import { auth, db } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ClinicRegister = () => {

    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ address, setAddress ] = useState('')

    const [ signUp, setSignUp ] = useState('Sign Up')

    const navigate = useNavigate()

    useEffect(() => {
		const user = localStorage.getItem('user');
		user && navigate('/')
		const clinic = localStorage.getItem('clinic');
		clinic && navigate('/clinic/appointments')
		const doctor = localStorage.getItem('doctor');
		doctor && navigate('/doctor/discover')
    })

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
    }

    const handleAddress = (e) => {
        setAddress(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleRegister = async (e) => {

        e.preventDefault()

        if ( name.length === 0 || email.length === 0 || password.length === 0 ) {
            alert('Kindly fill in your details to proceed')
            return
        }

        setSignUp(<CircularProgress fontSize='small' />)

        setTimeout(() => {
            alert('Seems your network connection is bad. Please try again.')
            setSignUp('Sign Up')
            return
        }, 10000);

        const res = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, "clinics", res.user.uid), { email, name, address, timeStamp: serverTimestamp() })
        .then(() => {
            setSignUp('Redirecting')
            localStorage.setItem('clinic', res.user.uid)
            window.location.reload()
        })
        .catch((error) => setSignUp('Please try again'))

        }

    return (
        <main className={styles.wrapper}>
        <section className={styles.top}>
        <div className={styles.typewriter}>

        <Typewriter

            options={{
            loop: true,
            delay: 150
            }}

            onInit={(typewriter) => {
            typewriter.typeString('Book an appointment with a doctor today. Save time, use BooQiT.')
            .pauseFor(2500)
            .deleteAll()
            .start();
            }}
            />

        </div>
        </section>
        <section className={styles.formwrapper}>
            <header>
            Get Started
            </header>
            <form onSubmit={handleRegister}>
            <input type='name' placeholder='Clinic Name' onChange={handleName} />
            <input type='email' placeholder='Email Address' onChange={handleEmail} />
            <input type='name' placeholder='Address' onChange={handleAddress} />
            <input type='password' placeholder='Password' onChange={handlePassword} />
            <span>
                <Checkbox color='primary' />I agree to the Terms of Service and Privacy Policy
            </span>
            <div className={styles.submit}>
                {signUp}
                        <button type='submit'>
                        <div className={styles.arrow}>
						    <ArrowForwardIosOutlined />
                        </div>
                        </button>
                        </div>
            </form>
            <button className={styles.btn2} onClick={() => navigate('/clinic/login')}>  
                Sign in
            </button>
        </section>
        </main>
    )
}

export default ClinicRegister