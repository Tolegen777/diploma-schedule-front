import * as React from 'react';
import styled from 'styled-components';
import { ScheduleComponent, ViewsDirective, ViewDirective, Week, Inject } from '@syncfusion/ej2-react-schedule';

const StyledScheduleComponent = styled(ScheduleComponent)`
  .e-popup-content {
    background-color: #fff;
    color: #000;
  }
`;



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

    const eventRendered = (args) => {
        const element = args.element;
        element.querySelector('.e-subject-wrap').textContent = 'Заголовок';
        element.querySelector('.e-date-time').textContent = '';
        element.querySelector('.e-more-indicator').style.display = 'none';
    };

    return (
        <StyledScheduleComponent currentView='Week' selectedDate={new Date(2023, 2, 27)} eventSettings={{ dataSource: data }} eventRendered={eventRendered}>
            <ViewsDirective>
                <ViewDirective option='Week' />
            </ViewsDirective>
            <Inject services={[Week]} />
        </StyledScheduleComponent>
    );

    };
export default ScheduleView