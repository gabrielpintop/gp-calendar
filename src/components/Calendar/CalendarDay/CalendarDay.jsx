import React from 'react'
import './CalendarDay.scss';

const CalendarDay = ({ day, month, year, currentMonth, reminders, currentDay, selectedDay, changeDate, handleShowModal }) => {

    return (
        <td className={`${!currentMonth ? 'calendar-different-month-day' : ''}`}>
            <div className="calendar-day-content">
                <h5 onClick={() => changeDate(year, month, day)} className={`no-select calendar-day-title${currentDay ? ' current-day' : ''}${selectedDay ? ' selected-day' : ''}`}>{day}</h5>
                {reminders && reminders.length > 0 ?
                    <div className="reminder" onClick={() => handleShowModal(true, { ...reminders[0], year, month, day })}>
                        {reminders[0].text}
                    </div>
                    :
                    <div className="pointer" onClick={() => changeDate(year, month, day)}>
                        <br />
                    </div>
                }
                <div>
                    {reminders && reminders.length > 1 ?
                        <div className="reminder-extra no-select" onClick={() => changeDate(year, month, day)}>
                            {reminders.length - 1} more...
                        </div>
                        :
                        <div>

                        </div>
                    }
                    <div className="reminder-new">
                        <i className="fas fa-plus-circle" onClick={() => handleShowModal(true, { year, month, day })} ></i>
                    </div>
                </div>
            </div>
        </td>
    );
};

export default CalendarDay;