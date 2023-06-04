import React, {useCallback, useEffect, useState} from 'react';
import UniversityDetails from "../components/university/UniversityDetails";
import {adminInitialValues} from "../mockedData/admins";
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {UniversitiessCreateUpdateForm} from "../components/university/UniversitiessCreateUpdateForm";
import {useMutation, useQuery} from "react-query";
import {universityApi} from "../api/universityApi";
import {defaultResponseTableData} from "../const/defaultResponseData";
import {customNotification} from "../utils/customNotification";

const University = () => {
    const [selectedRow, setSelectedRow] = useState([])
    // set row counts for pagination
    const [selectedRowCount, setSelectedRowCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [createUpdateModalOpen, setCreateUpdateModalOpen] = useState(false)
    // set empty fields for create modal or with data for update modal
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(adminInitialValues)

    const [formType, setFormType] = useState(null)

    const [editEntity, setEditEntity] = useState(null);

    const [status, setStatus] = useState('')

    const universityCreatedStatus = localStorage.getItem('UNIVERSITY_CREATE')

    const { mutate: onCreateAdmin } = useMutation(universityApi.createAdminApi, {
        onError: (error) => {
            customNotification({type: "error", message: "Ошибка при созданий!"})
        }
    });

    useEffect(() => {
        if (universityCreatedStatus === 'SUCCESS') {
            setStatus(universityCreatedStatus)
        }
    }, [universityCreatedStatus])

    const { mutate: onRemove, isSuccess: isDeleted, isLoading: deleteLoading } = useMutation(universityApi.removeApi);

    // api
    const { isLoading, data } = useQuery(['university', currentPage, selectedRowCount, isDeleted, status, universityCreatedStatus], () =>
        universityApi.getAlLApi(currentPage, selectedRowCount)
    );

    // Callbacks

    const onClose = useCallback(() => {
        setCreateUpdateModalOpen(false)
        setCreateUpdateFormInitialFields(adminInitialValues)
        setSelectedRow([])
        setEditEntity(null)
    }, [])

    const onOpenCreateUpdateModal = (formType, value) => {

        if (formType === 'update' && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(adminInitialValues, value))
            setEditEntity(value)
        }

        setFormType(formType)
        setCreateUpdateModalOpen(true);
        localStorage.setItem('UNIVERSITY_CREATE', '')

    };

    const onSubmitCreateUpdateModal = (formData, type) => {

        if (type === 'create') {
            onCreateAdmin(formData)
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
                title={ formType === 'create' ? 'Создание университета' : 'Редактирование университета' }
                onClose={onClose}
                open={createUpdateModalOpen}
            >
                <UniversitiessCreateUpdateForm
                    formType={formType}
                    initialFields={createUpdateFormInitialFields}
                    onSubmit={onSubmitCreateUpdateModal}
                    onClose={onClose}
                    editEntity={editEntity}

                />
            </DrawerContainer>
            <UniversityDetails
                isLoading={isLoading || deleteLoading}
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

export default University;