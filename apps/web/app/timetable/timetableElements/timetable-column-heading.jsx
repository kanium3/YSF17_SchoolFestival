import styles from './timetable-column-heading-styles.module.css'

export function Column_heading({ programsInfo, index }) {
  const open_detail = () => {
    const column = document.querySelector(`#program_${index}`)
    column.classList.toggle('closed_inTimetable')
  }
  return (
    <div className={styles.headingBoard}>
      <p className={styles.teamName}>{programsInfo.team}</p>
      <p className={styles.summary}>{programsInfo.summary}</p>
      <p className={styles.extraInfo}>
        #
        {programsInfo.hashtag}
      </p>
      <button className={`${styles.expandButton} open_button`} onClick={open_detail}>詳細≫</button>
    </div>
  )
}
