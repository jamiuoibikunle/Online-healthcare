import { TodayRounded, ChatBubbleRounded, HomeRounded, SearchRounded, PersonRounded, VpnKeyRounded, Settings, Feedback, ForumRounded } from '@material-ui/icons'
import styles from './Navigation.module.css'

import React from 'react'
import {  NavLink } from 'react-router-dom'

const Navigation = () => {

  const user = localStorage.getItem('user')
  const doctor = localStorage.getItem('doctor')
  const clinic = localStorage.getItem('clinic')

  if (user) {
      
      return (
        <div className={styles.nav}>
        <NavLink to='/' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
            <HomeRounded />
        </NavLink>
        <NavLink to='/appointments' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
            <TodayRounded  />
        </NavLink>
        <NavLink to='/discover' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
            <SearchRounded  />
        </NavLink>
        <NavLink to='/chats' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
            <ChatBubbleRounded  />
        </NavLink>
        <NavLink to='/profile' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
            <PersonRounded  />
        </NavLink>
    </div>
  )
} else if (clinic) {
    return (
      <div className={styles.nav}>
      <NavLink to='/clinic/appointments' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
          <TodayRounded  />
      </NavLink>
      <NavLink to='/clinic/profile' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
          <PersonRounded  />
      </NavLink>
      <NavLink to='/clinic/settings' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
          <Settings />
      </NavLink>
  </div>
)} else if (doctor) {
    return (
      <div className={styles.nav}>
      <NavLink to='/doctor/discover' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
          <SearchRounded  />
      </NavLink>
      <NavLink to='/doctor/chats' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
          <ChatBubbleRounded  />
      </NavLink>
      <NavLink to='/doctor/profile' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
          <PersonRounded  />
      </NavLink>
      {/* <NavLink to='/doctor/settings' className={({ isActive }) => (isActive) ? styles.active : styles.inactive}>
          <Settings  />
      </NavLink> */}
  </div>
    )
}
  
}

export default Navigation