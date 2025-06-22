import { TimetableColumn } from './timetable-column.jsx'
import programsData_day1 from './programsData/programsData_day1.json'
import programsData_day2 from './programsData/programsData_day2.json'
import styles from './timetable-styles.module.css'

export function Timetable({ day }) {
  const program_items = [programsData_day1, programsData_day2][day - 1].map(
    (x, index) =>
      <TimetableColumn key={`timetableColumn_${index}`} programsInfo={x} index={index} />)
  return (
    <div className={`${styles.programContent}`}>
      {program_items}
    </div>
  )
}
