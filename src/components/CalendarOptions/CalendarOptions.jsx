import React from 'react';
import SelectMonth from './SelectMonth/SelectMonth';
import Reminders from '../Reminders/Reminders';
import ReminderDeleteAll from '../Reminders/ReminderDeleteAll/ReminderDeleteAll';
import { connect } from 'react-redux';
import './CalendarOptions.scss';

const CalendarOptions = ({ reminders }) => {
    return (
        <section id="calendarOptions">
            <div className="show-lg">
                <SelectMonth />
                <hr />
            </div>
            <Reminders />
            {reminders && reminders.length > 0 &&
                <>
                    <hr className="show-lg" />
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
