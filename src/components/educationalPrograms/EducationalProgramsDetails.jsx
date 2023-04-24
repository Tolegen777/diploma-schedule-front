import React from 'react';
import {CustomTable} from "../../shared/Table/CustomTable";
import {PageMenu, PageMenuColumn} from "../../shared/PageMenu";
import {CategoryTitle} from "../../shared/CategoryTitle";
import {ParagraphText} from "../../shared/ParagraphText";
import {Colors, TextWeightType} from "../../const/const";
import {TableActionsWrapper} from "../../shared/TableActionsWrapper";
import {SwitchButton} from "../../shared/SwitchButton";
import {CustomButtonWithIcon} from "../../shared/CustomButtonWithIcon.tsx";
import {ActionButton} from "../../shared/ActionButton";
import {CustomButton} from "../../shared/CustomButton";
import editIcon from './../../assets/icons/editIcon.svg';
import filterIcon from './../../assets/icons/filterIcon.svg';
import refreshIcon from './../../assets/icons/refreshIcon.svg';
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import viewIcon from "../../assets/icons/viewIcon.svg";

const EducationalProgramsDetails = (
    {
        isLoading,
        data,
        onChangeUserActive,
        selectedRow,
        onSelectRow,
        selectedRowCount,
        onSelectRowCount,
        onSelectCurrentPage,
        onOpenCreateUpdateModal,
    }
) => {

    // "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    //     "title": "string",
    //     "elective": true,
    //     "universityId": "3fa85f64-5717-4562-b3fc-2c963f66afa6

    const columns = [
        {
            title: 'Идентификатор',
            dataIndex: 'id',
            sorter: {
                compare: (a, b) => a.id - b.id,
                multiple: 3,
            },
            render: id => (
                <ParagraphText color={Colors.Blue} weight={TextWeightType.bold}>
                    {id}
                </ParagraphText>
            ),
        },
        {
            title: 'Название',
            dataIndex: 'title',
        },
        {
            title: 'Идентификатор университета',
            dataIndex: 'universityId',
        },
        {
            title: 'Электив',
            dataIndex: 'elective',
            render: id => (
                <ParagraphText color={Colors.Blue} weight={TextWeightType.bold}>
                    {id ? 'Да' : 'Нет'}
                </ParagraphText>
            ),
        },
        {
            title: 'Действия',
            render: (entity) => <TableActionsWrapper>
                <ActionButton
                    image={editIcon}
                    callBack={() => onOpenCreateUpdateModal('update', entity)}/>
                <ActionButton
                    image={viewIcon}
                    callBack={() => onOpenCreateUpdateModal('view', entity)}
                />
                <ActionButton
                    image={deleteIcon}
                    callBack={() => onChangeUserActive(entity.id)}
                />
            </TableActionsWrapper>,
            width: 100,
            align: 'center',
        },
    ];

    return (
        <>
            <PageMenu>
                <PageMenuColumn>
                    <CategoryTitle>Управление образовательными группами</CategoryTitle>
                </PageMenuColumn>
                {/*<PageMenuColumn>*/}
                {/*    <CustomButtonWithIcon*/}
                {/*        position_from="center"*/}
                {/*        icon={refreshIcon}*/}
                {/*        callBack={() =>  onRefreshList()}*/}
                {/*    >*/}
                {/*        Обновить базу*/}
                {/*    </CustomButtonWithIcon>*/}
                {/*</PageMenuColumn>*/}

                <PageMenuColumn to_right="auto">
                    {/*<CustomButtonWithIcon*/}
                    {/*    position_from="center"*/}
                    {/*    icon={filterIcon}*/}
                    {/*    callBack={onOpenRolesSettingsModal}*/}
                    {/*>*/}
                    {/*    Настройка ролей*/}
                    {/*</CustomButtonWithIcon>*/}
                    <CustomButton
                        position_from="center"
                        color={Colors.Blue}
                        onClick={() => onOpenCreateUpdateModal('create')}
                    >
                        Создать образовательную группу
                    </CustomButton>
                </PageMenuColumn>
            </PageMenu>

            <CustomTable
                isLoading={isLoading}
                columns={columns}
                dataSource={data}
                selectedRow={selectedRow}
                onSelectRow={onSelectRow}
                selectedRowCount={selectedRowCount}
                onSelectRowCount={onSelectRowCount}
                onSelectCurrentPage={onSelectCurrentPage}
            />
        </>
    );
};

export default EducationalProgramsDetails;