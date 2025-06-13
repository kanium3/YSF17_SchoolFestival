import styles from "./timetable_column_detailsElementStyles.module.css";

export function Column_detailsElement({programsDetail, startIndex, endIndex}){
    const gridStyle = {
        'grid-row':`${startIndex} / ${endIndex}`
    }
    return(
        <div style={gridStyle}>
            <p className={styles.explanation_text}>{programsDetail.explanation}</p>
            <p className={styles.place_text}>{`@${programsDetail.place}`}</p>
        </div>
    )
}