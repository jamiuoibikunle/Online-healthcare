import styles from './Doctor.module.css'
import avatar from './avatar.jpg'
import { ArrowBackIosRounded, ArrowBack, Telegram } from '@material-ui/icons'

import React from 'react'
import { useNavigate } from 'react-router-dom'

const DoctorChats = () => {

    const navigate = useNavigate()

  return (
    <main className={styles.chatswrapper}>
        <header className={styles.header}>
            <ArrowBack onClick={() => navigate('/doctor')} />
            <img src={avatar} className={styles.avatar} />
            Abarahamovic
        </header>
        <section className={styles.messages}>
            <div className={styles.messagebox}>
                Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble} />
            </div>
            <div className={styles.messagebox}>
                Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble} />
            </div>
            <div className={styles.messagebox}>
                Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble} />
            </div>
            <div className={styles.messagebox}>
                Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble} />
            </div>
            <div className={styles.messagebox + ' ' + styles.me}>
                Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble + ' ' + styles.alt} />
            </div>
            <div className={styles.messagebox}>
                Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble} />
            </div>
            <div className={styles.messagebox}>
                Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble} />
            </div>
            <div className={styles.messagebox}>
                Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble} />
            </div>
            <div className={styles.messagebox}>
                Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble} />
            </div>
            <div className={styles.messagebox}>
                Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble} />
            </div>
            <div className={styles.messagebox + ' ' + styles.me}>
                Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah Heyy heyeheyehhahahahah
                <div>
                    09:22 AM
                </div>
                <div className={styles.bubble + ' ' + styles.alt} />
            </div>
        </section>
        <section className={styles.inputfield}>
            <textarea />
            <button>
                <Telegram />
            </button>
        </section>
    </main>
  )
}

export default DoctorChats