import React from 'react';
import ReminderDetails from './ReminderDetails/ReminderDetails';
import { connect } from 'react-redux';
import { toggleModal } from '../../actions';
import './Reminders.scss';

const Reminders = (props) => {

    const { year, month, day, reminders, toggleModal } = props;

    const formatter = new Intl.DateTimeFormat('en', { weekday: 'long' });

    const calculatWeekDay = () => {
        return formatter.format(new Date(year, month, day));
    };

    return (
        <div id="reminderListContainer">
            <h4>{calculatWeekDay()} {day}</h4>
            {reminders && reminders.length > 0 &&
                <ul className="reminder-list">
                    {reminders.map((reminder, index) =>
                        <ReminderDetails reminder={reminder} key={'R' + index}></ReminderDetails>
                    )}
                </ul>
            }
            {reminders.length === 0 && <h5 id="noReminders" className="show-sm">You have no reminders for this day</h5>}
            <div id="reminderAdd" className={reminders.length === 0 ? 'margin-top-2' : ''}>
                <button className="button-add" onClick={() => toggleModal({ showModal: true, reminder: {} })}><i className="fas fa-plus"></i>&nbsp;Add reminder</button>
            </div>
        </div>
    );
}

const mapStateToProps = ({ reminders, year, month, day }) => {
    return {
        reminders,
        year,
        month,
        day
    };
};

const mapDispatchToProps = {
    toggleModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Reminders);
