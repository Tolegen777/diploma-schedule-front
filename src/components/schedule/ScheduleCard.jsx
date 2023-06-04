import React from 'react';
import './ScheduleCard.css';
import {formatDateWithTime} from "../../utils/formatDateWithTime";

const ScheduleCard = React.memo(({
                                     subject,
                                     teacher,
                                     endTime,
                                     startTime,
                                     sessionType,
                                     group,
                                     roomNumber,
                                     itemIndex,
                                     educationalProgram
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


    return (
        <div className={`signboard`} style={{zIndex: parseInt(itemIndex) + 100}}>
            {scheduleOne.map((schedule) => (
                <div className={`signboard front${schedule.itemIndex} inner anim04c`}>
                    <div id="day">
                        <div className="card__caption">
                            <div className="card__name">{schedule.name}</div>
                            {schedule?.group?.map((item, ind) => {
                                return <h3 className={`card__type${ind}`}>{item?.title}</h3>
                            })}

                            <div className="card__stats">
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
                            <div className="card__image-container2" style={{height: "2px"}}>
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
                                    className="card__type20">{formatDateWithTime(startTime)} - {formatDateWithTime(endTime)}</div>
                                {schedule.index}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
});

export default ScheduleCard;
