import avatar from './1.png'
import styles from './Discover.module.css'

import React from 'react'
import { CallRounded, Telegram } from '@material-ui/icons'

const Discover = () => {
    return (
        <div className={styles.wrapper}>
	        {/* <div className={styles.underdevelopment}>
		    This page is under development
	    </div> */}
            <header>
                Doctors ready to help
            </header>
            <section className={styles.list}>
                <div className={styles.individual}>

                    <img src={avatar} />
                    <div className={styles.center}>
                        <div className={styles.name}>
                            Dr Haller
                        </div>
                        <div className={styles.specialty}>
                            Cardiologist
                        </div>
                        <div className={styles.almamater}>
                            MD, University of Ibadan
                        </div>
                    </div>
                    <div className={styles.clinic}>
                        <Telegram />
                    </div>

                </div>
                <div className={styles.individual}>

                    <img src={avatar} />
                    <div className={styles.center}>
                        <div className={styles.name}>
                            Dr Haller
                        </div>
                        <div className={styles.specialty}>
                            Cardiologist
                        </div>
                        <div className={styles.almamater}>
                            MD, University of Ibadan
                        </div>
                    </div>
                    <div className={styles.clinic}>
                        <Telegram />
                    </div>

                </div>
                <div className={styles.individual}>

                    <img src={avatar} />
                    <div className={styles.center}>
                        <div className={styles.name}>
                            Dr Haller
                        </div>
                        <div className={styles.specialty}>
                            Cardiologist
                        </div>
                        <div className={styles.almamater}>
                            MD, University of Ibadan
                        </div>
                    </div>
                    <div className={styles.clinic}>
                        <Telegram />
                    </div>

                </div>
                <div className={styles.individual}>

                    <img src={avatar} />
                    <div className={styles.center}>
                        <div className={styles.name}>
                            Dr Haller
                        </div>
                        <div className={styles.specialty}>
                            Cardiologist
                        </div>
                        <div className={styles.almamater}>
                            MD, University of Ibadan
                        </div>
                    </div>
                    <div className={styles.clinic}>
                        <Telegram />
                    </div>

                </div>
                <div className={styles.individual}>

                    <img src={avatar} />
                    <div className={styles.center}>
                        <div className={styles.name}>
                            Dr Haller
                        </div>
                        <div className={styles.specialty}>
                            Cardiologist
                        </div>
                        <div className={styles.almamater}>
                            MD, University of Ibadan
                        </div>
                    </div>
                    <div className={styles.clinic}>
                        <Telegram />
                    </div>

                </div>
                <div className={styles.individual}>

                    <img src={avatar} />
                    <div className={styles.center}>
                        <div className={styles.name}>
                            Dr Haller
                        </div>
                        <div className={styles.specialty}>
                            Cardiologist
                        </div>
                        <div className={styles.almamater}>
                            MD, University of Ibadan
                        </div>
                    </div>
                    <div className={styles.clinic}>
                        <Telegram />
                    </div>

                </div>
                <div className={styles.individual}>

                    <img src={avatar} />
                    <div className={styles.center}>
                        <div className={styles.name}>
                            Dr Haller
                        </div>
                        <div className={styles.specialty}>
                            Cardiologist
                        </div>
                        <div className={styles.almamater}>
                            MD, University of Ibadan
                        </div>
                    </div>
                    <div className={styles.clinic}>
                        <Telegram />
                    </div>

                </div>
                <div className={styles.individual}>

                    <img src={avatar} />
                    <div className={styles.center}>
                        <div className={styles.name}>
                            Dr Haller
                        </div>
                        <div className={styles.specialty}>
                            Cardiologist
                        </div>
                        <div className={styles.almamater}>
                            MD, University of Ibadan
                        </div>
                    </div>
                    <div className={styles.clinic}>
                        <Telegram />
                    </div>

                </div>
            </section>
	    </div>
  )
}

export default Discover