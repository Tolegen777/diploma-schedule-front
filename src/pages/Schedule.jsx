import React, {useState} from 'react';
import ScheduleView from "../components/schedule/ScheduleView";
import {ScheduleFilterForm} from "../components/schedule/ScheduleFilterForm";

const Schedule = () => {

    const [filterParams, setFilterParams] = useState('');

    const onSubmitFilterModal = (formData) => {
        Object.keys(formData).forEach(key => {
            if (formData[key] === undefined) {
                delete formData[key];
            }
        });

        setFilterParams(new URLSearchParams(formData).toString());
    };

    return (
        <>
            <ScheduleFilterForm onSubmit={(val) => onSubmitFilterModal(val)
            }/>
            <ScheduleView filterParams = {filterParams} />
        </>
    );
};

export default Schedule;