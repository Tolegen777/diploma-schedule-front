import React from 'react';
import {Form} from 'antd';
import {FormInput} from "../../shared/FormInput";
import {FormButtonWrapper, FormContainer} from "../../shared/FormContainer";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {ParagraphText} from "../../shared/ParagraphText";
import {SwitchButton} from "../../shared/SwitchButton";
import {CustomButton} from "../../shared/CustomButton";
import {FormItem} from "../../shared/FormItem";
import {Colors, TextWeightType} from "../../const/const";

export const EducationalProgramsCreateUpdateForm = (
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
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Название образовательной программы'
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
                                label={field.label}
                                rules={field.rules}
                                key={field.name}
                                name={field.name}
                                valuePropName="value"
                            >
                                {field.element}
                            </FormItem>
                        ) }
                        <FormItem
                            key="elective"
                            name="elective"
                            valuePropName="checked"
                            label={<ParagraphText color={Colors.Blue} weight={TextWeightType.bold}>
                                Электив
                            </ParagraphText>}
                            label_align='left'
                            labelCol={{ span: 12 }}
                        >
                            <SwitchButton />
                        </FormItem>
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
