import { ArrowBackIosRounded, LocationOnRounded } from '@material-ui/icons'
// import { useNavigate } from 'react-router-dom'
import UCH from '../Resources/UCH.jpg'
import styles from './Appointments.module.css'

const Info = ({ GoBack }) => {

  // const navigate = useNavigate()
  // const handleBack = () => { navigate(-1)}

  return (
    <main>
      <section className={styles.arrowback}>
        <ArrowBackIosRounded onClick={GoBack} style={{ color: 'grey' }} />
      </section>
      <section className={styles.container}>
        <section className={styles.topwrapper}>
            <img src={UCH} alt='UCH' className={styles.image} />
          <aside className={styles.detailswrapper}>
            <div className={styles.name}>
              University College Hospital
            </div>
            <div className={styles.department}>
              Neurology
            </div>
            <div className={styles.city}>
            <LocationOnRounded fontSize='small' /> Ibadan, Nigeria
            </div>
          </aside>
        </section>
        <section className={styles.info}>
          <div>
            <div className={styles.figure}>
              0
            </div>
            <div className={styles.title}>
              Reviews
            </div>
          </div>
          <div>
            <div className={styles.figure}>
              1952
            </div>
            <div className={styles.title}>
              Founded
            </div>
          </div>
          <div>
            <div className={styles.figure}>
              300
            </div>
            <div className={styles.title}>
              patients/day
            </div>
          </div>
        </section>
      </section>
      
    </main>
  )
}

export default Info