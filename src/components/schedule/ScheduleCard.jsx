import React, {useEffect, useState} from 'react';
import './ScheduleCard.css';
import math from './../../assets/icons/editIcon.svg'
import {formatDateWithTime} from "../../utils/formatDateWithTime";

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

const ScheduleCard = React.memo(({
                                     subject,
                                     teacher,
                                     endTime,
                                     startTime,
                                     sessionType,
                                     group,
                                     roomNumber,
                                     teachers,
                                     subjects,
                                     groups,
                                     index,
                                     week,
                                     itemIndex
                                 }) => {

    const [all, setAll] = useState([])

    const teacherFullName = `${teachers?.find(item => item.id === teacher)?.lastName} ${teachers?.find(item => item.id === teacher)?.firstName?.slice(0, 1)}. ${teachers?.find(item => item.id === teacher)?.middleName?.slice(0, 1)}.`

    const eeveelutions = [
        {
            name: `${subjects?.find(item => item.id === subject)?.title}`,
            type: '',
            group: `${groups?.find(item => item.id === group)?.title ?? ''}`,
            index: index ?? 0,
            image: math,
            week: week,
            stats: {
                Программа: 'BIS',
                Тип: sessionType,
                Кабинет: roomNumber,
            },
            abilities: {
                room: roomNumber,
                hiddenAbility: 'Anticipation',
            },
            classIndex: 0,
            itemIndex: itemIndex ?? 0
        },
    ];

    useEffect(() => {
        if (all.includes(`${formatDateWithTime(startTime)}_${eeveelutions[0].week}`)) {
            eeveelutions[0].classIndex = all.length
        } else {

            setAll(all.push(`${formatDateWithTime(startTime)}_${week}`))
        }
    }, [eeveelutions.index])

    console.log(all, 'ALL')

    return (
        // <div id="cards">
        //     {eeveelutions.map((eeveelution) => (
        //         <figure key={eeveelution.name} className={`card card--${eeveelution.type}`}>
        //             <figcaption className="card__caption">
        //                 <h1 className="card__name">{eeveelution.name}</h1>
        //                 <h3 className="card__type">{eeveelution.group}</h3>
        //                 <table className="card__stats">
        //                     <tbody>
        //                     {Object.entries(eeveelution.stats).map(([statName, statValue]) => (
        //                         <tr key={statName}>
        //                             <th>{statName.toUpperCase()}</th>
        //                             <td>{statValue}</td>
        //                         </tr>
        //                     ))}
        //                     </tbody>
        //                 </table>
        //                 <div className="card__image-container2" style={{height:"2px"}}>
        //                 </div>
        //                 <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3px"}}>
        //                     {formatDateWithTime(startTime)} - {formatDateWithTime(endTime)}
        //                 </div>
        //             </figcaption>
        //         </figure>
        //     ))}
        // </div>

        // <div id="day">
        //     {eeveelutions.map((eeveelution, ind) => (
        //         <div className="card__caption">
        //             <div className="card__name">{eeveelution.name}</div>
        //             <h3 className="card__type">{eeveelution.group}</h3>
        //             <div className="card__stats">
        //                 {Object.entries(eeveelution.stats).map(([statName, statValue]) => (
        //                     <div key={statName + statValue + ind} style={{display: "flex", alignItems: "center", gap: "2px", marginTop: "3px"}}>
        //                         <div>{statName?.toUpperCase()} - </div>
        //                         <div style={{maxWidth: "120px", textTransform: "capitalize", fontWeight: "600"}}>{statValue?.toLowerCase()}</div>
        //                     </div>
        //                 ))}
        //             </div>
        //             <div className="card__image-container2" style={{height:"2px"}}>
        //             </div>
        //             <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3px", flexDirection: "column", gap: "4px"}}>
        //                 <div>{teacherFullName}</div>
        //                 <div className="card__type2">{formatDateWithTime(startTime)} - {formatDateWithTime(endTime)}</div>
        //             </div>
        //         </div>
        //     ))}
        // </div>

        <div className={`signboard outer`} style={{zIndex: parseInt(itemIndex) + 100}}>
            {eeveelutions.map((eeveelution) => (
                <div className={`signboard front${eeveelution.itemIndex} inner anim04c`}>
                    <div id="day">
                        <div className="card__caption">
                            <div className="card__name">{eeveelution.name}</div>
                            <h3 className="card__type">{eeveelution.group}</h3>
                            <div className="card__stats">
                                {Object.entries(eeveelution.stats).map(([statName, statValue]) => (
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
                                <div>{teacherFullName}</div>
                                <div
                                    className="card__type2">{formatDateWithTime(startTime)} - {formatDateWithTime(endTime)}</div>
                                {eeveelution.index}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    );
});

export default ScheduleCard;
