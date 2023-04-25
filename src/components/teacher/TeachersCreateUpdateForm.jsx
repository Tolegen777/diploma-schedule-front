import React from 'react';
import { Card, Form, Radio } from 'antd';
import { Link } from 'react-router-dom';
import {FormInput, FormInputMasked, FormInputPassword} from "../../shared/FormInput";
import {emailRules, stringRules} from "../../utils/regExpRules";
import {FormButtonWrapper, FormContainer} from "../../shared/FormContainer";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {ParagraphText} from "../../shared/ParagraphText";
import {SwitchButton} from "../../shared/SwitchButton";
import {Loader} from "../../shared/Loader";
import {CustomRadio} from "../../shared/CustomRadio";
import {FormInfoDescription, FormInfoDescriptionItem} from "../../shared/FormInfoDescription";
import {CustomButton} from "../../shared/CustomButton";
import {FormItem} from "../../shared/FormItem";
import {Colors, TextWeightType} from "../../const/const";
import {formatDateWithTime} from "../../utils/formatDateWithTime";

export const TeachersCreateUpdateForm = (
    {
        formType,
        initialFields,
        onSubmit,
        onClose,
        editEntity
    }) => {
    const [ form ] = Form.useForm();

    const formFields = [
        {
            name: 'firstName',
            element: <FormInput placeholder="Введите имя" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Имя'
        },
        {
            name: 'middleName',
            element: <FormInput placeholder="Отчество" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Отчество'
        },
        {
            name: 'lastName',
            element: <FormInput placeholder="Введите фамилию" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Фамилия'
        },
        {
            name: 'qualification',
            element: <FormInput placeholder="Введите квалификацию" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Квалификация'
        },
        {
            name: 'email',
            element: <FormInput placeholder="Введите почту" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'почта'
        },
        {
            name: 'phoneNumber',
            element: <FormInput placeholder="Введите номер телефона" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Номер телефона'
        },
        {
            name: 'department',
            element: <FormInput placeholder="Введите департамент" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Департамент'
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

                {/*{formType === 'view' && editEntity && (*/}
                {/*    <>*/}
                {/*        <FormInfoDescription title="Информация о создании">*/}
                {/*            <FormInfoDescriptionItem label="Дата создания">*/}
                {/*                {editEntity && formatDateWithTime(editEntity.created_date)}*/}
                {/*            </FormInfoDescriptionItem>*/}
                {/*        </FormInfoDescription>*/}

                {/*        <FormInfoDescription title="Информация о редактировании">*/}
                {/*            <FormInfoDescriptionItem label="Дата редактирования">*/}
                {/*                {editEntity && formatDateWithTime(editEntity.updated_date)}*/}
                {/*            </FormInfoDescriptionItem>*/}
                {/*        </FormInfoDescription>*/}
                {/*    </>*/}
                {/*)}*/}
            </SpaceContainer>

            {formType !== 'view' && <FormButtonWrapper>
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
            </FormButtonWrapper>}
        </FormContainer>
    )
};
