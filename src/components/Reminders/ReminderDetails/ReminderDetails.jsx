import React from 'react';
import { connect } from 'react-redux';
import { defineReminder } from '../../../actions';

const ReminderDetails = (props) => {

    const { reminder, defineReminder, year, month, day } = props;

    return (
        <li style={{ backgroundColor: reminder.color }} className="reminder" onClick={() => defineReminder({ ...reminder, year, month, day })}><span>{reminder.text}</span><span><i className="far fa-clock"></i>&nbsp;{reminder.time}</span></li>
    );
};

const mapStateToProps = ({ year, month, day }) => {
    return {
        year,
        month,
        day
    };
};

const mapDispatchToProps = {
    defineReminder
};

export default connect(mapStateToProps, mapDispatchToProps)(ReminderDetails);


