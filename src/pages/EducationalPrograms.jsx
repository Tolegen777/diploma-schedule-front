import React, {useCallback, useState} from 'react';
import {educationalProgramsInitialValues} from "../mockedData/educationalPrograms";
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {useMutation, useQuery} from "react-query";
import {educationalProgramsApi} from "../api/educationalProgramsApi";
import {
    EducationalProgramsCreateUpdateForm
} from "../components/educationalPrograms/EducationalProgramsCreateUpdateForm";
import {defaultResponseTableData} from "../const/defaultResponseData";
import EducationalProgramDetails from "../components/educationalPrograms/EducationalProgramDetails";
import {userService} from "../services/userService";

const EducationalPrograms = () => {
    const universityId = userService.getUser().universityId
    const [selectedRow, setSelectedRow] = useState([])
    // set row counts for pagination
    const [selectedRowCount, setSelectedRowCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [createUpdateModalOpen, setCreateUpdateModalOpen] = useState(false)
    // set empty fields for create modal or with data for update modal
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(educationalProgramsInitialValues)

    const [formType, setFormType] = useState(null)

    const [editEntity, setEditEntity] = useState(null);

    const { mutate: onCreate, isSuccess: isCreated } = useMutation(educationalProgramsApi.createApi);

    const { mutate: onUpdate, isSuccess: isUpdated } = useMutation(educationalProgramsApi.updateApi);

    const { mutate: onRemove, isSuccess: isDeleted } = useMutation(educationalProgramsApi.removeApi);

    // api
    const { isLoading, data } = useQuery(['educationalPrograms', currentPage, selectedRowCount, isCreated, isUpdated, isDeleted], () =>
        educationalProgramsApi.getAlLApi(currentPage, selectedRowCount)
    );

    // Callbacks

    const onClose = useCallback(() => {
        setCreateUpdateModalOpen(false)
        setCreateUpdateFormInitialFields(educationalProgramsInitialValues)
        setSelectedRow([])
        setEditEntity(null)
    }, [])

    const onOpenCreateUpdateModal = (formType, value) => {

        if (formType !== 'create' && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(educationalProgramsInitialValues, value))
            setEditEntity(value)
        }

        setFormType(formType)
        setCreateUpdateModalOpen(true);

    };


    const onSubmitCreateUpdateModal = (formData, type) => {

        if (type === 'create') {
            onCreate({...formData, universityId: universityId})
        }

        if (type === 'update') {
            onUpdate({...formData, id: editEntity.id, universityId: universityId})
        }
        onClose()
    }

    const onSelectRow = useCallback((rowIndex) => {
        setSelectedRow([rowIndex])
    }, [])

    const onHandleRemove = (id) => {
        onRemove(id)
    }


    return (
        <>
            <DrawerContainer
                title={
                    (formType === 'create' && 'Создание образовательной программы') ||
                    (formType === 'view' ? 'Просмотр образовательной программы' : 'Редактирование образовательной программы')
                }
                onClose={onClose}
                open={createUpdateModalOpen}
            >
                <EducationalProgramsCreateUpdateForm
                    formType={formType}
                    initialFields={createUpdateFormInitialFields}
                    onSubmit={onSubmitCreateUpdateModal}
                    onClose={onClose}
                    editEntity={editEntity}
                />
            </DrawerContainer>
            <EducationalProgramDetails
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

export default EducationalPrograms;