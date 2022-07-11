import React from 'react'
import styles from './Appointments.module.css'

const Demography = () => {
  return (
    <main className={styles.demographywrapper}>
      <header className={styles.demographyheader}>
        Demography
      </header>
      <div className={styles.demographytext}>
        The University College Hospital, Ibadan is a federal teaching hospital in Ibadan, Nigeria. The hospital is attached to the University of Ibadan.
        UCH was established by an August 1952 Act of Parliament in response to the need for the trainign of medical personnel in the country.
      </div>
    </main>
  )
}

export default Demography