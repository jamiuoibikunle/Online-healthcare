import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../firebase';
import Typewriter from 'typewriter-effect';
import { Checkbox, CircularProgress } from '@material-ui/core'
import { ArrowForwardIosOutlined } from '@material-ui/icons'
import styles from './Clinic.module.css'
import { useEffect } from 'react';
import { collection, getDocs } from "firebase/firestore";

const ClinicLogin = () => {

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ isError, setIsError ] = useState(false)
	const [ signIn, setSignIn ] = useState('Sign In')

	const navigate = useNavigate()

	useEffect(() => {
		const user = localStorage.getItem('user');
		user && navigate('/')
		const clinic = localStorage.getItem('clinic');
		clinic && navigate('/clinic/appointments')
		const doctor = localStorage.getItem('doctor');
		doctor && navigate('/doctor/discover')
	}, [])

	const handleEmail = (e) => {
		setEmail(e.target.value)
	}

	const handlePassword = (e) => {
		setPassword(e.target.value)
	}

	const handleLogin = async (e) => {

		e.preventDefault()

        if ( password.length === 0 || email.length === 0 ) {
            alert('Kindly fill in your details to proceed')
            return
        }

        setSignIn(<CircularProgress fontSize='small' />)

		await signInWithEmailAndPassword(auth, email, password)
		.then( async (userCredential) => {
            console.log('Logged in')
            const querySnapshot = await getDocs(collection(db, "clinics"));
            querySnapshot.forEach((doc) => {

            if (doc.id === userCredential.user.uid) {

                setSignIn('Redirecting')
                const user = userCredential.user.uid;
                localStorage.setItem('clinic', (user))
                window.location.reload()

            } else {
                setSignIn('Problem signing you in')
                return
            }

            });

		})
		.catch((error) => {
            setSignIn('Incorrect credentials')
			const errorCode = error.code;
			const errorMessage = error.message;
			console.log(error);
			setIsError(true);
		});

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
					typewriter.typeString('Make scheduling of appointments easier for patients today. Save time, use BooQiT.')
					.pauseFor(2500)
					.deleteAll()
					.start();
				}}
				/>
			</div>
			</section>
			<section className={styles.formwrapper}>
				<header>
					Welcome Back
				</header>
				<form onSubmit={handleLogin}>
					<input type='email' placeholder='Email' onChange={handleEmail} />
					<input type='password' placeholder='Password' onChange={handlePassword} />
					<div className={styles.remember}>
						<span>
							<Checkbox color='primary' /> Remember me
						</span>
					</div>
					<div className={styles.submit}>
							{signIn}
					<button type='submit'>
                        <div className={styles.arrow}>
						    <ArrowForwardIosOutlined />
                        </div>
					</button>
					</div>
				</form>
				<button className={styles.btn2} onClick={() => navigate('/clinic/register')}>
					Sign up
				</button>
			</section>
		</main>
	)
}

export default ClinicLogin