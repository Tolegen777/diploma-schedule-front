import React, {useState} from 'react';
import {Form, Modal} from "antd";
import {FormInput} from "../../shared/FormInput";
import {emailRules} from "../../utils/regExpRules";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {FormItem} from "../../shared/FormItem";
import {FormSelect} from "../../shared/FormSelect";
import {selectOptionsParser} from "../../utils/selectOptionsParser";
import {useQuery} from "react-query";
import {subjectApi} from "../../api/subjectApi";
import {teacherApi} from "../../api/teacherApi";

const ScheduleModal = ({
                           open,
                           onSubmit,
                           initialFields,
                           formType,
                           editEntity,
                           onClose,
                           subjects,
                           teachers
                       }) => {

    const [form] = Form.useForm();

    const [confirmLoading, setConfirmLoading] = useState(false);

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
                options={selectOptionsParser(teachers, 'title', 'id')}
                showSearch
                allowClear
            />,
            label: 'Преподаватель',
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                }],
        },
        {
            name: 'room',
            element: <FormInput placeholder="Введите номер кабинета"/>,
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
            element: <FormInput placeholder="Введите формат урока"/>,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Формат урока'
        },
        {
            name: 'week',
            element: <FormInput disabled/>,
            label: 'День недели'
        },
        {
            name: 'groups',
            element: <FormInput disabled/>,
            label: 'Группа'
        },
        {
            name: 'startTime',
            element: <FormInput placeholder="Выберите дату начала" disabled/>,
            rules: [{
                // required: formType === 'create',
                message: 'Обязательное поле!'
            }],
            label: 'Дата начала'
        },
        {
            name: 'endTime',
            element: <FormInput placeholder="Выберите дату конца" disabled/>,
            rules: [{
                // required: formType === 'create',
                message: 'Обязательное поле!'
            }],
            label: 'Дата конца'
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
                okText={"OK"}
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
                                    // label={field.label}
                                    rules={field.rules}
                                    key={field.name}
                                    name={field.name}
                                    valuePropName="value"
                                >
                                    {field.element}
                                </FormItem>
                            )}
                        </SpaceContainer>
                    </Form>
                </SpaceContainer>
            </Modal>
        </>
    );
};

export default ScheduleModal;