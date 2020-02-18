import React from 'react';
import SelectMonth from './SelectMonth/SelectMonth';
import Reminders from '../Reminders/Reminders';
import ReminderDeleteAll from '../Reminders/ReminderDeleteAll/ReminderDeleteAll';

const CalendarOptions = ({ month, year, day, reminders, handleShowModal, changeDate, updateReminders }) => {
    return (
        <section id="calendarOptions">
            <SelectMonth year={year} month={month} day={day} changeDate={changeDate} />
            <hr />
            <Reminders year={year} month={month} day={day} reminders={reminders} handleShowModal={handleShowModal} />
            {reminders && reminders.length > 0 &&
                <>
                    <hr />
                    <ReminderDeleteAll year={year} month={month} day={day} updateReminders={updateReminders} />
                </>
            }
        </section>
    );
};

export default CalendarOptions;