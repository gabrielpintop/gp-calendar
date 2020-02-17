import React from 'react';
import SelectMonth from './SelectMonth/SelectMonth';
import Reminders from '../Reminders/Reminders';

const CalendarOptions = ({ month, year, day, reminders, setMonth, setYear, setDay, handleShowModal, addNewReminder, deleteReminder, deleteAllReminders, changeDate }) => {
    return (
        <section id="calendarOptions">
            <SelectMonth year={year} month={month} day={day} changeDate={changeDate} />
            <hr />
            <Reminders year={year} month={month} day={day} reminders={reminders} addNewReminder={addNewReminder} handleShowModal={handleShowModal} />
            {reminders && reminders.length > 0 &&
                <>
                    <hr />
                    <div id="reminderDeleteAll">
                        <button className="button-delete"><i className="fas fa-trash"></i>&nbsp;Delete all</button>
                    </div>
                </>
            }
        </section>
    );
};

export default CalendarOptions;