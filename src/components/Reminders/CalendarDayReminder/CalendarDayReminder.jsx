import React from 'react';

const CalendarDayReminder = ({ reminder, year, month, day, setRemindersAndDate }) => {

    return (
        <div style={{ backgroundColor: reminder.color }} className="reminder margin-top-1" onClick={() => setRemindersAndDate({ year, month, day, showModal: true, reminder })}>
            {reminder.text}
        </div>
    );
};

export default CalendarDayReminder;