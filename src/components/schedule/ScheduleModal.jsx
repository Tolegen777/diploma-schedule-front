import React from 'react';
import {Form, Modal} from "antd";
import {FormInput} from "../../shared/FormInput";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {FormItem} from "../../shared/FormItem";
import {FormSelect} from "../../shared/FormSelect";
import {selectOptionsParser} from "../../utils/selectOptionsParser";

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

const ScheduleModal = React.memo(({
                                      open,
                                      onSubmit,
                                      initialFields,
                                      formType,
                                      editEntity,
                                      onClose,
                                      subjects,
                                      teachers,
                                      rooms,
                                      groups,
                                      confirmLoading
                                  }) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit()
        onClose()
    };

    const handleCancel = () => {
        onClose();
    };

    const formFields = [
        {
            name: 'subjectId',
            element: <FormSelect
                placeholder="Выберите предмет"
                options={selectOptionsParser(subjects, 'title', 'id')}
                showSearch
                allowClear
                style={{textAlign: 'left'}}
            />,
            label: 'Предмет',
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                }],
        },
        {
            name: 'teacherId',
            element: <FormSelect
                placeholder="Выберите преподавателя"
                options={selectOptionsParser(teachers, 'email', 'id')}
                showSearch
                allowClear
                style={{textAlign: 'left'}}
            />,
            label: 'Преподаватель',
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                }],
        },
        {
            name: 'roomId',
            element: <FormSelect
                placeholder="Выберите кабинет"
                options={selectOptionsParser(rooms, 'name', 'id')}
                showSearch
                allowClear
                style={{textAlign: 'left'}}
            />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Кабинет'
        },
        {
            name: 'sessionType',
            element: <FormSelect
                placeholder="Выберите формат урока"
                options={lessonFormats}
                showSearch
                allowClear
                style={{textAlign: 'left'}}
            />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Формат урока'
        },
        // {
        //     name: 'week',
        //     element: <FormInput />,
        //     label: 'День недели'
        // },
        {
            name: 'groups',
            element: <FormSelect
                placeholder="Выберите группу"
                options={selectOptionsParser(groups, 'title', 'id')}
                showSearch
                allowClear
                style={{textAlign: 'left'}}
            />,
            label: 'Группа'
        },
        {
            name: 'startTime2',
            element: <FormInput disabled/>,
            rules: [{
                // required: formType === 'create',
                message: 'Обязательное поле!'
            }],
            label: 'Время начала урока'
        },
        {
            name: 'endTime2',
            element: <FormInput disabled/>,
            rules: [{
                // required: formType === 'create',
                message: 'Обязательное поле!'
            }],
            label: 'Время конца урока'
        },
    ]

    return (
        <>
            <Modal
                title="Создание расписания"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                okText={"Oк"}
                cancelText={"Отмена"}
            >
                <SpaceContainer>
                    <Form
                        fields={initialFields}
                        form={form}
                        layout="vertical"
                        onFinish={(data) => onSubmit(data, 'create')}
                        // disabled={formType === 'view'}
                    >
                        <SpaceContainer size="large" direction="vertical">

                            {formFields.map(field =>
                                <FormItem
                                    label={field.label}
                                    rules={field.rules}
                                    key={field.name}
                                    name={field.name}
                                    valuePropName="value"
                                >
                                    {field.element}
                                </FormItem>
                            )}
                            <FormItem name="week" hidden/>
                            <FormItem name="startTime" hidden/>
                            <FormItem name="endTime" hidden/>
                        </SpaceContainer>
                    </Form>
                </SpaceContainer>
            </Modal>
        </>
    );
});

export default ScheduleModal;