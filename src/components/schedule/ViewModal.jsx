import React, {useEffect} from 'react';
import {Form, Modal} from "antd";
import {FormInput} from "../../shared/FormInput";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {FormItem} from "../../shared/FormItem";
import {FormSelect} from "../../shared/FormSelect";
import {selectOptionsParser} from "../../utils/selectOptionsParser";
import ScheduleDetailCard from "./ScheduleDetailCard";

const lessonFormats = [
    {
        label: "Лекция",
        value: "LECTURE"
    },
    {
        label: "Лабороторная работа",
        value: "LABORATORY_WORK"
    },
    {
        label: "Практика",
        value: "PRACTICE"
    },
]

const ViewModal = ({
                       open,
                       initialFields,
                       onClose,
                       items,
                       onRemove,
    onRemoveFromArray,
    isLoading
                   }) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit()
        onClose()
    };

    const handleCancel = () => {
        onClose();
    };

    // const formFields = [
    //     {
    //         name: 'subjectId',
    //         element: <FormSelect
    //             placeholder="Выберите предмет"
    //             options={selectOptionsParser(subjects, 'title', 'id')}
    //             showSearch
    //             allowClear
    //             style={{textAlign: 'left'}}
    //         />,
    //         label: 'Предмет',
    //         rules: [
    //             {
    //                 required: true,
    //                 message: 'Обязальное поле!'
    //             }],
    //     },
    //     {
    //         name: 'teacherId',
    //         element: <FormSelect
    //             placeholder="Выберите преподавателя"
    //             options={selectOptionsParser(teachers, 'email', 'id')}
    //             showSearch
    //             allowClear
    //             style={{textAlign: 'left'}}
    //         />,
    //         label: 'Преподаватель',
    //         rules: [
    //             {
    //                 required: true,
    //                 message: 'Обязальное поле!'
    //             }],
    //     },
    //     {
    //         name: 'roomId',
    //         element: <FormSelect
    //             placeholder="Выберите кабинет"
    //             options={selectOptionsParser(rooms, 'name', 'id')}
    //             showSearch
    //             allowClear
    //             style={{textAlign: 'left'}}
    //         />,
    //         rules: [
    //             {
    //                 required: true,
    //                 message: 'Обязальное поле!'
    //             },
    //         ],
    //         label: 'Кабинет'
    //     },
    //     {
    //         name: 'sessionType',
    //         element: <FormSelect
    //             placeholder="Выберите формат урока"
    //             options={lessonFormats}
    //             showSearch
    //             allowClear
    //             style={{textAlign: 'left'}}
    //         />,
    //         rules: [
    //             {
    //                 required: true,
    //                 message: 'Обязальное поле!'
    //             },
    //         ],
    //         label: 'Формат урока'
    //     },
    //     // {
    //     //     name: 'week',
    //     //     element: <FormInput />,
    //     //     label: 'День недели'
    //     // },
    //     {
    //         name: 'groups',
    //         element: <FormSelect
    //             placeholder="Выберите группу"
    //             options={selectOptionsParser(groups, 'title', 'id')}
    //             showSearch
    //             allowClear
    //             style={{textAlign: 'left'}}
    //         />,
    //         label: 'Группа'
    //     },
    //     {
    //         name: 'startTime2',
    //         element: <FormInput disabled/>,
    //         rules: [{
    //             // required: formType === 'create',
    //             message: 'Обязательное поле!'
    //         }],
    //         label: 'Время начала урока'
    //     },
    //     {
    //         name: 'endTime2',
    //         element: <FormInput disabled/>,
    //         rules: [{
    //             // required: formType === 'create',
    //             message: 'Обязательное поле!'
    //         }],
    //         label: 'Время конца урока'
    //     },
    // ]

    useEffect(() => {
        if (items?.length === 0) {
            onClose()
        }
    }, [items?.length])

    return (
        <>
            <Modal
                title="Создание расписания"
                open={open}
                // onOk={handleOk}
                // confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText={"asxa"}
                cancelText={"Отмена"}
                width={"920px"}
                okButtonProps={{ style: { display: 'none' } }}
                style={{
                    width: "900px"
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center"
                    // background: "red",
                }}>
                    {items?.map((item) => {
                        return <ScheduleDetailCard
                            id={item?.id}
                            teacher={`${item?.teacher?.lastName} ${item?.teacher?.firstName?.slice(0, 1)}. ${item.teacher?.middleName?.slice(0, 1)}.` ?? ''}
                            startTime={item?.startTime}
                            endTime={item?.endTime}
                            subject={item?.subject?.title ?? ''}
                            sessionType={item?.sessionType ?? ''}
                            group={item?.groups[0]?.title}
                            // onClick={() => onOpenModal('update', item)}
                            roomNumber={item?.room?.name ?? ''}
                            itemIndex={item?.itemIndex}
                            educationalProgram={item.groups[0]?.educationalProgramName}
                            onRemove={onRemove}
                            onRemoveFromArray={onRemoveFromArray}
                            isLoading={isLoading}
                        />
                    })}
                </div>
            </Modal>
        </>
    );
};

export default ViewModal;