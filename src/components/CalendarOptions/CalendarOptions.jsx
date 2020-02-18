import React from 'react';
import SelectMonth from './SelectMonth/SelectMonth';
import Reminders from '../Reminders/Reminders';
import ReminderDeleteAll from '../Reminders/ReminderDeleteAll/ReminderDeleteAll';
import { connect } from 'react-redux';

const CalendarOptions = ({ reminders }) => {
    return (
        <section id="calendarOptions">
            <SelectMonth />
            <hr />
            <Reminders />
            {reminders && reminders.length > 0 &&
                <>
                    <hr />
                    <ReminderDeleteAll />
                </>
            }
        </section>
    );
};

const mapStateToProps = ({ reminders }) => {
    return {
        reminders,
    };
};

export default connect(mapStateToProps, null)(CalendarOptions);
