import React from 'react'
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from 'react';
import { db } from '../../firebase';
import { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import styles from './Homepage.module.css'

const Homepage = () => {

	const user = localStorage.getItem('user')
	const [ details, setDetails ] = useState({})
	const [ greetings, setGreetings ] = useState('')

	const getName = async () => {
		
		const docRef = doc(db, "users", user);
		const docSnap = await getDoc(docRef);
	
		if (docSnap.exists()) {
			setDetails(docSnap.data())
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
		}
	}

	console.log(new Date().getHours());

	useEffect(() => {
		getName()

		const getTime = () => {

			const hour = new Date().getHours()

			if ( hour > 0 && hour < 12 ) {
				setGreetings('Good morning')
			} else if ( hour > 11 && hour < 16 ) {
				setGreetings('Good afternoon')
			} else {
				setGreetings('Good evening')
			}

			// if ( 12 > hour > 0 ) setGreetings('Good morning')
			// if ( 16 > hour > 11 ) setGreetings('Good afternoon')
			// if ( 23  hour > 11 ) setGreetings('Good afternoon')
			// else setGreetings('Good evening')

		}

		getTime()

	}, [user])

	return details.name ? (
		<div className={styles.homewrapper}>
			<div className={styles.header}>
				<div className={styles.greeting}>
					{greetings}, {details.name}
				</div>
				<div className={styles.welcome}>
					Welcome back
				</div>
				{/* <div className={styles.finddoctor}>
					<span>
						Find your doctor
					</span>
					<span>
						See all
					</span>
				</div> */}
			</div>
		</div>
	) : (
			<CircularProgress className={styles.progress} />
	)}

export default Homepage