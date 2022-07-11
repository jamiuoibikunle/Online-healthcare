import React from 'react'
import styles from './Appointments.module.css'

const Time = () => {
  return (
    <main className={styles.choosetime}>
      <header>
        Choose time
      </header>
      <section className={styles.times}>
        <div className={styles.time} tabIndex='1'>
          <div className={styles.timefigure}>
            09:00 am
          </div>
        </div>
        <div className={styles.time} tabIndex='1'>
          <div className={styles.timefigure}>
            10:00 am
          </div>
        </div>
        <div className={styles.time} tabIndex='1'>
          <div className={styles.timefigure}>
            11:00 am
          </div>
        </div>
        <div className={styles.time} tabIndex='1'>
          <div className={styles.timefigure}>
            11:00 pm
          </div>
        </div>
        <div className={styles.time} tabIndex='1'>
          <div className={styles.timefigure}>
            01:00 pm
          </div>
        </div>
        <div className={styles.time} tabIndex='1'>
          <div className={styles.timefigure}>
            02:00 pm
          </div>
        </div>
        <div className={styles.time} tabIndex='1'>
          <div className={styles.timefigure}>
            03:00 pm
          </div>
        </div>
        <div className={styles.time} tabIndex='1'>
          <div className={styles.timefigure}>
            04:00 pm
          </div>
        </div>
      </section>
    </main>
  )
}

export default Time