import styles from './timetable-toggle-button-styles.module.css'
import { MdAutorenew } from 'react-icons/md'
/** Day1とDay2をトグルして選択できるボタン
 * @param {number} DAY"n"のn
 * @returns {JSX.Element}
*/
export function ToggleButton({ day, onClick }) {
  return (
    <>
      <button className={`touchable ${styles.button}`} style={day == 1 ? {} : { display: 'none' }} onClick={onClick}>
        <div className={`${styles.text11}`}>
          <div className={styles.background_left1}></div>
          <div className={styles.background_left2}></div>
          <div style={{ position: 'relative', zIndex: 10 }}>DAY1 - 9/6</div>
        </div>
        <div className={`${styles.text12}`}>DAY2 - 9/7</div>
      </button>
      <button className={`touchable ${styles.button}`} style={day == 2 ? {} : { display: 'none' }} onClick={onClick}>
        <div className={`${styles.text21}`}>DAY1 - 9/6</div>
        <div className={`${styles.text22}`}>
          <div className={styles.background_right1}></div>
          <div className={styles.background_right2}></div>
          <div style={{ position: 'relative', zIndex: 10 }}>DAY2 - 9/7</div>
        </div>
      </button>
    </>
  )
}
