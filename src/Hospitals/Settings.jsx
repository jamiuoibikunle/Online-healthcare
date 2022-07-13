import styles from './Clinic.module.css'

import React, { useContext, useEffect } from 'react'
import { PersonRounded, ForumRounded, CallRounded, SendRounded, DeleteRounded, CalendarTodayRounded, ChatBubbleRounded, Telegram } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { CircularProgress } from '@material-ui/core'

const ClinicSettings = () => {

    const navigate = useNavigate()

    const context = useContext(AppContext)
    
    const clinic = localStorage.getItem('clinic')

    const getName = async () => {
	
		const docRef = doc(db, "clinics", clinic);
		const docSnap = await getDoc(docRef);
	
		if (docSnap.exists()) {
            context.setUserDetails(docSnap.data())
		} else {
            localStorage.clear()
            window.location.reload()
		}
	}

    getName()

  return context.userDetails ? (
	<div className={styles.homewrapper}>
        <section className={styles.footer}>
			<div className={styles.support}>
				Support
			<div className={styles.supportText}>
				Let us know if you have any problems with this service
			</div>
            </div>
		</section>

		<section className={styles.list}>
			<div onClick={() => {
                window.location.replace('mailto:jamiuoibikunle@gmail.com?subject=Feedback%20About%20BooQiT&body=Your%20message')
            }}>
				<ForumRounded /> Feedback
			</div>
			<div onClick={() => window.location.replace('https://wa.me/2349068098720')}>
				<Telegram /> Chat
			</div>
			<div onClick={() => window.location.replace('tel:+2349068098720')}>
				<CallRounded /> Call
			</div>
			<div onClick={() => {
                localStorage.clear();
                window.location.reload()
            }}>
				<DeleteRounded /> Sign out
			</div>
		</section>
	</div>
  ) 
  : (
    <CircularProgress className={styles.progress} />
)
}

export default ClinicSettings