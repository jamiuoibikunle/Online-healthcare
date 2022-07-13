import React, { useContext } from 'react'
import styles from './Doctor.module.css'
import { MailRounded, PersonRounded, Settings, DeleteRounded } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import { CircularProgress } from '@material-ui/core'
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const DoctorHome = () => {

    const context = useContext(AppContext)

    const navigate = useNavigate()

    const getName = async () => {
        
        const doctor = localStorage.getItem('doctor')
		const docRef = doc(db, "doctors", doctor);
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
        <main className={styles.doctorwrapper}>
            <header>
                Dashboard
            </header>
            <section className={styles.welcome}>
                <div>
                    Welcome Dr {context.userDetails.name}!
                </div>
                <div className={styles.keeptrack}>
                    Connect easier and faster with your patients here.
                </div>
            </section>
            <section className={styles.main}>
                <div onClick={() => navigate('/doctor/chats')}>
                    <MailRounded /> Messages
                </div>
                <div onClick={() => navigate('/doctor/profile')}>
                    <PersonRounded /> Profile
                </div>
                <div>
                    <Settings /> Settings
                </div>
                <div onClick={() => {
                    localStorage.clear()
                    window.location.reload()
                }}>
                    <DeleteRounded /> Logout
                </div>
            </section>
        </main>
  ) : (
    <CircularProgress className={styles.progress} />
  )
}

export default DoctorHome