import React, { useEffect, useState } from 'react';
import CalendarDay from './CalendarDay/CalendarDay';
const Calendar = (props) => {
    const [currentProps, setCurrentProps] = useState(props);

    const [calendarDays, setCalendarDays] = useState([]);

    useEffect(() => {
        console.log(props);
        setCurrentProps(props);
    }, [props]);

    useEffect(() => {
        calculateCalendarDays();
    }, [currentProps])

    const calculateCalendarDays = () => {
        const { year, month } = currentProps;
        const previousMonthDays = new Date(year, month, 0).getDate();
        const currentMonthDays = new Date(year, month + 1, 0).getDate();
        const initialWeekDay = new Date(year, month, 1).getDay();
        const calendarDays = [];

        addCalendarDays(calendarDays, previousMonthDays + 1 - initialWeekDay, previousMonthDays);
        addCalendarDays(calendarDays, 1, currentMonthDays);

        const calendarDaysLimit = calendarDays.length > 35 ? 42 : 35;
        addCalendarDays(calendarDays, 1, calendarDaysLimit - calendarDays.length);
        setCalendarDays(calendarDays);
    };

    const addCalendarDays = (calendarDays, start, limit) => {
        for (let index = start; index <= limit; index++) {
            calendarDays.push({
                dayNumber: index
            });
        }
    };

    const getRowElements = (rowId) => {
        const { setDay, month } = currentProps;

        const renderCalendarDays = [];

        let calendarDay;
        for (let index = rowId * 7; index < calendarDays.length && index < (rowId * 7) + 7; index++) {
            calendarDay = calendarDays[index];
            console.log(calendarDay);

            renderCalendarDays.push(
                <CalendarDay dayNumber={calendarDay.dayNumber} />
            );
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

export default Calendar;