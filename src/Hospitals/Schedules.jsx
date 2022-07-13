import { CircularProgress } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../App'
import { db } from '../firebase'

import styles from './Clinic.module.css'
import avatar from './profile.jpg'

const ClinicSchedules = () => {

    const context = useContext(AppContext)

    const navigate = useNavigate()

    const [ appointments, setAppointments ] = useState([])
    const [ iterable, setIterable ] = useState([])
    const [ render, setRender ] = useState(false)

    console.log(context.userDetails);

    useEffect(() => {

        
        const getAppointments = async () => {
            
            const name = context.userDetails.name
            const dt = new Date()
            const day = dt.getDate()
            const month = dt.getMonth() + 1
            const year = dt.getFullYear()
            const date = day + '|' + month + '|' + year

            const querySnapshot = await getDocs(collection(db, "University College Hospital", "appointments", "days", date, "times"));
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots

              console.log(doc.data());
              setAppointments(appointments => [ ...appointments, doc.data() ])
            //   setAppointments([ ...appointments, { time: doc.id, users: doc.data() } ])
              
            //   const docID = doc.id.replaceAll('|', '/')
            //   if (appointments.includes(docID)) return 
            //   setAppointments(appointments => [ ...appointments, { date: docID, time: doc.data().time } ])
        });
        
    }
    
        context.userDetails && getAppointments()

    }, [])

    console.log(appointments);
    
    
    useEffect(() => {

        try {

            if (iterable.length === 0) {
                appointments.map((val) => {
                    Object.entries(val).forEach(([ key, value ]) => {
        
                        value.map( async (each) => {
        
                            const docRef = doc(db, "users", each);
                            const docSnap = await getDoc(docRef);
                            
                            if (docSnap.exists()) {
                                let position = value.indexOf(each)
                                value[position] = docSnap.data()
                                setIterable(iterable => [ ...iterable, { time: key, user: docSnap.data() } ])
                            } else {
                                // doc.data() will be undefined in this case
                                console.log("No such document!");
                            }
                        })
        
                        // console.log(key, value);
        
                        // value.map((element) => {
                        //     setIterable(iterable => [ ...iterable, { time: key, user: element } ])
                        // })                    
        
                        // // console.log(key, value);
                        // setIterable(iterable => [ ...iterable, { time: key, users: value } ])
                    })
                })
            }

            setRender(true)
            
        } catch (error) {

            setRender(false)
            navigate('/clinic')
            
        }
        

    }, [appointments])

    console.log(iterable);

  return render ? (
    <main className={styles.scheduleswrapper}>
        <header className={styles.clinicname}>
            <ArrowBack onClick={() => navigate('/clinic')} /> {context.userDetails && context.userDetails.name}
        </header>
        <section className={styles.listofappointments}>

        <div className={styles.today}>
            Appointments for today
        </div>
            
        {iterable.map((time) => {

            return (

            <main>
                <div>
                    <div className={styles.eachuser} >
                        <img src={time.user.profilepic || avatar} className={styles.schedulesavatar} />
                            <div className={styles.nameofuser}>
                                    {time.user.name}
                                <div className={styles.useremail}>
                                    {time.user.email}
                                </div>
                            </div>
                            <div className={styles.fixedtime}>
                                {time.time}
                            </div>
                    </div>
                </div>
            </main>
            
            )
            })}
            </section>

    </main>
  ) : (
    <CircularProgress className={styles.progress} />
  )
}

export default ClinicSchedules