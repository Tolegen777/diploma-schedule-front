import React, {useCallback, useState} from 'react';
import TeacherDetails from "../components/teacher/TeacherDetails";
import {teacherDetails, teacherInitialValues} from "../mockedData/teachers";
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {TeachersCreateUpdateForm} from "../components/teacher/TeachersCreateUpdateForm";
import {useMutation, useQuery} from "react-query";
import {universityApi} from "../api/universityApi";
import {defaultResponseTableData} from "../const/defaultResponseData";
import {teacherApi} from "../api/teacherApi";
import {userService} from "../services/userService";

const Teacher = () => {
    const [selectedRow, setSelectedRow] = useState([])
    // set row counts for pagination
    const [selectedRowCount, setSelectedRowCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [createUpdateModalOpen, setCreateUpdateModalOpen] = useState(false)
    // set empty fields for create modal or with data for update modal
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(teacherInitialValues)

    const [formType, setFormType] = useState(null)

    const [editEntity, setEditEntity] = useState(null);

    const [filterParams, setFilterParams] = useState('');

    const { mutate: onCreate, isSuccess: isCreated } = useMutation(teacherApi.createApi);

    const { mutate: onUpdate, isSuccess: isUpdated } = useMutation(teacherApi.updateApi);

    const { mutate: onRemove, isSuccess: isDeleted } = useMutation(teacherApi.removeApi);

    // api
    const { isLoading, data } = useQuery(['teacher', currentPage, selectedRowCount, isCreated, isUpdated, isDeleted, filterParams], () =>
        teacherApi.getAlLApi(currentPage, selectedRowCount, filterParams)
    );

    // Callbacks

    const onClose = useCallback(() => {
        setCreateUpdateModalOpen(false)
        setCreateUpdateFormInitialFields(teacherInitialValues)
        setSelectedRow([])
        setEditEntity(null)
    }, [])

    const onOpenCreateUpdateModal = (formType, value?) => {

        if ((formType === 'update' || formType === 'view') && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(teacherInitialValues, value))
            setEditEntity(value)
        }

        setFormType(formType)
        setCreateUpdateModalOpen(true);

    };


    const onSubmitCreateUpdateModal = (formData, type) => {
        const universityId = userService.getUser().universityId
        if (type === 'create') {
            // FIXME ужно передавать айди текущего универа
            onCreate({...formData, universityId: universityId})
        }

        if (type === 'update') {
            // FIXME ужно передавать айди текущего универа
            onUpdate({...formData, id: editEntity.id, universityId: universityId})
        }
        onClose()
    }

    const onSelectRow = useCallback((rowIndex: number) => {
        setSelectedRow([rowIndex])
    }, [])

    const onHandleRemove = (id) => {
        onRemove(id)
    }


    return (
        <>
            <DrawerContainer
              title={
                (formType === 'create' && 'Создание преподавателя') ||
                (formType === 'view' ? 'Просмотр преподавателя' : 'Редактирование преподавателя')
              }
                onClose={onClose}
                open={createUpdateModalOpen}
            >
                <TeachersCreateUpdateForm
                    formType={formType}
                    initialFields={createUpdateFormInitialFields}
                    onSubmit={onSubmitCreateUpdateModal}
                    onClose={onClose}
                    editEntity={editEntity}

                />
            </DrawerContainer>
            <TeacherDetails
                isLoading={isLoading}
                data={data ?? defaultResponseTableData}
                onChangeUserActive={onHandleRemove}
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

export default Teacher;
