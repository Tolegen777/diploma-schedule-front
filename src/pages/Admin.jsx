import React, {useCallback, useState} from 'react';
import AdminDetails from "../components/admin/AdminDetails";
import {adminDetails, adminInitialValues} from "../mockedData/admins";
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {AdminsCreateUpdateForm} from "../components/admin/AdminsCreateUpdateForm";
import {useMutation, useQuery} from "react-query";
import {universityApi} from "../api/universityApi";
import {defaultResponseTableData} from "../const/defaultResponseData";
import {userService} from "../services/userService";

const Admin = () => {
    const [selectedRow, setSelectedRow] = useState([])
    // set row counts for pagination
    const [selectedRowCount, setSelectedRowCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [createUpdateModalOpen, setCreateUpdateModalOpen] = useState(false)
    // set empty fields for create modal or with data for update modal
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(adminInitialValues)

    const [formType, setFormType] = useState(null)

    const [editEntity, setEditEntity] = useState(null);

    const [filterParams, setFilterParams] = useState('');

    const { mutate: onCreate, isSuccess: isCreated } = useMutation(universityApi.createApi);

    const { mutate: onUpdate, isSuccess: isUpdated } = useMutation(universityApi.updateApi);

    const { mutate: onRemove, isSuccess: isDeleted } = useMutation(universityApi.removeApi);

    // api
    const { isLoading, data } = useQuery(['university', currentPage, selectedRowCount, isCreated, isUpdated, isDeleted, filterParams], () =>
        universityApi.getAlLApi(currentPage, selectedRowCount, filterParams)
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

    };


    const onSubmitCreateUpdateModal = (formData, type) => {
        const userId = userService.getUser().id
        if (type === 'create') {
            onCreate({...formData, userId: userId})
        }

        if (type === 'update') {
            onUpdate({...formData, userId: userId, id: editEntity.id})
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
                <AdminsCreateUpdateForm
                    formType={formType}
                    initialFields={createUpdateFormInitialFields}
                    onSubmit={onSubmitCreateUpdateModal}
                    onClose={onClose}
                    editEntity={editEntity}

                />
            </DrawerContainer>
            <AdminDetails
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

export default Admin;