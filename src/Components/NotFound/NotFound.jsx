import React from 'react'
import styles from './NotFound.module.css'
import ErrorImage from './404.svg'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className={styles.container}>
      <div className={styles.image}>
        <img src={ErrorImage} alt='Page not found' className={styles.notfound} />
      </div>
      <div className={styles.back}>
        <Link to='/' className={styles.link}>
          Back to homepage
        </Link>
      </div>
    </main>
  )
}

export default NotFound