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

export const UsersCreateUpdateForm = (
    {
        isLoadingRoles,
        rolesList,
        formType,
        initialFields,
        onSubmit,
        onClose,
        editEntity
    }) => {
    const [ form ] = Form.useForm();

    const isLdap = Form.useWatch('is_ldap_auth', form);

    const formFields = [
        {
            name: 'email',
            element: <FormInput type="email" placeholder="Введите почту" autoComplete="new-email" />,
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
            name: 'first_name',
            element: <FormInput placeholder="Введите имя" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
                // {
                //     message: 'Только кириллица или латиница, без пробелов!',
                //     pattern: stringRules,
                // }
                ],
            label: 'Имя'
        },
        {
            name: 'last_name',
            element: <FormInput placeholder="Введите фамилию" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
                // {
                //     message: 'Только кириллица или латиница, без пробелов!',
                //     pattern: stringRules,
                // }
                ],
            label: 'Фамилия'
        },
        {
            name: 'middle_name',
            element: <FormInput placeholder="Введите отчество" />,
            rules: [{
                required: false,
                // message: 'Только кириллица или латиница, без пробелов!',
                // pattern: stringRules,
            }],
            label: 'Отчество'
        },
        {
            name: 'phone_number',
            element: <FormInputMasked mask="+0 000 000 00 00" placeholder="Введите номер телефона" />,
            rules: [{
                required: formType === 'create',
                message: 'Обязательное поле!'
            }],
            label: 'Номер телефона'
        },
        {
            name: 'position',
            element: <FormInput placeholder="Введите позицию" />,
            rules: [{
                required: formType === 'create',
                message: 'Обязательное поле!'
            }],
            label: 'Номер телефона'
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

                {formType === 'update' && editEntity && (
                    <>
                        <FormInfoDescription title="Информация о создании">
                            <FormInfoDescriptionItem label="Создал (ФИО)">
                                <Link to="/">{editEntity && editEntity.created_by}</Link>
                            </FormInfoDescriptionItem>
                            <FormInfoDescriptionItem label="Дата создания">
                                {editEntity && formatDateWithTime(editEntity.created_date)}
                            </FormInfoDescriptionItem>
                        </FormInfoDescription>

                        <FormInfoDescription title="Информация о редактировании">
                            <FormInfoDescriptionItem label="Редактировал (ФИО)">
                                <Link to="/">{editEntity && editEntity.updated_by}</Link>
                            </FormInfoDescriptionItem>
                            <FormInfoDescriptionItem label="Дата редактирования">
                                {editEntity && formatDateWithTime(editEntity.updated_date)}
                            </FormInfoDescriptionItem>
                        </FormInfoDescription>
                    </>
                )}
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
                    // disabled={formType === 'create' ? !state.permissions.isCreate : !state.permissions.isUpdate}
                >
                    {formType === 'create' ? 'Создать' : 'Применить'}
                </CustomButton>
            </FormButtonWrapper>
        </FormContainer>
    )
};
