import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import Dayjs from 'dayjs';
import {times} from 'lodash';
import {Tooltip} from "antd";
import {Colors} from "../../const/const";
import ScheduleModal from "./ScheduleModal";
import {teacherInitialValues} from "../../mockedData/teachers";
import {scheduleInitialValues} from "../../mockedData/schedule";
import {changeFormFieldsData} from "../../utils/changeFormFieldsData";
import {useMutation, useQuery} from "react-query";
import {scheduleApi} from "../../api/scheduleApi";
import {convertReverseDateTimeToTime, convertTimeToDateTime} from "../../utils/convertTimeToDateTime";
import {subjectApi} from "../../api/subjectApi";
import {teacherApi} from "../../api/teacherApi";
import {groupApi} from "../../api/groupApi";
import {dayParser} from "../../utils/dayParser";


const scheduleTime = [
    {
        id: 1,
        day: 'Пт',
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
  font-family: Museo Sans Cyrl, sans-serif;
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

const weeks = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
const constTimes = ['8:10', '9:10', '10:10', '11:10', '12:10', '13:10', '14:10', '15:10', '16:10', '17:10', '18:10', '19:10', '20:10', '21:10']


const ScheduleContent = ({
                             subject,
                             teacher,
                             subjectType,
                             timeFrom,
                             timeTo,
                             sessionType,
                             // subjectTypeTitle,
                             group,
                             // teacherPosition,
                             roomNumber,
    teachers,
    subjects,
    groups
                         }) => {

    return <StyledCard>
        <Tooltip title={`${timeFrom}-${timeTo}`}>
            <div>{`${groups?.find(item => item.id === group)?.title ?? ''}`}</div>
            <StyledTitle>{`${subjects?.find(item => item.id === subject)?.title}`}</StyledTitle>
            <StyledContent>
                {`${teachers?.find(item => item.id === teacher).firstName} ${teachers?.find(item => item.id === teacher).middleName} ${teachers?.find(item => item.id === teacher).lastName}`}
            </StyledContent>
            <div>{sessionType}</div>
            <div>Кабинет: {roomNumber}</div>
        </Tooltip>
    </StyledCard>

}

const ScheduleView = ({filterParams}) => {
    const [selectedDate, setSelectedDate] = useState(Dayjs());
    const [schedule, setSchedule] = useState(scheduleTime)
    const [open, setOpen] = useState(false)
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(scheduleInitialValues)
    const [editEntity, setEditEntity] = useState(null);
    const [formType, setFormType] = useState(null)

    const { mutate: onCreate, isSuccess: isCreated } = useMutation(scheduleApi.createApi);

    const { mutate: onUpdate, isSuccess: isUpdated } = useMutation(scheduleApi.updateApi);

    const { mutate: onRemove, isSuccess: isDeleted } = useMutation(scheduleApi.removeApi);

    // api
    const { isLoading, data } = useQuery(['schedule', isCreated, isUpdated, isDeleted, filterParams], () =>
        scheduleApi.getAlLApi(filterParams)
    );

    const { data: subjects } = useQuery(['subject'], () =>
        subjectApi.getAlLApi()
    );

    const { data: teachers } = useQuery(['teacher'], () =>
        teacherApi.getAlLApi()
    );

    const { data: groups } = useQuery(['group'], () =>
        groupApi.getAlLApi()
    );

    const onClose = useCallback(() => {
        setOpen(false)
        setCreateUpdateFormInitialFields(scheduleInitialValues)
        setEditEntity(null)
    }, [])

    const onOpenModal = (formType, value?) => {
        if ((formType === 'update' || formType === 'view' || 'create') && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(scheduleInitialValues, value))
            setEditEntity(value)
        }

        setFormType(formType)
        setOpen(true);

    };

    const onSubmitCreateUpdateModal = (formData, type) => {
        //FIXME
        if (type === 'create') {
            onCreate({
                ...formData,
            groups: ['3f24b194-6378-46f8-85e6-138a20e1d041'],
            })
        }

        if (type === 'update') {
            onUpdate({
                ...formData,
                groups: ['3f24b194-6378-46f8-85e6-138a20e1d041'],
                id: editEntity.id,
            })
        }
        onClose()
    }

    const renderHeaderCells = () => {
        const startOfWeek = selectedDate.startOf('week');
        const headerCells = [];

        for (let i = 0; i < 8; i++) {
            const date = startOfWeek.add(i, 'day');
            headerCells.push(
                <StyledHeaderCell key={i} row={1} column={i + 1}>
                    {dayParser(date.format('ddd D/M'))}
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
                        onClick={() => onOpenModal('create', {
                            week: weeks[i],
                            startTime: convertTimeToDateTime(constTimes[j]),
                            endTime: convertTimeToDateTime(constTimes[j+1]),
                            groups: 'test'
                        })}
                        >
                        {/* Render your event data here */}
                        {data?.map((item) => {
                            if (item.week === weeks[i] && convertReverseDateTimeToTime(item.startTime) === constTimes[j]) {
                                return <ScheduleContent
                                    teacher={item?.teacherId}
                                    timeFrom={item?.startTime}
                                    timeTo={item?.endTime}
                                    subject={item?.subjectId}
                                    sessionType={item?.sessionType}
                                    group={item?.groups.join('')}
                                    onClick={() => onOpenModal('update', {...item, })}
                                    teachers={teachers}
                                    subjects={subjects}
                                    groups={groups}
                                    // subjectFormat={item.subjectFormat}
                                    // subjectType={item.subjectType}
                                    // subjectTypeTitle={item.subjectTypeTitle}
                                    roomNumber={item.room}
                                    // teacherPosition={item.teacherPosition}
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
            <ScheduleModal
                open={open}
                onSubmit={onSubmitCreateUpdateModal}
                initialFields={createUpdateFormInitialFields}
                formType={formType}
                editEntity={editEntity}
                onClose={onClose}
                subjects={subjects}
                teachers={teachers}
            />
            {renderHeaderCells()}
            {renderTimeCells()}
            {renderWeekCells()}
        </StyledCalendar>
    );
};

export default ScheduleView;
