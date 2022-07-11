import React from 'react'
import styles from './Appointments.module.css'
import { AccessTimeRounded, DateRangeRounded } from '@material-ui/icons'
import { CircularProgress } from '@material-ui/core';

const List = ({ GoForward, appointments }) => {
	return appointments.length !== 0 ? (
		<main className={styles.listwrapper}>
		<header className={styles.listheader}>
			Upcoming Appointments
			</header>
			{
				appointments.map((each, index) => (
			<section className={styles.eachschedule} key={index}>
			<div className={styles.hospital}>
			  {/* {each.hospital} */}
				University College Hospital
			</div>
			<div className={styles.department}>
			{/* {each.department} */}
			Gynaecology
			</div>
			<section className={styles.timeinfo}>
			  <div className={styles.eachtimeinfo}>
				<DateRangeRounded color='inherit' /> {each.date}
			  </div>
			  <div className={styles.eachtimeinfo}>
				  <AccessTimeRounded color='inherit' /> {each.time}
			  </div>
			</section>
		  </section>
		  ))
		  }
	
		  <div className={styles.newappointment}>
			<button onClick={GoForward}>
			  New Appointment
			</button>
		  </div>
		</main> 
	) : (
		<main className={styles.noappointment}>
			<div className={styles.department}>
				You haven't made an appointment yet.
			</div>
		  <div className={styles.newappointment}>
			<button onClick={GoForward}>
			  New Appointment
			</button>
		  </div>
		</main>
	)
}

const ListSchedules = ({ GoForward, appointments }) => {
  return appointments ? (
	<List GoForward={GoForward} appointments={appointments} />
	) : (
	<div>
		<CircularProgress className={styles.progress} />
	</div>
  )
}

export default ListSchedules