import avatar from './1.png'
import styles from './Discover.module.css'

import React, { useEffect, useState } from 'react'
import { CallRounded, Telegram } from '@material-ui/icons'
import { collection, doc, getDocs } from 'firebase/firestore'
import { db } from '../../firebase'
import { CircularProgress } from '@material-ui/core'

const Discover = () => {

    const [ doctors, setDoctors ] = useState([])

    console.log(doctors);
    

    useEffect(() => {

        const getDoctors = async () => {
            const querySnapshot = await getDocs(collection(db, "doctors"));
            querySnapshot.forEach((doc) => {
            if ( doctors.find(val => val.id === doc.id) ) return
            setDoctors(doctors => [ ...doctors, { id: doc.id, name: doc.data().name, address: doc.data().address } ])
            })}
        
        getDoctors()


    }, [])

    return doctors.length !== 0 ? (
        <div className={styles.wrapper}>
            <header>
                Doctors ready to help
            </header>
            <section className={styles.list}>
                {
                    doctors.map((doctor) => (

                        <div className={styles.individual}>
                    <img src={doctor.profilepic || avatar} />
                    <div className={styles.center}>
                        <div className={styles.name}>
                            Dr {doctor.name}
                        </div>
                        {/* <div className={styles.specialty}>
                            
                        </div> */}
                        <div className={styles.almamater}>
                            {doctor.address || ''}
                        </div>
                    </div>
                    <div className={styles.clinic}>
                        <Telegram />
                    </div>
                </div>
                ))}

            </section>
	    </div>
  ) : (
    <CircularProgress className={styles.progress} />
  )
}

export default Discover