import React from 'react';
import {Form} from 'antd';
import {FormInput} from "../../shared/FormInput";
import {FormButtonWrapper, FormContainer} from "../../shared/FormContainer";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {CustomButton} from "../../shared/CustomButton";
import {FormItem} from "../../shared/FormItem";
import {ButtonSizes, Colors, TextWeightType} from "../../const/const";
import {ParagraphText} from "../../shared/ParagraphText";

export const GroupsFilterForm = ({ onSubmit, onClose }) => {
  const [form] = Form.useForm();

  const formFields = [
    {
      name: 'search',
      element: <FormInput placeholder="Название группы" />,
      label: 'Введите название группы'
    },
  ];

  return (
    <FormContainer drawer="true">
      <Form form={form} layout="vertical" onFinish={onSubmit}>
        <SpaceContainer size="middle" direction="vertical">
          <ParagraphText weight={TextWeightType.bold}>Основная информация</ParagraphText>
          {formFields.map(field => (
            <FormItem
                key={field.name}
                name={field.name}
                label={field.label}>
              {field.element}
            </FormItem>
          ))}
        </SpaceContainer>
      </Form>
      <FormButtonWrapper>
        <CustomButton
          button_size={ButtonSizes.Medium}
          color={Colors.Grey25}
          text_color={Colors.Grey90}
          position_from="unset"
          onClick={() => onClose()}
        >
          Отмена
        </CustomButton>
        <CustomButton
          onClick={form.submit}
          button_size={ButtonSizes.Medium}
          color={Colors.Blue}
          position_from="unset"
        >
          Применить
        </CustomButton>
      </FormButtonWrapper>
    </FormContainer>
  );
};
