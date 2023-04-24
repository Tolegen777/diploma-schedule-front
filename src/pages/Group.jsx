import React, {useCallback, useState} from 'react';
import GroupDetails from "../components/group/GroupDetails";
import {groupInitialValues} from "../mockedData/group";
import {changeFormFieldsData} from "../utils/changeFormFieldsData";
import {DrawerContainer} from "../shared/DrawerContainer";
import {GroupsCreateUpdateForm} from "../components/group/GroupsCreateUpdateForm";
import {useMutation, useQuery, useQueryClient} from "react-query";
import {defaultResponseTableData} from "../const/defaultResponseData";
import {groupApi} from "../api/groupApi";
import {educationalProgramsApi} from "../api/educationalProgramsApi";

const Group = () => {
    const [selectedRow, setSelectedRow] = useState([])
    // set row counts for pagination
    const [selectedRowCount, setSelectedRowCount] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [educationalProgramsCurrentPage, setEducationalProgramsCurrentPage] = useState(1)
    const [createUpdateModalOpen, setCreateUpdateModalOpen] = useState(false)
    // set empty fields for create modal or with data for update modal
    const [createUpdateFormInitialFields, setCreateUpdateFormInitialFields] = useState(groupInitialValues)

    const [formType, setFormType] = useState(null)

    const [editEntity, setEditEntity] = useState(null);

    const [filterParams, setFilterParams] = useState('');

    const queryClient = useQueryClient()

    const {mutate: onCreate, isSuccess: isCreated} = useMutation(groupApi.createApi, {
        onSuccess: () => {
            queryClient.invalidateQueries('educationalPrograms');
        }
    });

    const {mutate: onUpdate, isSuccess: isUpdated} = useMutation(groupApi.updateApi);

    const {mutate: onRemove, isSuccess: isDeleted} = useMutation(groupApi.removeApi, {
        onSuccess: () => {
            queryClient.invalidateQueries('educationalPrograms');
        }
    });

    // api
    const {
        isLoading,
        data
    } = useQuery(['group', currentPage, selectedRowCount, isCreated, isUpdated, isDeleted, filterParams], () =>
        groupApi.getAlLApi(currentPage, selectedRowCount, filterParams)
    );

    const {data: educationalProgramsData} = useQuery(['educationalPrograms', educationalProgramsCurrentPage], () =>
        educationalProgramsApi.getAlLApi(currentPage)
    );

    // Callbacks

    const onClose = useCallback(() => {
        setCreateUpdateModalOpen(false)
        setCreateUpdateFormInitialFields(groupInitialValues)
        setSelectedRow([])
        setEditEntity(null)
    }, [])

    const onOpenCreateUpdateModal = (formType, value) => {

        if (formType === 'update' && value) {
            setCreateUpdateFormInitialFields(changeFormFieldsData(groupInitialValues, value))
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

    const onSelectRow = useCallback((rowIndex) => {
        setSelectedRow([rowIndex])
    }, [])

    const onHandleRemove = (id) => {
        onRemove(id)
    }


    return (
        <>
            <DrawerContainer
                title={formType === 'create' ? 'Создание группы' : 'Редактирование группы'}
                onClose={onClose}
                open={createUpdateModalOpen}
            >
                <GroupsCreateUpdateForm
                    formType={formType}
                    initialFields={createUpdateFormInitialFields}
                    onSubmit={onSubmitCreateUpdateModal}
                    onClose={onClose}
                    editEntity={editEntity}
                    data={educationalProgramsData}
                    setSelectListPage={setEducationalProgramsCurrentPage}

                />
            </DrawerContainer>
            <GroupDetails
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

export default Group;