import { ArrowForwardIosRounded } from '@material-ui/icons'

import React, { useState } from 'react'
import { useEffect } from 'react';
import styles from './Appointments.module.css'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../../firebase';

const Schedules = () => {

	const [ daysLeft, setDaysLeft ] = useState([])
	const [ isDate, setIsDate ] = useState()
	const [ availableTimes, setAvailableTimes ] = useState(
		['09:00 am', '10:00 am', '11:00 am', '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm']
		)
	const [ dateSelected, setDateSelected ] = useState('')
	const [ timeSelected, setTimeSelected ] = useState('')
	const [ allUsers, setAllUsers ] = useState()
	const [ existingUsers, setExistingUsers ] = useState([])
	const [ isRoomFilled, setIsRoomFilled ] = useState()
	const [ canProceed, setCanProceed ] = useState(false)
	const [ btnDisabled, setBtnDisabled ] = useState(false)
	const [ isError, setIsError ] = useState(false)
	const [ isDuplicate, setIsDuplicate ] = useState(false)
	
	const dt = new Date();
	const today = dt.getDate();
	const month = dt.getMonth() + 1;
	const year = dt.getYear();
	const daysInMonth = new Date(year, month, 0).getDate();
	const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat']

	useEffect(() => {
		
		if ( daysLeft.length === 0 ) {


			// Get the total number of days left in a month and iterate over them
			
			for (let i = today; i <= daysInMonth; i++) {
				const day = new Date(year, month, i - 1).getDay()
				setDaysLeft(daysLeft => [ ...daysLeft, { date: i, day: days[day] } ])
			}

		}

	}, [])

	useEffect(() => {

		if (existingUsers.length !== 0) {
			setIsDuplicate(existingUsers.includes(localStorage.getItem('user')))
		}

	}, [ existingUsers ])

	return (
		<>
		<main className={styles.schedules}>
			<header>
				Pick a date
			</header>
			<section className={styles.dates}>
				{
					daysLeft.map((each) => {

					return (
						
					<div key={each.date} className={styles.date} tabIndex='1' onClick={ async () => {

						// Sets the date that the user clicked on. Rerenders on every click.

						setDateSelected(String(each.date))
						let selected = each.date + '|' + (new Date().getMonth() + 1) + '|' + new Date().getFullYear();
						selected = String(selected)

						// Get reference to the DB

						const docRef = doc(db, "University College Hospital", "appointments", "days", selected);
						const docSnap = await getDoc(docRef);

						console.log(docSnap.data())

						// console.log(docSnap.data()['18/7/2022']);
						setIsDate(true)

						if (docSnap.exists()) {

							// This keeps track of the user's selections

							let returnedData = docSnap.data()

							// Does the data exist?

							let isDate = returnedData[selected]

							setIsDate(true)

							// isDate ? Object.entries(isDate).forEach(([ key,value ]) => {

							// 	if (value.length === 3) {

							// 			// If users are already 3 in a given time, remove the time from available times

							// 			let newTimes = availableTimes.filter(each => each !== key)
							// 			console.log(newTimes);
							// 			setAvailableTimes(newTimes)

							// 	} else {

							// 		// If users are not up to 3, set available times back to initial

							// 		console.log('There is space left');
							// 		setAvailableTimes(['09:00 am', '10:00 am', '11:00 am', '12:00 am', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm'])
							// 	}


							// }) : setAvailableTimes(['09:00 am', '10:00 am', '11:00 am', '12:00 am', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm'])

						}
						 else {
							// doc.data() will be undefined in this case
							console.log("Document not found in the DB");
						}

					}} >
					<div className={styles.day}>
						{each.day}
					</div>
					<div className={styles.datefigure}>
							{each.date}
						</div>
					</div>
						)
					})
					}

			</section>

			{
				isError && (
					<div className={styles.checkingTime}>
						Seems like you have not seleected any time at all.
					</div>
				)
			}

			{isDate && 

			<>
			<header>
				Choose time
			</header>
			<section className={styles.times}>
				{
					availableTimes.map((each) => (
						<div className={styles.time} tabIndex='1' key={each} onClick={ async () => {

							setIsError(false)
							
							setTimeSelected(each);
							
							// Get reference to the DB

							let pickedDate = dateSelected + '|' + (new Date().getMonth() + 1) + '|' + new Date().getFullYear()
							pickedDate = String(pickedDate)

							const docRef = doc(db, "University College Hospital", "appointments", "days", pickedDate, "times", each);
							const docSnap = await getDoc(docRef)

							if (docSnap.data() && docSnap.data()[each]) {
								console.log(docSnap.data()[each]);
								setExistingUsers(docSnap.data()[each])

								if (docSnap.data()[each].length >= 5) {
									setIsRoomFilled(true)
									setCanProceed(false)
								} else {
									setIsRoomFilled(false)
									setCanProceed(true)
								}

							} else {
								setExistingUsers([])
							}
							setAllUsers(docSnap.data())

						}
						}>
						<div className={styles.timefigure}>
							{each}
						</div>
						</div>
					))
					}
			</section>

			{/* Message for when room is filled */}

			{
				isRoomFilled && (
					<div className={styles.checkingTime}>
						Available spots for {timeSelected} consultations are filled up. Kindly select a different time for an appointment.
					</div>
				)
			}

			</>
			}

		</main>
		<div className={styles.btn}>
				<button disabled={btnDisabled} onClick={() => {

					
					let pickedDate = dateSelected + '|' + (new Date().getMonth() + 1) + '|' + new Date().getFullYear()
					pickedDate = String(pickedDate)

					// let isExist

					// if (isDate[timeSelected]) {
					// 	prevUsers = isDate[timeSelected]
					// } else {
					// 	prevUsers = []
					// }

					// Get previous data for the selected time

					if ( !isRoomFilled && timeSelected && dateSelected && !isDuplicate ) {
						
						setBtnDisabled(true)
	
						let dateDetails = {}
						dateDetails[timeSelected] = [ ...existingUsers, localStorage.getItem('user') ]
						
						setDoc(doc(db, "University College Hospital", "appointments", "days", pickedDate, "times", timeSelected), dateDetails)
						.then(() => console.log('Updated'))
						.then(() => {
							
							setDoc(doc(db, "users", localStorage.getItem('user'), "appointments", pickedDate), {
								time: timeSelected
							})
							.then(() => console.log('Successfully saved to users appointment'))
							.catch(() => console.log('Error saving to users appointments'))
							.catch(() => setBtnDisabled(false))
							
						})
						.then(() => window.location.reload())
						.catch(() => console.log('Error updating'))
						.catch(() => setBtnDisabled(false))
						.catch(() => alert('There was an error placing your appointment. Please try again.'))
						
					} else if ( !timeSelected && !dateSelected ) {
						setIsError(true)
						console.log('Nahhhhh');
					} else if (isDuplicate) {
						alert('You already have an apppointment at this time')
					} else {
						alert('Please select a different time')
					}

					// const getData = async () => {
	
						// const docRef = doc(db, "UCH", "appointments", "days", pickedDate, "times", timeSelected);
						// const docSnap = await getDoc(docRef);
						
						// if (docSnap.exists()) {

						// const oldArray = doc(db, "UCH", pickedDate);
						
						// updateDoc(oldArray, updatedInfo)
						// .then(() => console.log('Updated'))
						// .catch(() => console.log('Error with update'))
						

							// console.log('Doc exists');
							// let data = docSnap.data()
							// let users = data[timeSelected] || []
							// console.log(users);

							// console.log(data);
							
							// let dateDetails = {}
							// dateDetails[timeSelected] = existingUsers => [ ...existingUsers, localStorage.getItem('user') ]

							// const newUsers = [ ...users, localStorage.getItem('user') ]
							// console.log(newUsers);

							// setDoc(db, "UCH", "appointments", "days", pickedDate, "times", timeSelected, pickedDate)
							// .then(() => console.log('Push successful'))
							// .catch(() => console.log('There was a problem'))

							// if (data) {
								
							// 	if (data[timeSelected]) {
							// 		console.log(data[timeSelected]);
							// 		prevUsers = data[timeSelected]
							// 		setDocExist(true)
							// 	} else {
							// 		console.log('This hour is free');
							// 		prevUsers = []
							// 		setDocExist(false)
							// 	}

							// } else {
							// 	console.log('No data for this date');
							// 	setDocExist(false)
							// 	prevUsers = []
							// }
						// } else {
						// 	console.log('Doc not');
							
						// 	const postData = () => {
		
						// 		prevUsers.length === 0 ? console.log('Add new') : console.log('Update old')
	
						// 			const addNew = () => {
						// 				let dateDetails = {}
						// 				dateDetails[timeSelected] = [ localStorage.getItem('user') ]
					
						// 				setDoc(doc(db, "UCH", "appointments", "days", pickedDate, "times", timeSelected), dateDetails)
						// 				.then(() => console.log('Push successful'))
						// 				.catch(() => console.log('There was a problem'))
						// 			}
	
						// 			addNew()
		
						// 	}
		
						// 	postData()
						// 	// console.log('Document not found. Add new one.');
						// 	// // isExist = false
						// 	// setDocExist(false)
						// 	// prevUsers = []
						// }

						
					// }

					// getData()


					// let pickedDate = dateSelected + '/' + (new Date().getMonth() + 1) + '/' + new Date().getFullYear()

					// let dateDetails = {}
					// let data = {}
					// data[timeSelected] = [ ...prevUsers, localStorage.getItem('user') ]
					// dateDetails[pickedDate] = data

				}}>
					Book Appointment <ArrowForwardIosRounded fontSize='small' />
				</button>
			</div>
		</>
	)
}

export default Schedules