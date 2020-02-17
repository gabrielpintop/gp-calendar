import React from 'react'

const CalendarDay = ({ dayNumber }) => {
    return (
        <td>
            <div className="calendar-day-content">
                <h5 className="calendar-day-title">{dayNumber}</h5>
                <div className="reminder">
                    Este es un texto de 30 caracte
                                                </div>
                <div className="reminder-extra">
                    2 more...
                                                </div>
                <div className="reminder-new">
                    <i className="fas fa-plus-circle"></i>
                </div>
            </div>
        </td>
    );
};

export default CalendarDay;