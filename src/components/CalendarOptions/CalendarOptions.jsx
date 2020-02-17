import React from 'react';
import SelectMonth from './SelectMonth/SelectMonth';
import Reminders from './Reminders/Reminders';

const CalendarOptions = ({ month, year, day, reminders, setMonth, setYear, setDay, addReminder, deleteReminder, deleteAllReminders }) => {

    return (
        <section id="calendarOptions">
            <SelectMonth year={year} month={month} day={day} setMonth={setMonth} setYear={setYear} setDay={setDay} />
            <hr />
            <Reminders year={year} month={month} day={day} />
            <hr />
            <div id="reminderDeleteAll">
                <button className="button-delete"><i className="fas fa-trash"></i>&nbsp;Delete all</button>
            </div>
        </section>
    );
};

export default CalendarOptions;