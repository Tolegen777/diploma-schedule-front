import * as React from 'react';
import {Agenda, Day, Inject, Month, ScheduleComponent, Week, WorkWeek} from "@syncfusion/ej2-react-schedule";


const Schedule = () => {
    return (<ScheduleComponent>
        <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    </ScheduleComponent>);
    }
;
export default Schedule