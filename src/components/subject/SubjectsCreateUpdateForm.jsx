import React from 'react';
import {Form} from 'antd';
import {FormInput} from "../../shared/FormInput";
import {FormButtonWrapper, FormContainer} from "../../shared/FormContainer";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {CustomButton} from "../../shared/CustomButton";
import {FormItem} from "../../shared/FormItem";
import {Colors} from "../../const/const";

export const SubjectsCreateUpdateForm = (
    {
        formType,
        initialFields,
        onSubmit,
        onClose,
    }) => {
    const [ form ] = Form.useForm();

    const formFields = [
        {
            name: 'title',
            element: <FormInput placeholder="Введите название" />,
            rules: [{
                required: true,
                message: 'Обязательное поле!',
            }],
            label: 'Название'
        },
        {
            name: 'code',
            element: <FormInput placeholder="Введите код" />,
            rules: [{
                required: true,
                message: 'Обязательное поле!',
            }],
            label: 'Код'
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
