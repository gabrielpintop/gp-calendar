import React, { useState } from 'react';
import './CalendarContainer.scss';
import Calendar from '../../components/Calendar/Calendar';
import CalendarOptions from '../../components/CalendarOptions/CalendarOptions';
import DevelopedBy from '../../components/DevelopedBy/DevelopedBy';
import { getRemindersByYearMonthAndDay, addReminder, deleteReminder } from '../../services/reminders';
import ReminderForm from '../../components/Reminders/ReminderFormModal/ReminderFormModal';

const CalendarContainer = (props) => {

    const currentDate = new Date();

    const [showModal, setShowModal] = useState(false);

    const [reminder, setReminder] = useState({});

    const [year, setYear] = useState(currentDate.getFullYear());

    const [month, setMonth] = useState(currentDate.getMonth());

    const [day, setDay] = useState(currentDate.getDate());

    const [reminders, setReminders] = useState(getRemindersByYearMonthAndDay(year, month, day));

    const handleDateChange = (year, month, day) => {
        setDay(day);
        setMonth(month);
        setYear(year);
        setReminders(getRemindersByYearMonthAndDay(year, month, day));
    };

    const handleShowModal = (show, reminder, newDate) => {
        setShowModal(show);
        setReminder(reminder);
        if (newDate) {
            handleDateChange(newDate.newYear, newDate.newMonth, newDate.newDay)
        }
    };

    return (
        <main id="calendarContainer">
            <div id="calendarView">
                <Calendar year={year} month={month} day={day} currentDate={currentDate} setDay={setDay} handleShowModal={handleShowModal} changeDate={handleDateChange} />
                <CalendarOptions year={year} month={month} day={day} setMonth={setMonth} setYear={setYear} setDay={setDay} reminders={reminders} handleShowModal={handleShowModal} changeDate={handleDateChange} />
            </div>
            <DevelopedBy />
            {showModal && <ReminderForm showModal={showModal} handleShowModal={handleShowModal} reminder={reminder} />}
        </main>
    );
}

export default CalendarContainer;