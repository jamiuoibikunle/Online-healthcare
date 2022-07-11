import styles from './Profile.module.css'

import React from 'react'
import { PersonRounded, LocationOn, HelpOutlined, ForumRounded, CallRounded, SendRounded } from '@material-ui/icons'

const Profile = () => {
  return (
	<div className={styles.wrapper}>
	  {/* <div className={styles.underdevelopment}>
		This page is under development
	  </div> */}
		<section className={styles.welcome}>
			Hello, User
		</section>
		<section className={styles.list}>
			<div>
				<PersonRounded /> Profile
			</div>
			<div>
				<LocationOn /> Address
			</div>
			<div>
				<HelpOutlined /> About us
			</div>
			<div>
				<ForumRounded /> Feedback
			</div>
		</section>
		<section>
			<div className={styles.support}>
				Support
			<div className={styles.supportText}>
				Let us know if you have any problems with this service
			</div>
			<div className={styles.chatcall}>
				<div className={styles.chat}>
					<SendRounded className={styles.icons} /> Chat
			</div>
				<div className={styles.chat}>
					<CallRounded className={styles.icons} /> Call
			</div>
			</div>
			</div>
		</section>
		<section className={styles.logout}>
			<button>
				Log out
			</button>
		</section>
	</div>
  )
}

export default Profile