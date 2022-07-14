import React, { useContext, useEffect, useState } from 'react'
import styles from './Doctor.module.css'
import { Telegram } from '@material-ui/icons'
import { AppContext } from '../App'
import { CircularProgress } from '@material-ui/core'
import { db } from '../firebase'
import { doc, getDoc, collection, getDocs } from 'firebase/firestore'
import avatar from './avatar.jpg'

import { useNavigate } from 'react-router-dom'

const Discover = () => {

    const context = useContext(AppContext)

    const [ users, setUsers ] = useState([])

    const navigate = useNavigate()

    const getUsers = async () => {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
        if ( users.find(val => val.id === doc.id) ) return
        setUsers(users => [ ...users, { id: doc.id, name: doc.data().name, address: doc.data().address, profilepic: doc.data().profilepic } ])
        })}
    
    getUsers()

    return users.length !== 0 ? (
        <main className={styles.doctorwrapper}>
            <section className={styles.welcome}>
                <div>
                    Welcome Back!
                </div>
                <div className={styles.keeptrack}>
                    Connect easier and faster with your patients here.
                </div>
            </section>
            <section className={styles.list}>
                {
                    users.map((each) => {

                        const linkToChat = JSON.stringify([ each.id, localStorage.getItem('doctor') ])
                        console.log(linkToChat);

                        return (
                        <div className={styles.individual} key={each.id} onClick={() => navigate('/doctor/chats/' + linkToChat)}>
                            <img src={each.profilepic || avatar} />
                            <div className={styles.center}>
                            <div className={styles.name}>
                                {each.name || ''}
                            </div>
                            <div className={styles.specialty}>
                                {each.address || ''}
                            </div>
                        </div>
                        <div className={styles.clinic}>
                            <Telegram />
                        </div>
                    </div>
                    )})
            }
            </section>
        </main>
  ) : (
    <CircularProgress className={styles.progress} />
  )
}

export default Discover