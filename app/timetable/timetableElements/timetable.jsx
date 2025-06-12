import { Timetable_column } from "./timetable_column";
import programsData_day1 from "./programsData/programsDataSample_day1.json" assert {type:"json"};
import programsData_day2 from "./programsData/programsDataSample_day2.json" assert {type:"json"};

export function Timetable({day}){
    const program_items = [programsData_day1,programsData_day2][day-1].map((x)=><Timetable_column programsInfo={x}/>);
    return(
        <div>
            {program_items}
        </div>
    )
}