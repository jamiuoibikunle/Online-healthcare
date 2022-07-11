import { TodayRounded, ChatBubbleRounded, HomeRounded, SearchRounded, PersonRounded, VpnKeyRounded } from '@material-ui/icons'
import styles from './Navigation.module.css'

import React from 'react'
import {  NavLink } from 'react-router-dom'

const Navigation = () => {

  const user = localStorage.getItem('user')

  return user && (
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
}

export default Navigation