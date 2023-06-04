import React, {useCallback, useState} from 'react';
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {defaultResponseTableData} from "../const/defaultResponseData";
import {roomInitialValues} from "../mockedData/rooms";
import {roomApi} from "../api/roomApi";
import {RoomsCreateUpdateForm} from "../components/room/RoomsCreateUpdateForm";
import RoomDetails from "../components/room/RoomDetails";
import {userService} from "../services/userService";

const Room = () => {

    const universityId = userService.getUser().universityId

    const [selectedRow, setSelectedRow] = useState([])
    // set row counts for pagination
    const [selectedRowCount, setSelectedRowCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [createUpdateModalOpen, setCreateUpdateModalOpen] = useState(false)
    // set empty fields for create modal or with data for update modal
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(roomInitialValues)

    const [formType, setFormType] = useState(null)

    const [editEntity, setEditEntity] = useState(null);

    const [filterParams, setFilterParams] = useState('');

    const [filterModalOpen, setFilterModalOpen] = useState(false);

    const queryClient = useQueryClient()

    const {mutate: onCreate, isSuccess: isCreated} = useMutation(roomApi.createApi, {
        onSuccess: () => {
            queryClient.invalidateQueries('rooms');
        }
    });

    const {mutate: onUpdate, isSuccess: isUpdated} = useMutation(roomApi.updateApi, {
        onSuccess: () => {
            queryClient.invalidateQueries('rooms');
        }
    });

    const {mutate: onRemove, isSuccess: isDeleted} = useMutation(roomApi.removeApi, {
        onSuccess: () => {
            queryClient.invalidateQueries('rooms');
        }
    });

    // api
    const {
        isLoading,
        data
    } = useQuery(['rooms'], () =>
        roomApi.getAlLApi()
    );

    // Callbacks

    const onClose = useCallback(() => {
        setCreateUpdateModalOpen(false)
        setCreateUpdateFormInitialFields(roomInitialValues)
        setSelectedRow([])
        setEditEntity(null)
        setFilterModalOpen(false)
    }, [])

    const onOpenCreateUpdateModal = (formType, value) => {

        if (formType !== 'create' && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(roomInitialValues, value))
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

    const onSubmitFilterModal = (formData: Record<string, string>) => {
        Object.keys(formData).forEach(key => {
            if (formData[key] === undefined) {
                // eslint-disable-next-line no-param-reassign
                delete formData[key];
            }
        });

        setFilterParams(new URLSearchParams(formData).toString());
        onClose();
    };


    return (
        <>
            {/*<DrawerContainer title="Фильтр" onClose={onClose} open={filterModalOpen}>*/}
            {/*    <GroupsFilterForm onSubmit={onSubmitFilterModal} onClose={onClose} />*/}
            {/*</DrawerContainer>*/}

            <DrawerContainer
                title={
                    (formType === 'create' && 'Создание кабинета') ||
                    (formType === 'view' ? 'Просмотр кабинета' : 'Редактирование кабинета')
                }
                onClose={onClose}
                open={createUpdateModalOpen}
            >
                <RoomsCreateUpdateForm
                    formType={formType}
                    initialFields={createUpdateFormInitialFields}
                    onSubmit={onSubmitCreateUpdateModal}
                    onClose={onClose}
                    editEntity={editEntity}

                />
            </DrawerContainer>
            <RoomDetails
                isLoading={isLoading}
                data={data ?? defaultResponseTableData}
                onChangeUserActive={onHandleRemove}
                selectedRow={selectedRow}
                onSelectRow={onSelectRow}
                selectedRowCount={selectedRowCount}
                onSelectRowCount={setSelectedRowCount}
                onSelectCurrentPage={setCurrentPage}
                onOpenCreateUpdateModal={onOpenCreateUpdateModal}
                onOpenFilterModal={setFilterModalOpen}

            />
        </>
    );
};

export default Room;