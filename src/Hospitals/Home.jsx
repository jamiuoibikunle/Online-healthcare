import styles from './Home.module.css'

import React from 'react'
import { AccountBalanceWalletRounded ,PersonRounded, LocationOn, HelpOutlined, ForumRounded, CallRounded, SendRounded, DeleteRounded } from '@material-ui/icons'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    const navigate = useNavigate()

  return (
	<div className={styles.wrapper}>
	  {/* <div className={styles.underdevelopment}>
		This page is under development
	  </div> */}
		<section className={styles.welcome}>
			Hello, Elijah
		</section>
		<section className={styles.list}>
			<div>
				<PersonRounded /> Home
			</div>
			{/* <div onClick={() => navigate('/Home/address')}>
				<LocationOn /> Address
			</div> */}
			<div>
				<HelpOutlined /> About us
			</div>
			<div>
				<ForumRounded /> Feedback
			</div>
			{/* <div>
				<AccountBalanceWalletRounded /> Donate
			</div> */}
			<div onClick={() => {
                localStorage.clear();
                window.location.reload()
            }}>
				<DeleteRounded /> Sign out
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
		{/* <section className={styles.logout}>
			<button>
				Log out
			</button>
		</section> */}
	</div>
  )
}

export default Home