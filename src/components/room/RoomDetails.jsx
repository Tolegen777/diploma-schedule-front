import React from 'react';
import {CustomTable} from "../../shared/Table/CustomTable";
import {PageMenu, PageMenuColumn} from "../../shared/PageMenu";
import {CategoryTitle} from "../../shared/CategoryTitle";
import {ParagraphText} from "../../shared/ParagraphText";
import {Colors, TextWeightType} from "../../const/const";
import {TableActionsWrapper} from "../../shared/TableActionsWrapper";
import {ActionButton} from "../../shared/ActionButton";
import {CustomButton} from "../../shared/CustomButton";
import deleteIcon from "../../assets/icons/deleteIcon.svg";

const RoomDetails = (
    {
        data,
        onChangeUserActive,
        selectedRow,
        onSelectRow,
        selectedRowCount,
        onSelectRowCount,
        onSelectCurrentPage,
        onOpenCreateUpdateModal,
        isLoading
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
            title: 'Номер кабинета',
            dataIndex: 'name',
        },
        {
            title: 'Действия',
            render: (entity) => <TableActionsWrapper>
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
                    <CategoryTitle>Управление кабинетами</CategoryTitle>
                </PageMenuColumn>

                <PageMenuColumn to_right="auto">

                    <CustomButton
                        position_from="center"
                        color={Colors.Blue}
                        onClick={() => onOpenCreateUpdateModal('create')}
                    >
                        Создать кабинет
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

export default RoomDetails;