import React from 'react';

const Reminders = ({ year, month, day }) => {

    const formatter = new Intl.DateTimeFormat('en', { weekday: 'long' });

    const calculatWeekDay = () => {
        console.log(new Date(year, month, day));

        return formatter.format(new Date(year, month, day));
    };

    return (
        <div id="reminder">
            <h4>{calculatWeekDay()} {day}</h4>
            <ul class="reminder-list">
                <li className="reminder"><span>Este es un texto de 30 caracte</span><span>8:00 PM</span></li>
                <li className="reminder">Este es un texto de 30 caracte</li>
                <li className="reminder">Este es un texto de 30 caracte</li>
            </ul>
            <div id="reminderAdd">
                <button className="button-add"><i className="fas fa-plus"></i>&nbsp;Add reminder</button>
            </div>
        </div>
    );
}

export default Reminders;