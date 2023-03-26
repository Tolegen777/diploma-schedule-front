import React, {useCallback, useState} from 'react';
import TeacherDetails from "../components/teacher/TeacherDetails";
import {teacherDetails, teacherInitialValues} from "../mockedData/teachers";
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {UsersCreateUpdateForm} from "../components/teacher/UsersCreateUpdateForm";

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

    // Callbacks

    const onClose = useCallback(() => {
        setCreateUpdateModalOpen(false)
        setCreateUpdateFormInitialFields(teacherInitialValues)
        setSelectedRow([])
        setEditEntity(null)
    }, [])

    const onOpenCreateUpdateModal = (formType, value?) => {

        if (formType === 'update' && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(teacherInitialValues, value))
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
                title={ formType === 'create' ? 'Создание преподавателя' : 'Редактирование преподавателя' }
                onClose={onClose}
                open={createUpdateModalOpen}
            >
                <UsersCreateUpdateForm
                    formType={formType}
                    initialFields={createUpdateFormInitialFields}
                    onSubmit={onSubmitCreateUpdateModal}
                    onClose={onClose}
                    editEntity={editEntity}

                />
            </DrawerContainer>
            <TeacherDetails
                data={teacherDetails}
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

export default Teacher;