import { Column_element } from './timetable-column-element.jsx'
import { Column_heading } from './timetable-column-heading.jsx'
import { Column_detailsElement } from './timetable-column-details-element.jsx'
import { Column_detailsHeading } from './timetable-column-details-heading.jsx'
import styles from './timetable-column-styles.module.css'

function timeToIndex(time_string) {
  const [hour, minute] = time_string.split(':').map(Number)
  return (hour - 10) * 12 + Math.round(minute / 5) + 1
}

export function TimetableColumn({ programsInfo, index }) {
  const element_contents = programsInfo.timetable.map(
    (x, index_) => (
      <Column_element
        key={`columnEl_${index_}`}
        timetable={x}
        startIndex={timeToIndex(x.start)}
        endIndex={timeToIndex(x.end)}
      />
    ),
  )
  const element_detailsContents = programsInfo.timetable.map(
    (x, index_) => (
      <Column_detailsElement
        key={`columnDetailEl_${index_}`}
        timetable={x}
        startIndex={timeToIndex(x.start)}
        endIndex={timeToIndex(x.end)}
      />
    ))
  const line_1hour = Array.from({ length: 6 }).map(
    (_, index_) => (
      <div
        key={`line1hour_${index_}`}
        className={`${styles.line_1hour} line_1hour`}
        style={{ 'grid-row': `${1 + 12 * index_} / ${1 + 12 * index_}` }}
      >
      </div>
    ))

  return (
    <div
      id={`program_${index}`}
      className={`${styles.column} ${[styles.even, styles.odd][index % 2]} ${['even', 'odd'][index % 2]} closed_inTimetable timetable_column`}
    >
      <div className={styles.column_main}>
        <Column_heading programsInfo={programsInfo} index={index} />
        <div className={styles.timeBoard}>
          <p className={styles.startTime}>10:00</p>
          <p className={styles.endTime}>15:00</p>
          {line_1hour}
          {element_contents}
        </div>
      </div>
      <div className={`${styles.column_details} detailsColumn`}>
        <div className={styles.details_background}>
          <Column_detailsHeading programsInfo={programsInfo} index={index} />
          <div className={styles.timeBoard}>
            {element_detailsContents}
          </div>
        </div>
      </div>
    </div>
  )
}
