import React, {useCallback, useState} from 'react';
import styled from 'styled-components';
import Dayjs from 'dayjs';
import {times} from 'lodash';
import {Colors, constTimes, weeks} from "../../const/const";
import ScheduleModal from "./ScheduleModal";
import {scheduleInitialValues} from "../../mockedData/schedule";
import {changeFormFieldsData} from "../../utils/changeFormFieldsData";
import {useMutation, useQuery} from "react-query";
import {scheduleApi} from "../../api/scheduleApi";
import {convertReverseDateTimeToTime, convertTimeToDateTime} from "../../utils/convertTimeToDateTime";
import {subjectApi} from "../../api/subjectApi";
import {teacherApi} from "../../api/teacherApi";
import {groupApi} from "../../api/groupApi";
import {dayParser, defaultDays, defaultDaysFull} from "../../utils/dayParser";
import ScheduleCard from "./ScheduleCard";
import {formatDateWithTime} from "../../utils/formatDateWithTime";
import CustomLoader from "../../shared/CustomLoader/CustomLoader";


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
  background-color: ${Colors.Blue};
  color: #FFF;
  font-size: 16px;
`;

const StyledTimeCell = styled(StyledCell)`
  background-color: ${Colors.Blue};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
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

const ScheduleView = ({filterParams}) => {
    const [selectedDate, setSelectedDate] = useState(Dayjs());
    const [open, setOpen] = useState(false)
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(scheduleInitialValues)
    const [editEntity, setEditEntity] = useState(null);
    const [formType, setFormType] = useState(null)

    const { mutate: onCreate, isSuccess: isCreated, isLoading: createLoading } = useMutation(scheduleApi.createApi);

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

    const searchId = filterParams.split('searchId=')[1];
    console.log(searchId, 'FILTER_PARAMS')

    const onClose = useCallback(() => {
        setOpen(false)
        setCreateUpdateFormInitialFields(scheduleInitialValues)
        setEditEntity(null)
    }, [])

    const onOpenModal = (formType, value?) => {
        console.log(value, 'VALUE')
        // debugger
        if ((formType === 'update' || formType === 'view' || 'create') && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(scheduleInitialValues, {
                ...value,
                startTime2: `${defaultDaysFull[value.week]}, ${formatDateWithTime(value.startTime ?? '')}`,
                endTime2: `${defaultDaysFull[value.week]}, ${formatDateWithTime(value.endTime ?? '')}`,
                startTime: value.startTime,
                endTime: value.endTime,
            }))
            setEditEntity(value)
        }

        setFormType(formType)
        setOpen(true);

    };

    const onSubmitCreateUpdateModal = (formData, type) => {

        const {startTime2, endTime2, ...payload} = formData

        let newGroup = []

        if (Array.isArray(payload.groups)) {
            newGroup = payload.groups
        } else {
            newGroup = [payload.groups]
        }

        if (type === 'create') {
            onCreate({
                ...payload,
                groups: newGroup
            })
        }

        if (type === 'update') {
            onUpdate({
                ...payload,
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
                    {i === 0 ? '' : dayParser(date.format('ddd '))}
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
                            groups: [searchId]
                        })}
                        >
                        {/* Render your event data here */}
                        {data?.map((item) => {
                            if (item.week === weeks[i] && convertReverseDateTimeToTime(item.startTime) === constTimes[j]) {
                                return <ScheduleCard
                                    teacher={item?.teacherId}
                                    startTime={item?.startTime}
                                    endTime={item?.endTime}
                                    subject={item?.subjectId}
                                    sessionType={item?.sessionType}
                                    group={item?.groups.join('')}
                                    onClick={() => onOpenModal('update', item)}
                                    teachers={teachers}
                                    subjects={subjects}
                                    groups={groups}
                                    roomNumber={item.room}
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

    // if (isLoading) return <CustomLoader />

    return <CustomLoader />

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
                groups={groups}
                confirmLoading={createLoading}
            />
            {renderHeaderCells()}
            {renderTimeCells()}
            {renderWeekCells()}
        </StyledCalendar>
    );
};

export default ScheduleView;
