import styles from './train-information.module.css'

export default function TrainInfoBox({ data }) {
  const trainName = data.trainName
  const walkingTime = data.walkingTime
  const iconColor1 = data.iconColor1
  const iconColor2 = data.iconColor2

  return (
    <div className={styles.infoBox}>
      <div className={styles.icon}>
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="16" height="16" rx="5" stroke={iconColor1} stroke-width="2" />
          <rect x="5" y="5" width="8" height="8" rx="1" fill={iconColor2} />
        </svg>
      </div>
      <span className={styles.trainName}>{trainName}</span>
      <span className={styles.timeTableLink}>時刻表↗</span>
      <span className={styles.walkingTime}>
        徒歩約
        <span className={styles.emph}>{walkingTime}</span>
        分
      </span>
      <span className={styles.routeLink}>経路↗</span>

    </div>
  )
}
