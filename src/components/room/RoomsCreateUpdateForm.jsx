import React from 'react'
import { Form } from 'antd'
import { Link } from 'react-router-dom'
import { FormInput } from '../../shared/FormInput'
import { FormButtonWrapper, FormContainer } from '../../shared/FormContainer'
import { SpaceContainer } from '../../shared/SpaceContainer'
import { FormInfoDescription, FormInfoDescriptionItem } from '../../shared/FormInfoDescription'
import { CustomButton } from '../../shared/CustomButton'
import { FormItem } from '../../shared/FormItem'
import { Colors } from '../../const/const'
import { formatDateWithTime } from '../../utils/formatDateWithTime'

export const RoomsCreateUpdateForm = (
    {
        formType,
        initialFields,
        onSubmit,
        onClose,
        editEntity
    }) => {
    const [ form ] = Form.useForm();


    // const isLdap = Form.useWatch('is_ldap_auth', form);

    const formFields = [

        {
            name: 'number',
            element: <FormInput placeholder="Введите номер"/>,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
                ],
            label: 'Почта'
        },
        {
            name: 'type',
            element: <FormInput placeholder="Введите тип" />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
               ],
            label: 'Имя'
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

                {formType === 'view' && editEntity && (
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
                        Амир здесь ты должен мне дать все занятые и свободные дни со временами когда они заняты или свободны!
                        Я их потом буду здесь отображать
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
