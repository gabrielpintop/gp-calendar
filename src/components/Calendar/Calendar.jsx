import React, { useEffect, useState } from 'react';
import CalendarDay from './CalendarDay/CalendarDay';
import { connect } from 'react-redux';
import { getRemindersByYearAndMonth } from '../../services/reminders';
import './Calendar.scss';

const Calendar = (props) => {
    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {

        const { year, month, day } = props;

        const calculateCalendarDays = () => {
            const previousMonthDate = new Date(year, month, 0);
            const currentMonthDate = new Date(year, month + 1, 0);
            const nextMonthDate = new Date(year, month + 1, 1);
            const initialWeekDay = new Date(year, month, 1).getDay();
            const calendarDays = [];

            const currentDate = new Date();
            addCalendarDays(calendarDays, previousMonthDate.getDate() + 1 - initialWeekDay, previousMonthDate.getDate(), false, previousMonthDate, currentDate);
            addCalendarDays(calendarDays, 1, currentMonthDate.getDate(), true, currentMonthDate, currentDate);

            const calendarDaysLimit = calendarDays.length > 35 ? 42 : 35;
            addCalendarDays(calendarDays, 1, calendarDaysLimit - calendarDays.length, false, nextMonthDate, currentDate);
            setCalendarDays(calendarDays);
        };

        const addCalendarDays = (calendarDays, start, limit, currentMonth, date, currentDate) => {
            const reminders = getRemindersByYearAndMonth(date.getFullYear(), date.getMonth());
            for (let index = start; index <= limit; index++) {
                calendarDays.push(<CalendarDay key={index} day={index} currentDay={date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && index === currentDate.getDate()} selectedDay={currentMonth && day === index} month={date.getMonth()} year={date.getFullYear()} currentMonth={currentMonth} reminders={reminders[Number(index)] || []} />);
            }
        };

        calculateCalendarDays();
    }, [props]);

    const getRowElements = (rowId) => {
        const renderCalendarDays = [];
        for (let index = rowId * 7; index < calendarDays.length && index < (rowId * 7) + 7; index++) {
            renderCalendarDays.push(calendarDays[index]);
        }
        return (
            <tr key={rowId}>
                {renderCalendarDays}
            </tr>
        );
    };

    return (
        <section id="calendar">
            <table >
                <thead>
                    <tr>
                        <th><span className="week-day-first-letters">Su</span><span className="week-day-letters">nday</span></th>
                        <th><span className="week-day-first-letters">Mo</span><span className="week-day-letters">onday</span></th>
                        <th><span className="week-day-first-letters">Tu</span><span className="week-day-letters">uesday</span></th>
                        <th><span className="week-day-first-letters">We</span><span className="week-day-letters">dnesday</span></th>
                        <th><span className="week-day-first-letters">Th</span><span className="week-day-letters">ursday</span></th>
                        <th><span className="week-day-first-letters">Fr</span><span className="week-day-letters">iday</span></th>
                        <th><span className="week-day-first-letters">Sa</span><span className="week-day-letters">turday</span></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        [...Array(Math.ceil(calendarDays.length / 7) || 5).keys()].map(rowId => getRowElements(rowId))
                    }
                </tbody>

            </table>
        </section>
    );
};

const mapStateToProps = ({ year, month, day, reminders }) => {
    return {
        year,
        month,
        day,
        reminders
    };
};

export default connect(mapStateToProps, null)(Calendar);