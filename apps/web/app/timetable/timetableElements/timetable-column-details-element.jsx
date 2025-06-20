import styles from './timetable-column-details-element-styles.module.css'

export function Column_detailsElement({ timetable, startIndex, endIndex }) {
  const gridStyle = {
    'grid-row': `${startIndex} / ${endIndex}`,
  }
  const type = timetable.type
  let content
  if (type == 'event') {
    content
            = (
        <div style={gridStyle} className={`${styles.Column_detailsElement} `}>
          <p className={styles.name_text}>{timetable.name}</p>
          {timetable.description == ''
            ? ''
            : <p className={styles.explanation_text}>{timetable.description}</p>}
          <p className={styles.place_text}>{`@${timetable.location}`}</p>
        </div>
      )
  }
  else if (type == 'ticketDistribution') {
    content
            = (
        <div
          style={gridStyle}
          className={`
                    ${styles.Column_detailsElement} 
                    ${timetable.start == '10:00' ? styles.up : ''}`}
        >
          <p className={styles.name_text}>{timetable.name}</p>
          <p className={styles.explanation_text}>{`${timetable.start}～${timetable.end}`}</p>
          <p className={styles.explanation_text}>{timetable.description}</p>
          <p className={styles.place_text}>{`@${timetable.location}`}</p>
        </div>
      )
  }

  return (content)
}
