import React, { useContext, useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';
import Typewriter from 'typewriter-effect';
import { Checkbox, CircularProgress } from '@material-ui/core'
import { ArrowForwardIosOutlined } from '@material-ui/icons'
import styles from './Auth.module.css'
import { useEffect } from 'react';
import { AppContext } from '../../App';

const Login = () => {

    const context = useContext(AppContext)

	const [ email, setEmail ] = useState('')
	const [ password, setPassword ] = useState('')
	const [ isError, setIsError ] = useState(false)
	const [ signIn, setSignIn ] = useState('Sign In')

	const navigate = useNavigate()

	useEffect(() => {
		const user = localStorage.getItem('user');
		user && navigate('/')
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

        setTimeout(() => {
            alert('Seems your network connection is bad. Please try again.')
            setSignIn('Sign In')
            return
        }, 10000);
 
		await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
            console.log(userCredential);
            console.log(context);
            // context.handleDetails(userCredential)
			// Signed in 
            setSignIn('Redirecting')
			const user = userCredential.user.uid;
			localStorage.setItem('user', (user))
			window.location.reload()
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
					Welcome Back
				</header>
				<form onSubmit={handleLogin}>
					<input type='email' placeholder='Email' onChange={handleEmail} />
					<input type='password' placeholder='Password' onChange={handlePassword} />
					<div className={styles.remember}>
						<span>
							<Checkbox color='primary' /> Remember me
						</span>
						<span className={styles.forgot}>
							Forgot password?
						</span>
					</div>
					<div className={styles.submit}>
							{signIn}
					<button type='submit'>
						<ArrowForwardIosOutlined className={styles.arrow} />
					</button>
					</div>
				</form>
				<button className={styles.btn2} onClick={() => navigate('/auth/register')}>
					Sign up
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

export default Login