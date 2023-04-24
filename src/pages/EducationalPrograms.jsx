import React, {useCallback, useState} from 'react';
import EducationalProgramsDetails from "../components/educationalPrograms/educationalProgramsDetails";
import {adminDetails, educationalProgramsInitialValues} from "../mockedData/educationalPrograms";
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {EducationalProgramsCreateUpdateForm} from "../components/educationalPrograms/EducationalProgramsCreateUpdateForm";
import {useMutation, useQuery} from "react-query";
import {educationalProgramsApi} from "../api/educationalProgramsApi";
import {defaultResponseTableData} from "../const/defaultResponseData";

const EducationalPrograms = () => {
    const [selectedRow, setSelectedRow] = useState([])
    // set row counts for pagination
    const [selectedRowCount, setSelectedRowCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [createUpdateModalOpen, setCreateUpdateModalOpen] = useState(false)
    // set empty fields for create modal or with data for update modal
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(educationalProgramsInitialValues)

    const [formType, setFormType] = useState(null)

    const [editEntity, setEditEntity] = useState(null);

    const [filterParams, setFilterParams] = useState('');

    const { mutate: onCreate, isSuccess: isCreated } = useMutation(educationalProgramsApi.createApi);

    const { mutate: onUpdate, isSuccess: isUpdated } = useMutation(educationalProgramsApi.updateApi);

    const { mutate: onRemove, isSuccess: isDeleted } = useMutation(educationalProgramsApi.removeApi);

    // api
    const { isLoading, data } = useQuery(['educationalPrograms', currentPage, selectedRowCount, isCreated, isUpdated, isDeleted, filterParams], () =>
        educationalProgramsApi.getAlLApi(currentPage, selectedRowCount, filterParams)
    );

    // Callbacks

    const onClose = useCallback(() => {
        setCreateUpdateModalOpen(false)
        setCreateUpdateFormInitialFields(educationalProgramsInitialValues)
        setSelectedRow([])
        setEditEntity(null)
    }, [])

    const onOpenCreateUpdateModal = (formType, value) => {

        if (formType === 'update' && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(educationalProgramsInitialValues, value))
            setEditEntity(value)
        }

        setFormType(formType)
        setCreateUpdateModalOpen(true);

    };


    const onSubmitCreateUpdateModal = (formData, type) => {
        if (type === 'create') {
            // FIXME ужно передавать айди текущего универа
            onCreate({...formData, universityId: 'MUIT'})
        }

        if (type === 'update') {
            // FIXME ужно передавать айди текущего универа
            onUpdate({...formData, id: editEntity.id, universityId: 'MUIT'})
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
                title={ formType === 'create' ? 'Создание образовательной программы' : 'Редактирование образовательной программы' }
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
            <EducationalProgramsDetails
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