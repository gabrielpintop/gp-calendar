import React from 'react'
import './CalendarDay.scss';
import { connect } from 'react-redux';
import { setRemindersAndDate } from '../../../actions/index';

const CalendarDay = (props) => {

    const { day, month, year, currentMonth, reminders, currentDay, selectedDay, setRemindersAndDate } = props;

    return (
        <td className={`${!currentMonth ? 'calendar-different-month-day' : ''}`}>
            <div className="calendar-day-content">
                <h5 onClick={() => setRemindersAndDate({ year, month, day, showModal: false })} className={`no-select calendar-day-title${currentDay ? ' current-day' : ''}${selectedDay ? ' selected-day' : ''}`}>{day}</h5>
                {reminders && reminders.length > 0 ?
                    <div style={{ backgroundColor: reminders[0].color }} className="reminder" onClick={() => setRemindersAndDate({ year, month, day, showModal: true, reminder: reminders[0] })}>
                        {reminders[0].text}
                    </div>
                    :
                    <div className="pointer" onClick={() => setRemindersAndDate({ year, month, day, showModal: false })}>
                        <br />
                    </div>
                }
                <div>
                    {reminders && reminders.length > 1 ?
                        <div className="reminder-extra no-select" onClick={() => setRemindersAndDate({ year, month, day, showModal: false })}>
                            {reminders.length - 1} more...
                        </div>
                        :
                        <div>

                        </div>
                    }
                    <div className="reminder-new">
                        <i className="fas fa-plus-circle" onClick={() => setRemindersAndDate({ year, month, day, showModal: true })} ></i>
                    </div>
                </div>
            </div>
        </td>
    );
};

const mapDispatchToProps = {
    setRemindersAndDate
};

export default connect(null, mapDispatchToProps)(CalendarDay);
