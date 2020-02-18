import React, { useEffect, useState } from 'react';
import CalendarDay from './CalendarDay/CalendarDay';
import { getRemindersByYearAndMonth } from '../../services/reminders';
import { connect } from 'react-redux';

const Calendar = (props) => {

    const { year, month, day } = props;

    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {
        calculateCalendarDays();
    }, [props]);

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

    const getRowElements = (rowId) => {
        const renderCalendarDays = [];
        for (let index = rowId * 7; index < calendarDays.length && index < (rowId * 7) + 7; index++) {
            renderCalendarDays.push(calendarDays[index]);
        }
        return (
            <tr key={rowId + month}>
                {renderCalendarDays}
            </tr>
        );
    };

    return (
        <section id="calendar">
            <table >
                <thead>
                    <tr>
                        <th>Sunday</th>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
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