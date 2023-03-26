import React, { useState } from "react";
import { CalendarOutlined } from "@ant-design/icons";
import { DatePicker, Radio } from "antd";
import 'antd/dist/reset.css'
import "./ScheduleComponent.css";
import { format, startOfWeek, addDays } from "date-fns";
import moment from 'moment'

const ScheduleTest = () => {
    const [view, setView] = useState("week");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleViewChange = (e) => {
        setView(e.target.value);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date.toDate());
    };


    const renderWeekView = () => {
        const days = [];
        const startOfWeekDate = startOfWeek(selectedDate);
        const endOfWeekDate = addDays(startOfWeekDate, 6);

        for (let day = startOfWeekDate; day <= endOfWeekDate; day = addDays(day, 1)) {
            days.push(
                <div key={day.toISOString()} className="day">
                    <div className="day-header">
                        <div className="day-header-date">{format(day, "d")}</div>
                        <div className="day-header-day">{format(day, "EEE")}</div>
                    </div>
                    <div className="day-events">{/* Render events for this day */}</div>
                </div>
            );
        }

        return (
            <div className="week-view">
                <div className="week-header">
                    <div className="week-header-date">{format(startOfWeekDate, "MMM d")}</div>
                    <div className="week-header-day">{`${format(startOfWeekDate, "EEE")} - ${format(endOfWeekDate, "EEE")}`}</div>
                    <div className="view-options">
                        <Radio.Group defaultValue="week" onChange={handleViewChange}>
                            <Radio.Button value="day">Day</Radio.Button>
                            <Radio.Button value="week">Week</Radio.Button>
                            <Radio.Button value="month">Month</Radio.Button>
                        </Radio.Group>
                        <DatePicker
                            onChange={handleDateChange}
                            value={moment(selectedDate)}
                            allowClear={false}
                            suffixIcon={<CalendarOutlined />}
                            format="MMM D, YYYY"
                            className="date-picker"
                        />
                    </div>
                </div>
                <div className="week-body">{days}</div>
            </div>
        );
    };



    return renderWeekView()
};

export default ScheduleTest;
