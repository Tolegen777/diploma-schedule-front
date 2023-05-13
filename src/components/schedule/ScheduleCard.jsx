import React from 'react';
import './ScheduleCard.css';
import math from './../../assets/icons/editIcon.svg'
import {formatDateWithTime} from "../../utils/formatDateWithTime";

function getRandomItem(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}
const ScheduleCard = ({
                          subject,
                          teacher,
                          endTime,
                          startTime,
                          sessionType,
                          group,
                          roomNumber,
                          teachers,
                          subjects,
                          groups
                      }) => {

    const myArray = ['normal', 'water', 'fairy', 'ice', 'grass', 'psychic', 'electric', 'dark'];
    const randomItem = getRandomItem(myArray);

    const teacherFullName = `${teachers?.find(item => item.id === teacher)?.firstName} ${teachers?.find(item => item.id === teacher)?.middleName} ${teachers?.find(item => item.id === teacher)?.lastName}`

    const eeveelutions = [
        {
            name: `${subjects?.find(item => item.id === subject)?.title}`,
            type: randomItem,
            group: `${groups?.find(item => item.id === group)?.title ?? ''}`,
            image: math,
            stats: {
                Программа: 'BIS',
                Препод: teacherFullName,
                Тип: sessionType,
                Кабинет: roomNumber,
            },
            abilities: {
                room: roomNumber,
                hiddenAbility: 'Anticipation',
            },
        },
    ];

    return (
        <div id="cards">
            {eeveelutions.map((eeveelution) => (
                <figure key={eeveelution.name} className={`card card--${eeveelution.type}`}>
                    <figcaption className="card__caption">
                        <h1 className="card__name">{eeveelution.name}</h1>
                        <h3 className="card__type">{eeveelution.group}</h3>
                        <table className="card__stats">
                            <tbody>
                            {Object.entries(eeveelution.stats).map(([statName, statValue]) => (
                                <tr key={statName}>
                                    <th>{statName.toUpperCase()}</th>
                                    <td>{statValue}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        <div className="card__image-container2" style={{height:"2px"}}>
                        </div>
                        <div style={{display: "flex", alignItems: "center", justifyContent: "center", marginTop: "3px"}}>
                            {formatDateWithTime(startTime)} - {formatDateWithTime(endTime)}
                        </div>
                    </figcaption>
                </figure>
            ))}
        </div>
    );
};

export default ScheduleCard;
