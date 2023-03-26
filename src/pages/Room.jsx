import React, {useCallback, useState} from 'react';
import RoomDetails from "../components/room/RoomDetails";
import {roomDetails, roomInitialValues} from "../mockedData/rooms";
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {RoomsCreateUpdateForm} from "../components/room/RoomsCreateUpdateForm";

const Room = () => {
    const [selectedRow, setSelectedRow] = useState([])
    // set row counts for pagination
    const [selectedRowCount, setSelectedRowCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [createUpdateModalOpen, setCreateUpdateModalOpen] = useState(false)
    // set empty fields for create modal or with data for update modal
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(roomInitialValues)

    const [formType, setFormType] = useState(null)

    const [editEntity, setEditEntity] = useState(null);

    // Callbacks

    const onClose = useCallback(() => {
        setCreateUpdateModalOpen(false)
        setCreateUpdateFormInitialFields(roomInitialValues)
        setSelectedRow([])
        setEditEntity(null)
    }, [])

    const onOpenCreateUpdateModal = (formType, value?) => {

        if (formType === 'update' && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(roomInitialValues, value))
            setEditEntity(value)
        }

        setFormType(formType)
        setCreateUpdateModalOpen(true);

    };


    const onSubmitCreateUpdateModal = (formData, type) => {
        if (type === 'create') {
            // onCreateUser(formData as IUserType)
        }

        if (type === 'update') {
            // onUpdateUser(formData as IUpdateUserType)
        }
        onClose()
    }

    const onSelectRow = useCallback((rowIndex: number) => {
        setSelectedRow([rowIndex])
    }, [])


    return (
        <>
            <DrawerContainer
                title={ formType === 'create' ? 'Создание кабинета' : 'Редактирование кабинета' }
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
                data={roomDetails}
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

export default Room;