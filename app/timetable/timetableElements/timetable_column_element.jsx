import styles from "./timetable_column_elementStyles.module.css";

export function Column_element({content, startIndex, endIndex}){
    const gridStyle = {
        'grid-row':`${startIndex} / ${endIndex}`
    }
    return(
        <div style={gridStyle} className={styles.columnElement}>{content}</div>
    )
}