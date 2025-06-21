import styles from './timetable-toggle-button-styles.module.css'
import { MdAutorenew } from 'react-icons/md'
/** Day1とDay2をトグルして選択できるボタン
 * @param {number} DAY"n"のn
 * @returns {JSX.Element}
*/
export function ToggleButton({ day, onClick }) {
  const text = ['Day1 - 9/6', 'Day2 - 9/7'][Number(day) - 1]
  return (
    <button className={`touchable ${styles.button}`} onClick={onClick}>
      <MdAutorenew className={styles.icon} />
      {' '}
      {text}
    </button>
  )
}
