import React from 'react';
import {CustomTable} from "../../shared/Table/CustomTable";
import {PageMenu, PageMenuColumn} from "../../shared/PageMenu";
import {CategoryTitle} from "../../shared/CategoryTitle";
import {ParagraphText} from "../../shared/ParagraphText";
import {Colors, TextWeightType} from "../../const/const";
import {TableActionsWrapper} from "../../shared/TableActionsWrapper";
import {SwitchButton} from "../../shared/SwitchButton";
import {ActionButton} from "../../shared/ActionButton";
import {CustomButton} from "../../shared/CustomButton";
import editIcon from './../../assets/icons/editIcon.svg';
import viewIcon from './../../assets/icons/viewIcon.svg';
import deleteIcon from './../../assets/icons/deleteIcon.svg';
import {formatDateWithTime} from '../../utils/formatDateWithTime'


const TeacherDetails = (
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
            title: 'Имя',
            dataIndex: 'firstName',
        },
        {
            title: 'Отчество',
            dataIndex: 'middleName',
        },
        {
            title: 'Фамилия',
            dataIndex: 'lastName',
        },
        {
            title: 'Квалификация',
            dataIndex: 'qualification',
        },
        {
            title: 'Почта',
            dataIndex: 'email',
        },
        {
            title: 'Телефон',
            dataIndex: 'phoneNumber',
        },
        {
            title: 'Департамент',
            dataIndex: 'department',
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
                    <CategoryTitle>Управление преподавателями</CategoryTitle>
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
                        Создать преподавателя
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

export default TeacherDetails;
