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

export const EducationalProgramsCreateUpdateForm = (
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
                                label={field.label}
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
                    // disabled={formType === 'create' ? !state.permissions.isCreate : !state.permissions.isUpdate}
                >
                    {formType === 'create' ? 'Создать' : 'Применить'}
                </CustomButton>
            </FormButtonWrapper>
        </FormContainer>
    )
};