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

const TeacherDetails = (
    {
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
    console.log(data, 'Data')
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
            title: 'Преподаватель',
            sorter: {
                compare: (a, b) => a.first_name.length - b.first_name.length,
                multiple: 3,
            },
            render: (user) => <ParagraphText>
                {user.first_name} {user.last_name} {user.middle_name}
            </ParagraphText>
        },
        {
            title: 'Контакты',
            dataIndex: 'phone_number',
        },
        {
            title: 'ВКЛ/ВЫКЛ',
            render: (entity) => <TableActionsWrapper>
                <SwitchButton
                    defaultChecked={entity.state === 'active'}
                    onChange={() => onChangeUserActive({
                        email: entity.email,
                        state: entity.state === 'active' ? 'inactive' : 'active'
                    })}
                />
                <ActionButton image={editIcon} callBack={() => onOpenCreateUpdateModal('update', entity)} />
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
                isLoading={false}
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