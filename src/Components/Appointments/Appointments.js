import React, { useState, useEffect } from 'react'
import styles from './Appointments.module.css'
import Demography from './Demography'
import Info from './Info'
import Schedules from './Schedules'
import Time from './Time'
import { ArrowForwardIosRounded } from '@material-ui/icons'
import ListSchedules from './ListSchedules'
// import { collection, getDocs } from "firebase/firestore"; 
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from '../../firebase'
import { getApp } from 'firebase/app'

const Appointments = () => {

  const [ step, setStep ] = useState(1)
  const [ appointments, setAppointments ] = useState([])
  const user = localStorage.getItem('user')

  const getAppointments = async () => {

      const querySnapshot = await getDocs(collection(db, "users", localStorage.getItem('user'), "appointments"));
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        
        const docID = doc.id.replaceAll('|', '/')
        if (appointments.includes(docID)) return 
        setAppointments(appointments => [ ...appointments, { date: docID, time: doc.data().time } ])
      });
    
    // const docRef = doc(db, "users", user);
    // const docSnap = await getDoc(docRef);
  
    // if (docSnap.exists()) {
    //   const data = docSnap.data()

    //   data.appointments !== undefined && setAppointments(data.appointments)
    //   data.appointments === undefined && setAppointments([])
    // } else {
    //   // setAppointments([])
    // }

  }

  useEffect(() => {
    getAppointments()
  }, [ user ])

  const GoForward = () => {
    setStep(2)
  }

  const GoBack = () => {
    setStep(1)
  }

  return step === 1 ? (
    <main className={styles.wrapper}>
      <ListSchedules GoForward={GoForward} appointments={appointments} />
    </main>
  ) : (
    <main className={styles.wrapper}>
      <Info GoBack={GoBack} />
      <Demography />
      <Schedules />
    </main>
  )
}

export default Appointments