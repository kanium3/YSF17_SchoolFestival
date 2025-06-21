import styles from './timetable-column-details-heading-styles.module.css'
import { MdArrowForwardIos, MdKeyboardDoubleArrowLeft } from 'react-icons/md'

export function Column_detailsHeading({ _programsInfo, index }) {
  const close_detail = () => {
    const column = document.querySelector(`#program_${index}`)
    column.classList.toggle('closed_inTimetable')
  }
  return (
    <div className={styles.headingBoard}>
      <p className={styles.detail_title}>詳細</p>
      <button className={`${styles.individualPage} touchable`}>
        企画ページ
        <MdArrowForwardIos className={styles.icons} />
      </button>
      <button className={styles.closeButton} onClick={close_detail}>
        閉じる
        <MdKeyboardDoubleArrowLeft className={styles.icons} />
      </button>
    </div>
  )
}
