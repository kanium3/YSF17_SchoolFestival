import { Column_element } from "./timetable_column_element";
import { Column_heading } from "./timetable_column_heading";
import { Column_detailsElement } from "./timetable_column_detailsElement";
import { Column_detailsHeading } from "./timetable_column_detailsHeading";

export function Timetable_column({programsInfo}){
    const element_contents = programsInfo.details.map((x) => <Column_element content={`${x.time.start}～${x.time.end}`}/>);
    const element_detailsContents = programsInfo.details.map((x) => <Column_detailsElement programsDetail={x}/>);
    return(
        <div>
            <div>
                <Column_heading programsInfo={programsInfo}/>
                <div>
                    {element_contents}
                </div>
            </div>
            <div>
                <Column_detailsHeading programsInfo={programsInfo}/>
                <div>
                    {element_detailsContents}
                </div>
            </div>
        </div>
    )
}