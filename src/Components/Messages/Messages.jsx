import styles from './Messages.module.css'
import avatar from './avatar.png'
import { SearchRounded } from '@material-ui/icons'

import React from 'react'

const Messages = () => {
    return (
	    <div className={styles.wrapper}>
            {/* <div className={styles.underdevelopment}>
                This page is under development
            </div> */}
        <div className={styles.search}>
            <input placeholder='Search message' />
            <SearchRounded className={styles.searchicon} />
        </div>
        <section className={styles.messages}>
            
            <div className={styles.individual}>

                <img src={avatar} />
                <div className={styles.center}>
                    <div className={styles.name}>
                        Sebastian Rudiger
                    </div>
                    <div className={styles.lastmessage}>
                        What do you think eh?
                    </div>
                </div>
                <div className={styles.time}>
                    09:25 PM
                </div>

            </div>

            <div className={styles.individual}>

                <img src={avatar} />
                <div className={styles.center}>
                    <div className={styles.name}>
                        Ngozi Affar
                    </div>
                    <div className={styles.lastmessage}>
                        All right have a great...
                    </div>
                </div>
                <div className={styles.time}>
                    12:00 PM
                </div>

            </div>

            <div className={styles.individual}>

                <img src={avatar} />
                <div className={styles.center}>
                    <div className={styles.name}>
                        Dr Ramsak
                    </div>
                    <div className={styles.lastmessage}>
                        Saving lives bring me joy
                    </div>
                </div>
                <div className={styles.time}>
                    09:25 PM
                </div>

            </div>

            <div className={styles.individual}>

                <img src={avatar} />
                <div className={styles.center}>
                    <div className={styles.name}>
                        Dr Sebastian Rudiger
                    </div>
                    <div className={styles.lastmessage}>
                        How high is your temp...
                    </div>
                </div>
                <div className={styles.time}>
                    09:25 PM
                </div>

            </div>

            <div className={styles.individual}>

                <img src={avatar} />
                <div className={styles.center}>
                    <div className={styles.name}>
                        Dr Rudiger
                    </div>
                    <div className={styles.lastmessage}>
                        Im glad you feel fine now
                    </div>
                </div>
                <div className={styles.time}>
                    09:25 PM
                </div>

            </div>

            <div className={styles.individual}>

                <img src={avatar} />
                <div className={styles.center}>
                    <div className={styles.name}>
                        Mohammed Arnold MD
                    </div>
                    <div className={styles.lastmessage}>
                        That's great then
                    </div>
                </div>
                <div className={styles.time}>
                    11:25 AM
                </div>

            </div>

            <div className={styles.individual}>

                <img src={avatar} />
                <div className={styles.center}>
                    <div className={styles.name}>
                        Dr Caroline Varsaha
                    </div>
                    <div className={styles.lastmessage}>
                        Thanks doc!
                    </div>
                </div>
                <div className={styles.time}>
                    03:10 PM
                </div>

            </div>

        </section>
        </div>
  )
}

export default Messages