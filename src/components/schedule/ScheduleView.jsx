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
import {convertReverseDateTimeToTime, convertTime, convertTimeToDateTime} from "../../utils/convertTimeToDateTime";
import {subjectApi} from "../../api/subjectApi";
import {teacherApi} from "../../api/teacherApi";
import {groupApi} from "../../api/groupApi";
import {dayParser, defaultDaysFull} from "../../utils/dayParser";
import ScheduleCard from "./ScheduleCard";
import {formatDateWithTime} from "../../utils/formatDateWithTime";
import {roomApi} from "../../api/roomApi";
import {Loader} from "../../shared/Loader";
import {Button} from "antd";
import ViewModal from "./ViewModal";


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
  box-shadow: 1px 1px 2px #a6ede2, -1px 1px 2px #a6ede2, -1px -1px 2px #a6ede2, 1px -1px 2px #a6ede2;
`;

const StyledTimeCell = styled(StyledCell)`
  background-color: ${Colors.Blue};
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  box-shadow: 1px 1px 2px #a6ede2, -1px 1px 2px #a6ede2, -1px -1px 2px #a6ede2, 1px -1px 2px #a6ede2;
`;

const StyledEventCell = styled(StyledCell)`
  font-size: 14px;
  font-weight: bold;
  background-color: ${Colors.White}
  color: #fff;
  min-height: 200px;
  //cursor: pointer;
  position: relative;
  width: 210px;
  box-shadow: 1px 1px 2px #a6ede2, -1px 1px 2px #a6ede2, -1px -1px 2px #a6ede2, 1px -1px 2px #a6ede2;
`;

const ScheduleView = React.memo(({filterParams, isRoom, filterRoomsParams}) => {
    const [selectedDate, setSelectedDate] = useState(Dayjs());
    const [open, setOpen] = useState(false)

    const [open2, setOpen2] = useState(false)
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(scheduleInitialValues)
    const [editEntity, setEditEntity] = useState(null);
    const [formType, setFormType] = useState(null)

    const [detailSchedules, setDetailSchedules] = useState([])

    const {mutate: onCreate, isSuccess: isCreated, isLoading: createLoading} = useMutation(scheduleApi.createApi);

    const {mutate: onUpdate, isSuccess: isUpdated} = useMutation(scheduleApi.updateApi);

    const {mutate: onRemove, isSuccess: isDeleted, isLoading: removeLoading} = useMutation(scheduleApi.removeApi);

    // api
    const {isLoading, data, isSuccess} = useQuery(['schedule', isCreated, isUpdated, isDeleted, filterParams], () =>
        scheduleApi.getAlLApi(filterParams)
    );

    const {data: subjects} = useQuery(['subject'], () =>
        subjectApi.getAlLApi()
    );

    const {data: teachers} = useQuery(['teacher'], () =>
        teacherApi.getAlLApi()
    );

    const {data: groups} = useQuery(['group'], () =>
        groupApi.getAlLApi()
    );

    const {data: rooms} = useQuery(['rooms'], () =>
        roomApi.getAlLApi()
    );

    const {data: roomsData, isLoading: roomLoading} = useQuery(['roomsData', filterRoomsParams], () =>
        roomApi.getByIdApi(filterRoomsParams), {
        enabled: filterRoomsParams?.length > 0
        }
    );

    const searchGroupArray = filterParams?.length === 1 ? filterParams[0].searchId : []

    const onClose = useCallback(() => {
        setOpen(false)
        setCreateUpdateFormInitialFields(scheduleInitialValues)
        setEditEntity(null)
        setOpen2(false)
    }, [])

    const onOpenModal = (formType, value?) => {
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

        // if (Array.isArray(payload.groups)) {
        //     newGroup = payload.groups
        // } else {
        //     newGroup = [payload.groups]
        // }

        if (type === 'create') {
            onCreate({
                ...payload,
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
        let arr = []

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
                    >

                        {/* Render your event data here */}
                        {!isRoom && data?.map((item, index) => {
                            if (item.week === weeks[i] && convertReverseDateTimeToTime(item.startTime) === constTimes[j]) {
                                if (`${item?.week}_${convertReverseDateTimeToTime(item.startTime)}_${convertReverseDateTimeToTime(item?.endTime, item)}` in arr) {
                                    arr[`${item?.week}_${convertReverseDateTimeToTime(item.startTime)}_${convertReverseDateTimeToTime(item?.endTime, item)}`].push(item)
                                } else {
                                    arr = {
                                        ...arr,
                                        [`${item?.week}_${convertReverseDateTimeToTime(item.startTime)}_${convertReverseDateTimeToTime(item?.endTime, item)}`]: [item]
                                    }
                                }
                                return <ScheduleCard
                                    teacher={`${item?.teacher?.lastName} ${item?.teacher?.firstName?.slice(0, 1)}. ${item.teacher?.middleName?.slice(0, 1)}.` ?? ''}
                                    startTime={item?.startTime}
                                    endTime={item?.endTime}
                                    subject={item?.subject?.title ?? ''}
                                    sessionType={item?.sessionType ?? ''}
                                    group={item?.groups}
                                    onClick={() => onOpenModal('update', item)}
                                    roomNumber={item?.room?.name ?? ''}
                                    itemIndex={item?.itemIndex}
                                    educationalProgram={item.groups[0]?.educationalProgramName}
                                />;
                            }
                            return ''
                        })}

                        {!isRoom && <div style={{
                            position: "absolute",
                            bottom: 0,
                            zIndex: 1000,
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "2px"
                        }}>
                            <Button style={{
                                background: Colors.Blue,
                                color: "#fff"
                            }}
                                    onClick={() => onOpenModal('create', {
                                        week: weeks[i],
                                        startTime: convertTimeToDateTime(constTimes[j]),
                                        endTime: convertTimeToDateTime(constTimes[j + 1]),
                                        groups: searchGroupArray
                                    })}
                            >
                                Создать
                            </Button>
                            {`${weeks[i]}_${constTimes[j]}_${constTimes[j + 1]}` in arr &&
                                <Button onClick={() => {
                                    setOpen2(true)
                                    setDetailSchedules(arr[`${weeks[i]}_${constTimes[j]}_${constTimes[j + 1]}`])
                                }}>
                                    Посмотреть
                                </Button>}
                        </div>}

                        {
                            isRoom && roomsData?.timeIntervals?.map(room => {
                                if (room.week === weeks[i] && convertTime(room?.timeInterval?.startTime ?? '') === constTimes[j]) {
                                    return <div style={{
                                        width: "160px",
                                        height: "50px",
                                        background: "#ee6363",
                                        color: "#fff",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: "18px",
                                        borderRadius: "2px"
                                    }}>
                                        Кабинет занят
                                    </div>
                                }
                            })
                        }

                    </StyledEventCell>
                );
            });
        }

        return weekCells;
    };

    if (isLoading || roomLoading) return <Loader/>

    // return <CustomLoader />

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
                rooms={rooms}
                groups={groups}
                confirmLoading={createLoading}
            />
            <ViewModal
                open={open2}
                initialFields={createUpdateFormInitialFields}
                onClose={onClose}
                items={detailSchedules}
                onRemove={onRemove}
                isLoading={removeLoading}
                onRemoveFromArray={(id) => setDetailSchedules(prevState => prevState?.filter(item => item?.id !== id))}
            />
            {renderHeaderCells()}
            {renderTimeCells()}
            {renderWeekCells()}
        </StyledCalendar>
    );
});

export default ScheduleView;
