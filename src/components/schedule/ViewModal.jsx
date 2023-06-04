import React, {useEffect} from 'react';
import {Form, Modal} from "antd";
import ScheduleDetailCard from "./ScheduleDetailCard";
const ViewModal = ({
                       open,
                       onClose,
                       items,
                       onRemove,
    onRemoveFromArray,
    isLoading
                   }) => {

    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit()
        onClose()
    };

    const handleCancel = () => {
        onClose();
    };

    useEffect(() => {
        if (items?.length === 0) {
            onClose()
        }
    }, [items?.length])

    return (
        <>
            <Modal
                title="Создание расписания"
                open={open}
                onCancel={handleCancel}
                okText={"asxa"}
                cancelText={"Отмена"}
                width={"920px"}
                okButtonProps={{ style: { display: 'none' } }}
                style={{
                    width: "900px"
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center"
                    // background: "red",
                }}>
                    {items?.map((item) => {
                        return <ScheduleDetailCard
                            id={item?.id}
                            teacher={`${item?.teacher?.lastName} ${item?.teacher?.firstName?.slice(0, 1)}. ${item.teacher?.middleName?.slice(0, 1)}.` ?? ''}
                            startTime={item?.startTime}
                            endTime={item?.endTime}
                            subject={item?.subject?.title ?? ''}
                            sessionType={item?.sessionType ?? ''}
                            group={item?.groups}
                            // onClick={() => onOpenModal('update', item)}
                            roomNumber={item?.room?.name ?? ''}
                            itemIndex={item?.itemIndex}
                            educationalProgram={item.groups[0]?.educationalProgramName}
                            onRemove={onRemove}
                            onRemoveFromArray={onRemoveFromArray}
                            isLoading={isLoading}
                        />
                    })}
                </div>
            </Modal>
        </>
    );
};

export default ViewModal;