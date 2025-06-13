"use client";
import { useState } from "react";
import { ToggleButton } from "./timetable_toggleButton.jsx"
import { Timetable } from "./timetable.jsx";
import styles from "./timetableDisplayStyles.module.css";

export function TimetableDisplay(){
    const now = new Date()
    const [day,setDay] = useState((now.getMonth()==8 && now.getDay()==7) ? 2 : 1);
    
    function toggleValue(){
        setDay(3 - day);
    }

    return(
        <>
            <ToggleButton day={day} onClick={toggleValue}/>
            <div className={styles.wholeTable}><Timetable day={day}/></div>
        </>
    );
}