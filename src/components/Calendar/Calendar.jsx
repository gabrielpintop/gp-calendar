import React, { useEffect, useState } from 'react';
import CalendarDay from './CalendarDay/CalendarDay';
import { getRemindersByYearAndMonth } from '../../services/reminders';

const Calendar = (props) => {
    const [currentProps, setCurrentProps] = useState(props);

    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {
        setCurrentProps(props);
    }, [props]);

    useEffect(() => {
        calculateCalendarDays();
    }, [currentProps])

    const calculateCalendarDays = () => {
        const { year, month } = currentProps;
        const previousMonthDate = new Date(year, month, 0);
        const currentMonthDate = new Date(year, month + 1, 0);
        const nextMonthDate = new Date(year, month + 1, 1);
        const initialWeekDay = new Date(year, month, 1).getDay();
        const calendarDays = [];

        addCalendarDays(calendarDays, previousMonthDate.getDate() + 1 - initialWeekDay, previousMonthDate.getDate(), false, previousMonthDate);
        addCalendarDays(calendarDays, 1, currentMonthDate.getDate(), true, currentMonthDate);

        const calendarDaysLimit = calendarDays.length > 35 ? 42 : 35;
        addCalendarDays(calendarDays, 1, calendarDaysLimit - calendarDays.length, false, nextMonthDate);
        setCalendarDays(calendarDays);
    };

    const addCalendarDays = (calendarDays, start, limit, currentMonth, date) => {
        const { day, currentDate, addNewReminder, changeDate } = currentProps;
        const reminders = getRemindersByYearAndMonth(date.getFullYear(), date.getMonth());
        for (let index = start; index <= limit; index++) {
            calendarDays.push(<CalendarDay day={index} currentDay={date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth() && index === currentDate.getDate()} selectedDay={currentMonth && day === index} month={date.getMonth()} year={date.getFullYear()} currentMonth={currentMonth} reminders={reminders[Number(index)] || []} addNewReminder={addNewReminder} handleShowModal={currentProps.handleShowModal} changeDate={changeDate} />);
        }
    };

    const getRowElements = (rowId) => {
        const renderCalendarDays = [];
        for (let index = rowId * 7; index < calendarDays.length && index < (rowId * 7) + 7; index++) {
            renderCalendarDays.push(calendarDays[index]);
        }
        return (
            <tr key={rowId + currentProps.month}>
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

export default Calendar;