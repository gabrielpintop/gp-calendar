import React from 'react';
import ReminderDetails from './ReminderDetails/ReminderDetails';

const Reminders = ({ year, month, day, reminders, handleShowModal }) => {

    const formatter = new Intl.DateTimeFormat('en', { weekday: 'long' });

    const calculatWeekDay = () => {
        return formatter.format(new Date(year, month, day));
    };

    return (
        <div id="reminder">
            <h4>{calculatWeekDay()} {day}</h4>
            {reminders && reminders.length > 0 &&
                <ul class="reminder-list">
                    {reminders.map(reminder =>
                        <ReminderDetails reminder={reminder} handleShowModal={handleShowModal} year={year} month={month} day={day}></ReminderDetails>
                    )}
                </ul>
            }
            <div id="reminderAdd" className={reminders.length === 0 ? 'margin-top-2' : ''}>
                <button className="button-add" onClick={() => handleShowModal(true, { year, month, day })}><i className="fas fa-plus"></i>&nbsp;Add reminder</button>
            </div>
        </div>
    );
}

export default Reminders;