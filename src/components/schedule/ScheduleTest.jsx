import React, {useState} from 'react';
import styled from 'styled-components';
import Dayjs from 'dayjs';
import {times} from 'lodash';
import {Card, Tooltip} from "antd";
import Meta from "antd/es/card/Meta";
import {Colors} from "./../../const/const";
import ScheduleModal from "./ScheduleModal";


const scheduleTime = [
    {
        id: 1,
        day: 'Fr',
        dayId: 5,
        timeFrom: '08:00',
        timeTo: '09:00',
        timeId: 0,
        group: 'ITIS-1906',
        subject: 'Audit',
        subjectId: 6,
        subjectFormat: 'lecture',
        subjectType: 'major',
        subjectTypeId: 1,
        subjectTypeTitle: 'BIS',
        subjectTypeTitleId: 2,
        teacher: 'Armanov K.E.',
        teacherPosition: 'PHD',
        roomNumber: 2,
        roomId: 2
    },
    {
        id: 1,
        day: 'Fr',
        dayId: 2,
        timeFrom: '08:00',
        timeTo: '09:00',
        timeId: 2,
        group: 'ITIS-1906',
        subject: 'Audit',
        subjectId: 6,
        subjectFormat: 'lecture',
        subjectType: 'major',
        subjectTypeId: 1,
        subjectTypeTitle: 'BIS',
        subjectTypeTitleId: 2,
        teacher: 'Armanov K.E.',
        teacherPosition: 'PHD',
        roomNumber: 2,
        roomId: 2
    },
    {
        id: 1,
        day: 'Fr',
        dayId: 6,
        timeFrom: '08:00',
        timeTo: '09:00',
        timeId: 10,
        group: 'ITIS-1906',
        subject: 'Audit',
        subjectId: 6,
        subjectFormat: 'lecture',
        subjectType: 'major',
        subjectTypeId: 1,
        subjectTypeTitle: 'BIS',
        subjectTypeTitleId: 2,
        teacher: 'Armanov K.E.',
        teacherPosition: 'PHD',
        roomNumber: 2,
        roomId: 2
    },
    {
        id: 1,
        day: 'Fr',
        dayId: 3,
        timeFrom: '08:00',
        timeTo: '09:00',
        timeId: 12,
        group: 'ITIS-1906',
        subject: 'Audit',
        subjectId: 6,
        subjectFormat: 'lecture',
        subjectType: 'major',
        subjectTypeId: 1,
        subjectTypeTitle: 'BIS',
        subjectTypeTitleId: 2,
        teacher: 'Armanov K.E.',
        teacherPosition: 'PHD',
        roomNumber: 2,
        roomId: 2
    },
    {
        id: 1,
        day: 'Fr',
        dayId: 4,
        timeFrom: '08:00',
        timeTo: '09:00',
        timeId: 5,
        group: 'ITIS-1906',
        subject: 'Audit',
        subjectId: 6,
        subjectFormat: 'lecture',
        subjectType: 'major',
        subjectTypeId: 1,
        subjectTypeTitle: 'BIS',
        subjectTypeTitleId: 2,
        teacher: 'Armanov K.E.',
        teacherPosition: 'PHD',
        roomNumber: 2,
        roomId: 2
    },
    {
        id: 1,
        day: 'Fr',
        dayId: 1,
        timeFrom: '08:00',
        timeTo: '09:00',
        timeId: 8,
        group: 'ITIS-1906',
        subject: 'Audit',
        subjectId: 6,
        subjectFormat: 'lecture',
        subjectType: 'major',
        subjectTypeId: 1,
        subjectTypeTitle: 'BIS',
        subjectTypeTitleId: 2,
        teacher: 'Armanov K.E.',
        teacherPosition: 'PHD',
        roomNumber: 2,
        roomId: 2
    },
    {
        id: 1,
        day: 'Fr',
        dayId: 3,
        timeFrom: '08:00',
        timeTo: '09:00',
        timeId: 6,
        group: 'ITIS-1906',
        subject: 'Audit',
        subjectId: 6,
        subjectFormat: 'lecture',
        subjectType: 'major',
        subjectTypeId: 1,
        subjectTypeTitle: 'BIS',
        subjectTypeTitleId: 2,
        teacher: 'Armanov K.E.',
        teacherPosition: 'PHD',
        roomNumber: 2,
        roomId: 2
    },
    {
        id: 1,
        day: 'Fr',
        dayId: 1,
        timeFrom: '08:00',
        timeTo: '09:00',
        timeId: 13,
        group: 'ITIS-1906',
        subject: 'Audit',
        subjectId: 6,
        subjectFormat: 'lecture',
        subjectType: 'major',
        subjectTypeId: 1,
        subjectTypeTitle: 'BIS',
        subjectTypeTitleId: 2,
        teacher: 'Armanov K.E.',
        teacherPosition: 'PHD',
        roomNumber: 2,
        roomId: 2
    },

]

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: 150px repeat(7, 1fr);
  grid-template-rows: 50px repeat(14, 1fr);
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  height: 100%;
  background-color: #fff;
`;

const StyledCell = styled.div`
  border: 1px solid #ccc;
  grid-row: ${props => props.row};
  grid-column: ${props => props.column};
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

const StyledHeaderCell = styled(StyledCell)`
  font-weight: bold;
  background-color: #f5f5f5;
`;

const StyledTimeCell = styled(StyledCell)`
  font-size: 12px;
  background-color: #f5f5f5;
`;

const StyledEventCell = styled(StyledCell)`
  font-size: 14px;
  font-weight: bold;
  background-color: ${Colors.White}
  color: #fff;
  min-height: 40px;
  cursor: pointer;

  &:hover {
    background: ${Colors.Grey25};
  }
`;

const StyledCard = styled.div`
background: ${Colors.Blue};
  border-radius: 8px;
  box-sizing: border-box;
  color: ${Colors.White};
  font-size: 14px;
  line-height: 1.5714285714285714;
  list-style: none;
  font-family: Museo Sans Cyrl,sans-serif;
  border: 1px solid #ccc;
  grid-row: 2;
  grid-column: 6;
  text-align: center;
  padding: 4px;
  width: 90%;
`

const StyledTitle = styled.div`
 font-weight: bold;
`

const StyledContent = styled.div`
    
`


const ScheduleContent = ({subject, teacher, subjectType, timeFrom, timeTo, subjectFormat, subjectTypeTitle, group, teacherPosition, roomNumber}) => {
    return <StyledCard>
        <Tooltip title={`${timeFrom}-${timeTo}`}>
        <div>{group}</div>
        <StyledTitle>{`${subjectTypeTitle} - ${subject}`}</StyledTitle>
        <StyledContent>{`${teacher}, ${teacherPosition}`}</StyledContent>
        <div>{subjectFormat}</div>
        <div>{subjectType}</div>
        <div>Кабинет: {roomNumber}</div>
        </Tooltip>
    </StyledCard>

}

const ScheduleTest = () => {
    const [selectedDate, setSelectedDate] = useState(Dayjs());
    const [schedule, setSchedule] = useState(scheduleTime)
    const [open, setOpen] = useState(false)

    const handleModalOpen = () => {
        setOpen(true)
    }
    const handleCreateSchedule = (formData) => {
        console.log(formData)
    }

    const renderHeaderCells = () => {
        const startOfWeek = selectedDate.startOf('week');
        const headerCells = [];

        for (let i = 0; i < 8; i++) {
            const date = startOfWeek.add(i, 'day');
            headerCells.push(
                <StyledHeaderCell key={i} row={1} column={i + 1}>
                    {date.format('ddd D/M')}
                </StyledHeaderCell>
            );
        }

        return headerCells;
    };

    const renderTimeCells = () => {
        const timeCells = [];

        for (let i = 8; i <= 21; i++) {
            const date = Dayjs().hour(i).minute(10);
            timeCells.push(
                <StyledTimeCell key={i} row={i - 6} column={1}>
                    {date.format('HH:mm')}
                </StyledTimeCell>
            );
        }

        return timeCells;
    };

    const renderWeekCells = () => {
        const startOfWeek = selectedDate.startOf('week');
        const weekCells = [];
        // console.log(weekCells, 'week')

        for (let i = 0; i < 7; i++) {
            const date = startOfWeek.add(i, 'day');
            const isCurrentTime = date.isSame(Dayjs(), 'day');
            const column = i + 2;

            times(14, (j) => {
                weekCells.push(
                    <StyledEventCell
                        key={`${i}-${j}`}
                        row={j + 2}
                        column={column}
                        isCurrentTime={isCurrentTime}
                    onClick={handleModalOpen}>
                        {/* Render your event data here */}
                        {schedule.map((item) => {
                            // console.log(item.day, 'i')
                            console.log(i, 'i')
                            console.log(j, 'J')
                            if (item.dayId === i && item.timeId === j) {
                                return <ScheduleContent
                                    teacher={item.teacher}
                                    timeFrom={item.timeFrom}
                                    timeTo={item.timeTo}
                                    subject={item.subject}
                                    group={item.group}
                                    subjectFormat={item.subjectFormat}
                                    subjectType={item.subjectType}
                                    subjectTypeTitle={item.subjectTypeTitle}
                                    roomNumber={item.roomNumber}
                                    teacherPosition={item.teacherPosition}
                                />;
                            }
                            return ''
                        })}
                    </StyledEventCell>
                );
            });
        }

        return weekCells;
    };

    return (
        <StyledCalendar>
            <ScheduleModal open={open} setOpen={setOpen} onSubmit={handleModalOpen}/>
            {renderHeaderCells()}
            {renderTimeCells()}
            {renderWeekCells()}
        </StyledCalendar>
    );
};

export default ScheduleTest;
