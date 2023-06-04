import React from 'react';
import {Form} from 'antd';
import {FormInput, FormInputPassword} from "../../shared/FormInput";
import {FormButtonWrapper, FormContainer} from "../../shared/FormContainer";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {CustomButton} from "../../shared/CustomButton";
import {FormItem} from "../../shared/FormItem";
import {Colors} from "../../const/const";

export const UniversitiessCreateUpdateForm = (
    {
        formType,
        initialFields,
        onSubmit,
        onClose,
        editEntity
    }) => {
    const [form] = Form.useForm();

    const formFields = [
        formType === 'create' ? {
            name: 'email',
            element: <FormInput
                placeholder="Введите имя для входа"
                autoComplete="new-email"
            />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Имя для входа'
        } : null,
        {
            name: 'name',
            element: <FormInput placeholder="Введите название"/>,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Название университета'
        },
        {
            name: 'code',
            element: <FormInput placeholder="Введите код университета"/>,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Код университета'
        },
        formType === 'create' ? {
            name: 'password',
            element: <FormInputPassword
                placeholder="Введите пароль"
                autoComplete="new-password"
            />,
            rules: [
                {
                    required: true,
                    message: 'Обязальное поле!'
                },
            ],
            label: 'Пароль'
        } : null,
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

                        {formFields.filter(item => item !== null).map(field =>
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
                    </SpaceContainer>
                </Form>

                {/*{formType === 'update' && editEntity && (*/}
                {/*    <>*/}
                {/*        <FormInfoDescription title="Информация о создании">*/}
                {/*            <FormInfoDescriptionItem label="Создал (ФИО)">*/}
                {/*                <Link to="/">{editEntity && editEntity.created_by}</Link>*/}
                {/*            </FormInfoDescriptionItem>*/}
                {/*            <FormInfoDescriptionItem label="Дата создания">*/}
                {/*                {editEntity && formatDateWithTime(editEntity.created_date)}*/}
                {/*            </FormInfoDescriptionItem>*/}
                {/*        </FormInfoDescription>*/}

                {/*        <FormInfoDescription title="Информация о редактировании">*/}
                {/*            <FormInfoDescriptionItem label="Редактировал (ФИО)">*/}
                {/*                <Link to="/">{editEntity && editEntity.updated_by}</Link>*/}
                {/*            </FormInfoDescriptionItem>*/}
                {/*            <FormInfoDescriptionItem label="Дата редактирования">*/}
                {/*                {editEntity && formatDateWithTime(editEntity.updated_date)}*/}
                {/*            </FormInfoDescriptionItem>*/}
                {/*        </FormInfoDescription>*/}
                {/*    </>*/}
                {/*)}*/}
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
