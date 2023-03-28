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
import { formatDateWithTime } from '../../utils/formatDateWithTime'


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
        title: 'Почта',
        dataIndex: 'email',
      },
        {
            title: 'Позиция',
            dataIndex: 'position',
        },
      {
        title: 'дата создания',
        dataIndex: 'created_date',
        render: date => formatDateWithTime(date),
      },
      {
        title: 'Дата обновления',
        dataIndex: 'updated_date',
        render: date => formatDateWithTime(date),
        defaultSortOrder: 'ascend'
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
                <ActionButton
                  image={editIcon}
                  callBack={() => onOpenCreateUpdateModal('update', entity)} />
              <ActionButton
                image={viewIcon}
                callBack={() => onOpenCreateUpdateModal('view', entity)}
              />
              <ActionButton
                image={deleteIcon}
                callBack={() => alert('Удаляет преподавателя по id!')}
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
