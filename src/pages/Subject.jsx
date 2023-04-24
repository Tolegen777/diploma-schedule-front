import React, {useCallback, useState} from 'react';
import SubjectDetails from "../components/subject/SubjectDetails";
import {subjectDetails, subjectInitialValues} from "../mockedData/subjects";
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {SubjectsCreateUpdateForm} from "../components/subject/SubjectsCreateUpdateForm";
import {useMutation, useQuery} from "react-query";
import {teacherApi} from "../api/teacherApi";
import {defaultResponseTableData} from "../const/defaultResponseData";
import {subjectApi} from "../api/subjectApi";

const Subject = () => {
    const [selectedRow, setSelectedRow] = useState([])
    // set row counts for pagination
    const [selectedRowCount, setSelectedRowCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [createUpdateModalOpen, setCreateUpdateModalOpen] = useState(false)
    // set empty fields for create modal or with data for update modal
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(subjectInitialValues)

    const [formType, setFormType] = useState(null)

    const [editEntity, setEditEntity] = useState(null);
    const [filterParams, setFilterParams] = useState('');

    const { mutate: onCreate, isSuccess: isCreated } = useMutation(subjectApi.createApi);

    const { mutate: onUpdate, isSuccess: isUpdated } = useMutation(subjectApi.updateApi);

    const { mutate: onRemove, isSuccess: isDeleted } = useMutation(subjectApi.removeApi);

    // api
    const { isLoading, data } = useQuery(['subject', currentPage, selectedRowCount, isCreated, isUpdated, isDeleted, filterParams], () =>
        subjectApi.getAlLApi(currentPage, selectedRowCount, filterParams)
    );


    // Callbacks

    const onClose = useCallback(() => {
        setCreateUpdateModalOpen(false)
        setCreateUpdateFormInitialFields(subjectInitialValues)
        setSelectedRow([])
        setEditEntity(null)
    }, [])

    const onOpenCreateUpdateModal = (formType, value?) => {
        if ((formType === 'update' || formType === 'view') && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(subjectInitialValues, value))
            setEditEntity(value)
        }

        setFormType(formType)
        setCreateUpdateModalOpen(true);

    };


    const onSubmitCreateUpdateModal = (formData, type) => {
        if (type === 'create') {
            onCreate({...formData})
        }

        if (type === 'update') {
            onUpdate({...formData, id: editEntity.id})
        }
        onClose()
    }

    const onSelectRow = useCallback((rowIndex: number) => {
        setSelectedRow([rowIndex])
    }, [])


    return (
        <>
            <DrawerContainer
                title={
                  (formType === 'create' && 'Создание предмета') ||
                  (formType === 'view' ? 'Просмотр предмета' : 'Редактирование предмета')
                }
                onClose={onClose}
                open={createUpdateModalOpen}
            >
                <SubjectsCreateUpdateForm
                    formType={formType}
                    initialFields={createUpdateFormInitialFields}
                    onSubmit={onSubmitCreateUpdateModal}
                    onClose={onClose}
                    editEntity={editEntity}

                />
            </DrawerContainer>
            <SubjectDetails
                isLoading={isLoading}
                data={data ?? defaultResponseTableData}
                onChangeUserActive={() => {}}
                selectedRow={selectedRow}
                onSelectRow={onSelectRow}
                selectedRowCount={selectedRowCount}
                onSelectRowCount={setSelectedRowCount}
                onSelectCurrentPage={setCurrentPage}
                onOpenCreateUpdateModal={onOpenCreateUpdateModal}
            />
        </>
    );
};

export default Subject;
