import React from 'react';
import './ScheduleDetailCard.css';
import {formatDateWithTime} from "../../utils/formatDateWithTime";
import {Button} from "antd";
import {Loader} from "../../shared/Loader";

const ScheduleDetailCard = React.memo(({
                                           id,
                                           subject,
                                           teacher,
                                           endTime,
                                           startTime,
                                           sessionType,
                                           group,
                                           roomNumber,
                                           itemIndex,
                                           educationalProgram,
                                           onRemove,
                                           onRemoveFromArray,
                                           isLoading
                                       }) => {
    const scheduleOne = [
        {
            name: subject,
            type: '',
            group: group,
            teacher: teacher,
            stats: {
                Программа: educationalProgram,
                Тип: sessionType,
                Кабинет: roomNumber,
            },
            abilities: {
                room: roomNumber,
            },
            itemIndex: itemIndex ?? 0
        },
    ];

    if (isLoading) return <Loader />


        return (
        <div>
            {scheduleOne.map((schedule) => (
                <div id="day1">
                    <div className="card__caption1">
                        <div className="card__name1">{schedule.name}</div>
                        <h3 className="card__type1">{schedule.group}</h3>
                        <div className="card__stats1">
                            {Object.entries(schedule.stats).map(([statName, statValue]) => (
                                <div key={statName}
                                     style={{display: "flex", alignItems: "center", gap: "2px", marginTop: "3px"}}>
                                    <div>{statName.toUpperCase()} -</div>
                                    <div style={{
                                        maxWidth: "120px",
                                        textTransform: "capitalize",
                                        fontWeight: "600",
                                        textOverflow: "ellipsis"
                                    }}>{statValue?.toLowerCase()}</div>
                                </div>
                            ))}
                        </div>
                        <div className="card__image-container21" style={{height: "2px"}}>
                        </div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            marginTop: "3px",
                            flexDirection: "column",
                            gap: "4px"
                        }}>
                            <div>{schedule?.teacher}</div>
                            <div
                                className="card__type21">{formatDateWithTime(startTime)} - {formatDateWithTime(endTime)}</div>
                            {schedule.index}
                        </div>
                    </div>
                </div>
            ))}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "3px"
            }}>
                <Button style={{
                    background: "#ee6363",
                    color: "#fff"
                }}
                        onClick={() => {
                            onRemove(id)
                            onRemoveFromArray(id)
                        }}
                >
                    Удалить
                </Button>
            </div>

        </div>

        );
        });

        export default ScheduleDetailCard;
