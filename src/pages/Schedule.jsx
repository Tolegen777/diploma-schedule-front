import React, {useState} from 'react';
import ScheduleView from "../components/schedule/ScheduleView";
import {useMutation, useQuery} from "react-query";
import {universityApi} from "../api/universityApi";

const Schedule = () => {

    return (
        <>
            <ScheduleView />
        </>
    );
};

export default Schedule;