import React, { useState } from 'react';
import './CalendarContainer.scss';
import Calendar from '../../components/Calendar/Calendar';
import CalendarOptions from '../../components/CalendarOptions/CalendarOptions';
import DevelopedBy from '../../components/DevelopedBy/DevelopedBy';

const CalendarContainer = (props) => {

    const currentDate = new Date();

    const [reminders, setReminders] = useState([]);

    const [year, setYear] = useState(currentDate.getFullYear());

    const [month, setMonth] = useState(currentDate.getMonth());

    const [day, setDay] = useState(currentDate.getDate());

    return (
        <main id="calendarContainer">
            <div id="calendarView">
                <Calendar year={year} month={month} day={day} currentDate={currentDate} reminders={reminders} reminders={reminders} setDay={setDay} />
                <CalendarOptions year={year} month={month} day={day} setMonth={setMonth} setYear={setYear} setDay={setDay} />
            </div>
            <DevelopedBy />
        </main>
    );
}

export default CalendarContainer;