import { Column_element } from "./timetable_column_element";
import { Column_heading } from "./timetable_column_heading";
import { Column_detailsElement } from "./timetable_column_detailsElement";
import { Column_detailsHeading } from "./timetable_column_detailsHeading";
import styles from "./timetable_columnStyles.module.css";
import style4action from "./timetable_action.css"

export function Timetable_column({programsInfo, index}){
    function timeToIndex(time_str){
        const [hour,minute] = time_str.split(":").map((x)=>Number(x));
        return (hour-10)*12 + Math.round(minute/5) + 1;
    }

    const element_contents = programsInfo.details.map(
        (x) => 
        <Column_element 
            content={`${x.time.start}～${x.time.end}`} 
            startIndex={timeToIndex(x.time.start)}
            endIndex={timeToIndex(x.time.end)}/>
    );
    const element_detailsContents = programsInfo.details.map(
        (x) => 
        <Column_detailsElement 
            programsDetail={x}
            startIndex={timeToIndex(x.time.start)}
            endIndex={timeToIndex(x.time.end)}/>);
    
    return(
        <div id={`program_${index}`} 
        className={`${styles.column} ${index % 2 == 0 ? styles.even : styles.odd} closed_inTimetable`}>
            <div className={styles.column_main}>
                <Column_heading programsInfo={programsInfo} index={index}/>
                <div className={styles.timeBoard}>
                    {element_contents}
                </div>
            </div>
            <div className={`${styles.column_details} detailsColumn`}>
                <Column_detailsHeading programsInfo={programsInfo} index={index}/>
                <div className={styles.timeBoard}>
                    {element_detailsContents}
                </div>
            </div>
        </div>
    )
}