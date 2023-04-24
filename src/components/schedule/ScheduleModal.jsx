import React, {useState} from 'react';
import {Form, Modal} from "antd";
import {FormInput} from "../../shared/FormInput";
import {emailRules} from "../../utils/regExpRules";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {FormItem} from "../../shared/FormItem";

const ScheduleModal = ({
                           open,
                           onSubmit,
                           initialFields,
                           formType,
                           editEntity,
                           onClose
}) => {

    const [ form ] = Form.useForm();

    const [confirmLoading, setConfirmLoading] = useState(false);
    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            onClose();
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        onClose();
    };

    const formFields = [
        {
            name: 'subject',
            element: <FormInput placeholder="Введите название предмета" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
                {
                    message: 'Неверный адрес!',
                    pattern: emailRules,
                }],
            label: 'Почта'
        },
        {
            name: 'subjectFormat',
            element: <FormInput placeholder="Введите тип предмета" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Имя'
        },
        {
            name: 'subjectType',
            element: <FormInput placeholder="Введите тип специальности" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Фамилия'
        },
        {
            name: 'subjectTypeTitle',
            element: <FormInput placeholder="Введите название специальности" />,
            rules: [{
                required: false,
            }],
            label: 'Отчество'
        },
        {
            name: 'teacher',
            element: <FormInput placeholder="Введите преподаватея" />,
            rules: [{
                // required: formType === 'create',
                message: 'Обязательное поле!'
            }],
            label: 'Номер телефона'
        },
        {
            name: 'teacherPosition',
            element: <FormInput placeholder="Введите позицию преподавателя" />,
            rules: [{
                // required: formType === 'create',
                message: 'Обязательное поле!'
            }],
            label: 'Номер телефона'
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

                            { formFields.map(field =>
                                <FormItem
                                    // label={field.label}
                                    rules={field.rules}
                                    key={field.name}
                                    name={field.name}
                                    valuePropName="value"
                                >
                                    {field.element}
                                </FormItem>
                            ) }
                        </SpaceContainer>
                    </Form>
                </SpaceContainer>
            </Modal>
        </>
    );
};

export default ScheduleModal;