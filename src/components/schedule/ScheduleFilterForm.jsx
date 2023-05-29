import {Button, Form} from 'antd';
import {selectOptionsParser} from "../../utils/selectOptionsParser";
import {SpaceContainer} from "../../shared/SpaceContainer";
import {ParagraphText} from "../../shared/ParagraphText";
import {FormItem} from "../../shared/FormItem";
import {FormSearchSelect, FormSelect, FormTagSelect} from "../../shared/FormSelect";
import {ButtonSizes, Colors, TextWeightType} from "../../const/const";
import {FormButtonWrapper, FormContainer} from "../../shared/FormContainer";
import {CustomButton} from "../../shared/CustomButton";
import {FormInput} from "../../shared/FormInput";
import {useQuery} from "react-query";
import {teacherApi} from "../../api/teacherApi";
import React, {useState} from "react";
import {groupApi} from "../../api/groupApi";
import {subjectApi} from "../../api/subjectApi";
import {educationalProgramsApi} from "../../api/educationalProgramsApi";
import {universityApi} from "../../api/universityApi";
import {useWatch} from "antd/es/form/Form";

const options = [
    {
        label: 'Преподаватель',
        value: 'TEACHER'
    },
    {
        label: 'Предмет',
        value: 'SUBJECT'
    },
    {
        label: 'Образовательная программа',
        value: 'EDUCATIONAL_PROGRAM'
    },
    {
        label: 'Группа',
        value: 'GROUP'
    },
]
export const ScheduleFilterForm = ({ onSubmit }) => {
    const [form] = Form.useForm();

    const searchTypeObs = Form.useWatch('searchType', form)


    const { isLoading: teacherLoading, data: teacherData } = useQuery(['teacher'], () =>
        teacherApi.getAlLApi(1, 100)
    );

    const { isLoading: groupLoading, data: groupData } = useQuery(['group'], () =>
        groupApi.getAlLApi(1, 100)
    );

    const { isLoading: subjectLoading, data: subjectData } = useQuery(['subject'], () =>
        subjectApi.getAlLApi(1, 100)
    );

    const { isLoading: educationalProgramLoading, data: educationalProgramData } = useQuery(['educationalProgram'], () =>
        educationalProgramsApi.getAlLApi(1, 100)
    );


    const teachers = selectOptionsParser(teacherData || [], 'email', 'id');
    const groups = selectOptionsParser(groupData || [], 'title', 'id');
    const subjects = selectOptionsParser(subjectData || [], 'title', 'id');
    const educationalPrograms = selectOptionsParser(educationalProgramData || [], 'title', 'id');

    const optionValues = {
        TEACHER: teachers,
        SUBJECT: subjects,
        GROUP: groups,
        EDUCATIONAL_PROGRAM: educationalPrograms,
    }

    return (
        <>
            <Form form={form}
                  layout="horizontal"
                  onFinish={onSubmit}
                  style={{marginBottom: "10px"}}>
                <SpaceContainer size="middle" direction="horizontal">
                        <FormItem
                            name="searchType"
                        >
                            <FormSearchSelect
                                placeholder="Выберите параметр"
                                options={options}
                                onChange={() => form.setFieldValue('searchId')}
                            />
                        </FormItem>
                    <FormItem name="searchId">
                        <FormTagSelect
                            placeholder="Выберите элементы"
                            options={optionValues[searchTypeObs]}
                        />
                    </FormItem>
                        <CustomButton
                            onClick={form.submit}
                            color={Colors.Blue}
                            position_from="unset"
                        >
                            Поиск
                        </CustomButton>
                        <CustomButton
                            color={Colors.Grey25}
                            text_color={Colors.Grey90}
                            position_from="unset"
                            onClick={() => {
                                form.setFieldValue('searchId')
                                form.setFieldValue('searchType')
                            }}
                        >
                            Сбросить
                        </CustomButton>

                </SpaceContainer>
            </Form>
        </>
    );
};
