import React from 'react'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore"; 
import Typewriter from 'typewriter-effect';
import { Checkbox, CircularProgress } from '@material-ui/core'
import { ArrowForwardIosOutlined } from '@material-ui/icons'
import styles from './Auth.module.css'
import { auth, db } from '../firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const DoctorRegister = () => {

    const [ email, setEmail ] = useState('')
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ signUp, setSignUp ] = useState('Sign Up')

    const navigate = useNavigate()

    useEffect(() => {
		const user = localStorage.getItem('user');
		user && navigate('/')
		const clinic = localStorage.getItem('clinic');
		clinic && navigate('/clinic')
		const doctor = localStorage.getItem('doctor');
		doctor && navigate('/doctor')
    })

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleName = (e) => {
        setName(e.target.value)
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
        await setDoc(doc(db, "doctors", res.user.uid), { email, name, timeStamp: serverTimestamp() })
        .then(() => {
            setSignUp('Redirecting')
            localStorage.setItem('doctor', res.user.uid)
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
            <input type='name' placeholder='Name' onChange={handleName} />
            <input type='email' placeholder='Email' onChange={handleEmail} />
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
            <button className={styles.btn2} onClick={() => navigate('/doctor/login')}>  
                Sign in
            </button>
        </section>
        {/* <header class="title">
            <h1 class="up">SIGN UP</h1>
        </header>
        <div className={styles.container}>
        <div className={styles.header}>
            <h2>Get Started</h2>
                <h3 className={styles.get}>
                    Book an appointment with a doctor today. Save time, use BooQiT.
                </h3>
            </div>
        </div>
        <form action="" className={styles.form}>
        <input type="text" id="name" placeholder="Name" />
        <input type="email" id="email" placeholder="E-mail" />
        <input type="password" id="password" placeholder="Password" />
        <div class="radio">
            <input type="radio" id="terms" />
            <label for="terms" className={styles.terms}> I agree to the <span>Terms of Service</span> and <span>Privacy Policy</span></label>
        </div>
        <button className={styles.btn}>Sign Up</button>
        </form>
        <div className={styles.links}>
        <span className={styles.log}>Already have an account? <a href="signin.html" className={styles.main}>Sign In</a></span>
        </div> */}
        </main>
    )
}

export default DoctorRegister