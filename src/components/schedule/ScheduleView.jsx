import * as React from 'react';
import {
    Day,
    Inject,
    Month,
    ScheduleComponent,
    TimelineViews,
    ViewDirective,
    ViewsDirective,
    Week
} from "@syncfusion/ej2-react-schedule";

import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'en-US': {
        'schedule': {
            'saveButton': 'Add',
            'cancelButton': 'Close',
            'deleteButton': 'Remove',
            'newEvent': 'Add Event',
        },
    }
});




const ScheduleView = () => {
    // return (<ScheduleComponent>
    //     <Inject services={[Day, Week, WorkWeek, Month, Agenda]}/>
    // </ScheduleComponent>);
    // const data = [{
    //     Id: 1,
    //     Subject: 'Meeting',
    //     StartTime: new Date(2023, 2, 27, 10, 0),
    //     EndTime: new Date(2023, 2, 27, 12, 0),
    //     IsAllDay: false
    // }];

    // return (
    //     <StyledScheduleComponent
    //         currentView='Week'
    //         selectedDate={new Date(2023, 2, 27)}
    //         eventSettings={{ dataSource: data }}
    //         timeScale={{ enable: true, interval: 60, slotCount: 2 }}
    //     >
    //         <ViewsDirective>
    //             {/*<ViewDirective option='Day' />*/}
    //             <ViewDirective option='Week' />
    //             {/*<ViewDirective option='Month' />*/}
    //         </ViewsDirective>
    //         <Inject services={[Day, Week, Month]} />
    //     </StyledScheduleComponent>
    // );

    const data = [{
        Id: 1,
        Subject: 'Meeting',
        StartTime: new Date(2023, 2, 27, 10, 0),
        EndTime: new Date(2023, 2, 27, 12, 0),
        IsAllDay: false
    }];


    return (
        <ScheduleComponent width='100%' height='500px' selectedDate={new Date(2018, 1, 15)} eventSettings={{ dataSource: data }}>
            <ViewsDirective>
                <ViewDirective option='Week'/>
            </ViewsDirective>
            <Inject services={[Day, Week, TimelineViews, Month]}/>
        </ScheduleComponent>
    );

    };
export default ScheduleView