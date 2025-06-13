import styles from "./timetable_column_detailsHeadingStyles.module.css";

export function Column_detailsHeading({programsInfo, index}){
    const close_detail = ()=>{
        const column = document.getElementById(`program_${index}`);
        column.classList.toggle("closed_inTimetable");
    }
    return(
        <div className={styles.headingBoard}>
            <p className={styles.detail_title}>詳細</p>
            <button className={styles.individualPage}>個別ページ＞</button>
            <button className={styles.closeButton} onClick={close_detail}>閉じる≪</button>
        </div>
    )
}