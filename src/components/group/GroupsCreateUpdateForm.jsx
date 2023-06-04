import React from 'react';
import {Form} from 'antd';
import {FormInput, FormInputNumber} from "../../shared/FormInput";
import {FormButtonWrapper, FormContainer} from "../../shared/FormContainer";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {CustomButton} from "../../shared/CustomButton";
import {FormItem} from "../../shared/FormItem";
import {Colors} from "../../const/const";
import {FormSelect} from "../../shared/FormSelect";
import {useOnScrollEnd} from "../../hooks/useOnScrollEnd";

export const GroupsCreateUpdateForm = (
    {
        formType,
        initialFields,
        onSubmit,
        onClose,
        data,
        setSelectListPage
    }) => {
    const [ form ] = Form.useForm();

    const { options, onScrollEnd } = useOnScrollEnd(
        {
            data: data,
            setSelectListPage: setSelectListPage,
            label:'title',
            value: 'id'
        })

    const formFields = [
        {
            name: 'title',
            element: <FormInput placeholder="Введите название группы" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Название группы'
        },
        {
            name: 'course',
            element: <FormInputNumber placeholder="Введите номер курса" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Название группы'
        },
        {
            name: 'educationalProgramId',
            element: <FormSelect
                placeholder="Выберите образовательную программу"
                options={options}
                showSearch
                allowClear
                style={{ textAlign: 'left' }}
            />,
            label: 'Образовательная программа',
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                }],
        },

    ]

    return (
        <FormContainer drawer="true">
            <SpaceContainer>
                <Form
                    fields={initialFields}
                    form={form}
                    layout="vertical"
                    onFinish={(data) => onSubmit(data, formType)}
                    disabled={formType === 'view'}
                >
                    <SpaceContainer size="large" direction="vertical">

                        { formFields.map(field =>
                            <FormItem
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

            <FormButtonWrapper>
                <CustomButton
                    color={Colors.Grey25}
                    text_color={Colors.Grey90}
                    position_from="unset"
                    onClick={onClose}
                >
                    Отмена
                </CustomButton>
                <CustomButton
                    onClick={form.submit}
                    color={Colors.Blue}
                    position_from="unset"
                >
                    {formType === 'create' ? 'Создать' : 'Применить'}
                </CustomButton>
            </FormButtonWrapper>
        </FormContainer>
    )
};
